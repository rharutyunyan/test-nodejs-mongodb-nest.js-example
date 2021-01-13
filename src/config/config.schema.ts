import * as Joi from '@hapi/joi';

export const EnvConfigSchema = {
  nodeEnv: Joi.string().valid('dev', 'prod', 'test'),
  mongoUrl: Joi.string(),
  port: Joi.number(),
  url: Joi.string(),
  globalPrefix: Joi.string(),
} as any;
