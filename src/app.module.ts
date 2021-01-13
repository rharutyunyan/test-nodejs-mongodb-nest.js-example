import { Module, OnModuleInit, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Services } from './services';
import { Controllers } from './controllers';
import { DatabaseModule } from './database';
import { ConfigModule as AppConfigModule } from './config';
import { ConfigService } from './config';
import { SchemasDefinitions } from './schemas';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AppConfigModule,
    MongooseModule.forFeature(SchemasDefinitions),
    DatabaseModule,
  ],
  controllers: [AppController, ...Controllers],
  providers: [AppService, ConfigService, ...Services],
})
export class AppModule implements OnModuleInit {
  constructor(private svcConfig: ConfigService) {}

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  onModuleInit() {
    if (!this.svcConfig.isValid()) {
      process.exit(1);
    }
  }
}
