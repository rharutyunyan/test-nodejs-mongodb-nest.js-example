import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '../config';

export const DatabaseProvider = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => ({
    uri: config.mongoUrl,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }),
  inject: [ConfigService],
});
