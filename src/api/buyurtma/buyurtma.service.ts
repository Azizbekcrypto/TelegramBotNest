import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyurtma } from '../../core/entity/buyurtma.entity';

@Injectable()
export class BuyurtmaService {
  constructor(
    @InjectRepository(Buyurtma) private readonly repo: Repository<Buyurtma>,
  ) {}

  yoz(telegramId: number, pitsa: string, manzil: string): Promise<Buyurtma> {
    return this.repo.save(
      this.repo.create({ telegram_id: String(telegramId), pitsa, manzil }),
    );
  }

  // Oxirgi 3 ta buyurtma — /buyurtmalarim
  oxirgilar(telegramId: number): Promise<Buyurtma[]> {
    return this.repo.find({
      where: { telegram_id: String(telegramId) },
      order: { created_at: 'DESC' },
      take: 3,
    });
  }
}
