import { Controller, Get } from '@nestjs/common';

// Hosting (7-dars) shu manzilni ochib, bot tirikligini tekshiradi.
@Controller()
export class AppController {
  @Get()
  health() {
    return { ok: true, xabar: 'Bot ishlayapti' };
  }
}
