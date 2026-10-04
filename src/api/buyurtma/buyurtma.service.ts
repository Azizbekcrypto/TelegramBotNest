import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Telegram } from 'telegraf';
import { Buyurtma } from '../../core/entity/buyurtma.entity';
import { config } from '../../config';

@Injectable()
export class BuyurtmaService {
  // 6-Modul 8-dars: adminga xabarni bot yuboradi (o'sha BOT_TOKEN bilan)
  private readonly telegram = new Telegram(config.BOT_TOKEN);

  constructor(
    @InjectRepository(Buyurtma) private readonly repo: Repository<Buyurtma>,
  ) {}

  // manba: 'bot' (bot va agent) · 'sayt' (8-dars)
  yoz(
    telegramId: number | null,
    pitsa: string,
    manzil: string,
    manba = 'bot',
  ): Promise<Buyurtma> {
    return this.repo.save(
      this.repo.create({
        telegram_id: telegramId === null ? null : String(telegramId),
        pitsa,
        manzil,
        manba,
      }),
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

  // 6-Modul 8-dars: admin chatiga xabar. ADMIN_CHAT_ID bo'sh bo'lsa — faqat ogohlantirish, buyurtma baribir yoziladi
  async adminga(matn: string): Promise<void> {
    if (!config.ADMIN_CHAT_ID) {
      console.warn(
        "ADMIN_CHAT_ID bo'sh — admin xabari yuborilmadi. Botga /id yuboring va raqamni .env ga yozing.",
      );
      return;
    }
    try {
      await this.telegram.sendMessage(config.ADMIN_CHAT_ID, matn);
    } catch (e) {
      console.error('Admin xabari ketmadi:', (e as Error).message);
    }
  }
}
