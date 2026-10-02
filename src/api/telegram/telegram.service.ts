import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Markup, Telegraf } from 'telegraf';
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
    this.bot.start((ctx) =>
      ctx.reply('Salom! Bot ishlayapti. Menyu uchun /menu ni bosing.'),
    );

    // /menu — ikkita inline tugma
    this.bot.command('menu', (ctx) =>
      ctx.reply(
        'Nima qilamiz?',
        Markup.inlineKeyboard([
          Markup.button.callback('🍕 Pitsa', 'pizza'),
          Markup.button.callback('❓ Yordam', 'help'),
        ]),
      ),
    );

    // Tugma bosildi — callback keladi, uni bot.action ushlaydi
    this.bot.action('pizza', async (ctx) => {
      await ctx.answerCbQuery();
      await ctx.reply('Pitsa tanlandi. Keyingi darsda buyurtma saqlanadi.');
    });

    this.bot.action('help', async (ctx) => {
      await ctx.answerCbQuery();
      await ctx.reply('/start — boshlash\n/menu — tugmalar');
    });

    // Boshqa har qanday matn — fallback
    this.bot.on('text', (ctx) =>
      ctx.reply('Bu buyruqni bilmayman. /menu ni bosing.'),
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
