import { Body, Controller, Get, Post } from '@nestjs/common';
import { PITSALAR } from './menyu';
import { AiService } from './ai/ai.service';

// Hosting (7-dars) shu manzilni ochib, bot tirikligini tekshiradi.
@Controller()
export class AppController {
  constructor(private readonly ai: AiService) {}

  @Get()
  health() {
    return { ok: true, xabar: 'Bot ishlayapti' };
  }

  // 6-Modul 8-dars: menyu bitta joyda (menyu.ts) — sayt va telefon ilovasi shu yerdan oladi
  @Get('menyu')
  menyu() {
    return Object.entries(PITSALAR).map(([id, p]) => ({
      id,
      nom: p.nom,
      narx: p.narx,
    }));
  }

  // 6-Modul 8-dars: saytdagi savolga botdagi o'sha AI javob beradi
  @Post('savol')
  async savol(@Body() body: { savol?: string }) {
    const javob = await this.ai.javob(String(body.savol ?? ''));
    return { javob: javob ?? 'AI hali ulanmagan' };
  }
}
