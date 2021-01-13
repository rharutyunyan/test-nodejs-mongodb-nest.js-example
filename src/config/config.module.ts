import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  imports: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule implements OnModuleInit, OnModuleDestroy {
  constructor(private config: ConfigService) {}

  onModuleInit() {
    this.config.print();
    if (!this.config.isValid()) {
      process.exit(1);
    }
  }

  onModuleDestroy() {}
}
