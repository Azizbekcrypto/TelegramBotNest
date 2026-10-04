import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { BuyurtmaService } from './buyurtma.service';
import { PITSALAR, som } from '../menyu';

// 6-Modul 8-dars: saytdan buyurtma — Database'ga yoziladi, admin Telegram'da xabar oladi
@Controller('buyurtma')
export class BuyurtmaController {
  constructor(private readonly buyurtmalar: BuyurtmaService) {}

  @Post()
  async yarat(@Body() body: { taom?: string; manzil?: string }) {
    const pitsa = Object.values(PITSALAR).find(
      (p) => p.nom.toLowerCase() === String(body.taom).trim().toLowerCase(),
    );
    if (!pitsa) throw new BadRequestException("Bunday taom yo'q");
    const manzil = String(body.manzil ?? '').trim();
    if (!manzil) throw new BadRequestException('Manzilni yozing');

    const b = await this.buyurtmalar.yoz(null, pitsa.nom, manzil, 'sayt');
    await this.buyurtmalar.adminga(
      `Yangi buyurtma (sayt): ${pitsa.nom} — ${som(pitsa.narx)} · ${manzil}`,
    );
    return { ok: true, id: b.id };
  }
}
