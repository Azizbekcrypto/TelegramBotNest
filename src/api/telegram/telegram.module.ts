import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AiModule } from '../ai/ai.module';
import { BuyurtmaModule } from '../buyurtma/buyurtma.module';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';

@Module({
  imports: [UserModule, AiModule, BuyurtmaModule],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule {}
