import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AgentService } from './agent.service';
import { BuyurtmaModule } from '../buyurtma/buyurtma.module';

@Module({
  imports: [BuyurtmaModule],
  providers: [AiService, AgentService],
  exports: [AiService, AgentService],
})
export class AiModule {}
