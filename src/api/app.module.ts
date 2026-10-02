import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database.module';
import { AppController } from './app.controller';
import { TelegramModule } from './telegram/telegram.module';
import { UserModule } from './user/user.module';
import { AiModule } from './ai/ai.module';
import { BuyurtmaModule } from './buyurtma/buyurtma.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AiModule,
    BuyurtmaModule,
    TelegramModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
