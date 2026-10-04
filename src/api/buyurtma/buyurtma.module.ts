import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buyurtma } from '../../core/entity/buyurtma.entity';
import { BuyurtmaService } from './buyurtma.service';
import { BuyurtmaController } from './buyurtma.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Buyurtma])],
  controllers: [BuyurtmaController], // 6-Modul 8-dars: POST /buyurtma
  providers: [BuyurtmaService],
  exports: [BuyurtmaService],
})
export class BuyurtmaModule {}
