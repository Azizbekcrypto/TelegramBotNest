import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { BuyurtmaService } from './buyurtma.service';
import { PITSALAR, som } from '../menyu';

// 6-Modul 8-dars: saytdan buyurtma — Database'ga yoziladi, admin Telegram'da xabar oladi
// 11-dars: telefon ham shu yo'ldan keladi — manba body'dan ('mobil'), bo'lmasa 'sayt'
const MANBALAR = ['sayt', 'mobil'];

@Controller('buyurtma')
export class BuyurtmaController {
  constructor(private readonly buyurtmalar: BuyurtmaService) {}

  @Post()
  async yarat(
    @Body() body: { taom?: string; manzil?: string; manba?: string },
  ) {
    const pitsa = Object.values(PITSALAR).find(
      (p) => p.nom.toLowerCase() === String(body.taom).trim().toLowerCase(),
    );
    if (!pitsa) throw new BadRequestException("Bunday taom yo'q");
    const manzil = String(body.manzil ?? '').trim();
    if (!manzil) throw new BadRequestException('Manzilni yozing');

    const manba = MANBALAR.includes(String(body.manba))
      ? String(body.manba)
      : 'sayt';

    const b = await this.buyurtmalar.yoz(null, pitsa.nom, manzil, manba);
    await this.buyurtmalar.adminga(
      `Yangi buyurtma (${manba}): ${pitsa.nom} — ${som(pitsa.narx)} · ${manzil}`,
    );
    return { ok: true, id: b.id };
  }
}
