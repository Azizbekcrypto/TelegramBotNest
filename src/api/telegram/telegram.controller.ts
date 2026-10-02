import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import type { Update } from 'telegraf/types';
import { TelegramService } from './telegram.service';

// 7-dars: webhook — Telegram yangi xabarni shu manzilga yuboradi (serverda)
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegram: TelegramService) {}

  @Post()
  @HttpCode(200)
  async update(@Body() body: Update) {
    await this.telegram.handleUpdate(body);
    return { ok: true };
  }
}
