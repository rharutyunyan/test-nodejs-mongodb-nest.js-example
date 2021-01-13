import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix(config.globalPrefix);
  const logger: Logger = new Logger('Main');
  const validationOptions = {
    validationError: { target: false },
  };
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  if (config.nodeEnv === 'dev') {
    const documentOptions = new DocumentBuilder()
      .setTitle('Swagger')
      .setDescription('monolith')
      .setVersion('v1')
      .setBasePath(config.globalPrefix)
      .build();
    const document = SwaggerModule.createDocument(app, documentOptions);
    SwaggerModule.setup('swagger', app, document);
  }
  const port = config.port || 3000;
  await app.listen(port);
  logger.log(`Server listening on port ${port}`, bootstrap.name);
}
bootstrap();
