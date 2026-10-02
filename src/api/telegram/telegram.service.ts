import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Markup, Telegraf } from 'telegraf';
import { config } from '../../config';
import { UserService } from '../user/user.service';

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf;

  constructor(private readonly users: UserService) {}

  async onModuleInit() {
    if (!config.BOT_TOKEN) {
      throw new Error(
        'BOT_TOKEN topilmadi. .env faylini oching va @BotFather bergan tokenni yozing (README, 3-qadam).',
      );
    }
    this.bot = new Telegraf(config.BOT_TOKEN);

    // /start — bazada bor bo'lsa ismi bilan salomlashadi, bo'lmasa ism so'raydi
    this.bot.start(async (ctx) => {
      const user = await this.users.topOrYarat(ctx.from.id);
      if (user.ism) {
        await ctx.reply(
          `Yana salom, ${user.ism}! Menyu uchun /menu ni bosing.`,
        );
        return;
      }
      await this.users.holatQoy(user, 'ism_kutilmoqda');
      await ctx.reply('Salom! Ismingiz nima?');
    });

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

    // Matn keldi — holatga qarab: ism kutilayotgan bo'lsa saqlaydi, bo'lmasa fallback
    this.bot.on('text', async (ctx) => {
      const user = await this.users.topOrYarat(ctx.from.id);
      if (user.holat === 'ism_kutilmoqda') {
        await this.users.ismQoy(user, ctx.message.text.trim());
        await ctx.reply(
          `Xush kelibsiz, ${user.ism}! Endi sizni eslab qolaman.`,
        );
        return;
      }
      await ctx.reply('Bu buyruqni bilmayman. /menu ni bosing.');
    });

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
    try {
      this.bot?.stop('server tugadi');
    } catch {
      // bot ulanmagan bo'lsa, to'xtatadigan narsa yo'q
    }
  }
}
