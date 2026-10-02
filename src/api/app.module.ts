import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database.module';
import { AppController } from './app.controller';
import { TelegramModule } from './telegram/telegram.module';
import { UserModule } from './user/user.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [DatabaseModule, UserModule, AiModule, TelegramModule],
  controllers: [AppController],
})
export class AppModule {}
