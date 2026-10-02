import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buyurtma } from '../../core/entity/buyurtma.entity';
import { BuyurtmaService } from './buyurtma.service';

@Module({
  imports: [TypeOrmModule.forFeature([Buyurtma])],
  providers: [BuyurtmaService],
  exports: [BuyurtmaService],
})
export class BuyurtmaModule {}
