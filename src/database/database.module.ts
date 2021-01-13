import { Module } from '@nestjs/common';
import { databaseProvider } from './databaseProvider';
import { ConfigModule } from '../config';

@Module({
  imports: [ConfigModule, databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
