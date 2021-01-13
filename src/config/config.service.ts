import { Logger } from '@nestjs/common';
import * as Joi from '@hapi/joi';

import { EnvConfigSchema } from './config.schema';

export class ConfigService {
  private logger: Logger = new Logger(ConfigService.name);

  constructor(
    public nodeEnv: string = process.env.NODE_ENV,
    public mongoUrl: string = process.env.MONGO_URL,
    public port: number = parseInt(process.env.PORT, 10),
    public url: string = process.env.URL,
    public globalPrefix: string = process.env.GLOBAL_PREFIX || '/api',
  ) {}

  isValid() {
    const schema = Joi.object(EnvConfigSchema);
    const { error } = schema.validate(this, { stripUnknown: true });
    if (error) {
      this.logger.error(`Joi validation error: ${JSON.stringify(error.details)}`);
    } else {
      this.logger.debug(`Joi validation success`);
    }
    return !error;
  }

  print() {
    this.logger.log(`URL: ${this.url}`);
    this.logger.log(`PORT: ${this.port}`);
    this.logger.log(`MONGO_URL: ${this.mongoUrl}`);
    this.logger.log(`NODE_ENV: ${this.nodeEnv}`);
    this.logger.log(`GLOBAL_PREFIX: ${this.globalPrefix}`);
  }
}
