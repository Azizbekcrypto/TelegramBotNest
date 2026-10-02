import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { config } from '../../config';

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf;

  async onModuleInit() {
    if (!config.BOT_TOKEN) {
      throw new Error(
        'BOT_TOKEN topilmadi. .env faylini oching va @BotFather bergan tokenni yozing (README, 3-qadam).',
      );
    }
    this.bot = new Telegraf(config.BOT_TOKEN);

    // /start — bot bilan birinchi uchrashuv
    this.bot.start((ctx) => ctx.reply('Salom! Bot ishlayapti.'));

    // Boshqa har qanday matn — hozircha shu javob
    this.bot.on('text', (ctx) =>
      ctx.reply('Hali bu buyruqni bilmayman. /start ni bosing.'),
    );

    this.bot
      .launch(() => console.log('Telegram bot ulandi'))
      .catch((e: Error) =>
        console.error(
          'Telegram ulanmadi:',
          e.message,
          '— README, «Xatolar» jadvali',
        ),
      );
  }

  onModuleDestroy() {
    this.bot?.stop('server tugadi');
  }
}
