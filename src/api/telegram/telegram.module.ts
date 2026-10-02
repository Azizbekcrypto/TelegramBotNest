import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TelegramService } from './telegram.service';

@Module({
  imports: [UserModule],
  providers: [TelegramService],
})
export class TelegramModule {}
