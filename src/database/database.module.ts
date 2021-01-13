import { Module } from '@nestjs/common';
import { DatabaseProvider } from './databaseProvider';
import { ConfigModule } from '../config';

@Module({
  imports: [ConfigModule, DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
