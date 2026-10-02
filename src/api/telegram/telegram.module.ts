import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AiModule } from '../ai/ai.module';
import { TelegramService } from './telegram.service';

@Module({
  imports: [UserModule, AiModule],
  providers: [TelegramService],
})
export class TelegramModule {}
