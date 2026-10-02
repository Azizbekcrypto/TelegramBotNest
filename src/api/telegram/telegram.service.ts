import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Context, Markup, Telegraf } from 'telegraf';
import { config } from '../../config';
import { UserService } from '../user/user.service';

// 5-dars namunasi: AvtoPizza. O'quvchining boti boshqa g'oyada bo'ladi — tuzilma shu.
const PITSALAR: Record<string, string> = {
  margarita: 'Margarita',
  pepperoni: 'Pepperoni',
  pishloqli: 'Pishloqli',
};

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

    const asosiyMenyu = Markup.inlineKeyboard([
      Markup.button.callback('🍕 Menyu', 'menu'),
      Markup.button.callback('📦 Buyurtma', 'order'),
    ]);

    // /start — ismi bo'lsa salomlashadi va menyuni ko'rsatadi, bo'lmasa ism so'raydi (4-dars)
    this.bot.start(async (ctx) => {
      const user = await this.users.topOrYarat(ctx.from.id);
      if (user.ism) {
        await ctx.reply(
          `Yana salom, ${user.ism}! AvtoPizza'ga xush kelibsiz!`,
          asosiyMenyu,
        );
        return;
      }
      await this.users.holatQoy(user, 'ism_kutilmoqda');
      await ctx.reply('Salom! Ismingiz nima?');
    });

    // /help — buyruqlar ro'yxati (A3: o'quvchining o'z qo'shimchasi namunasi)
    this.bot.command('help', (ctx) =>
      ctx.reply('/start — boshlash · /menu — pitsalar · /buyurtma — buyurtmam'),
    );

    // /menu va «🍕 Menyu» — bir xil javob
    const menyu = (ctx: Context) =>
      ctx.reply(
        'Tanlang:',
        Markup.inlineKeyboard([
          Markup.button.callback('Margarita', 'pitsa:margarita'),
          Markup.button.callback('Pepperoni', 'pitsa:pepperoni'),
          Markup.button.callback('Pishloqli', 'pitsa:pishloqli'),
        ]),
      );
    this.bot.command('menu', (ctx) => menyu(ctx));
    this.bot.action('menu', async (ctx) => {
      await ctx.answerCbQuery();
      await menyu(ctx);
    });

    // Pitsa tanlandi → manzil so'raydi. Ikki marta bosilsa — qayta so'ramaydi (A3 sinovi)
    this.bot.action(/^pitsa:(.+)$/, async (ctx) => {
      await ctx.answerCbQuery();
      const nom = PITSALAR[ctx.match[1]];
      if (!nom) return;
      const user = await this.users.topOrYarat(ctx.from.id);
      if (user.holat === 'manzil_kutilmoqda' && user.tanlov === nom) {
        await ctx.reply(`${nom} allaqachon tanlangan. Manzilingizni yozing.`);
        return;
      }
      await this.users.tanlovQoy(user, nom);
      await ctx.reply(`${nom} — buyurtma qabul qilindi. Manzilingizni yozing.`);
    });

    // /buyurtma va «📦 Buyurtma» — oxirgi buyurtma
    const buyurtma = async (ctx: Context) => {
      if (!ctx.from) return;
      const user = await this.users.topOrYarat(ctx.from.id);
      if (!user.tanlov) {
        await ctx.reply("Hali buyurtma yo'q. /menu dan tanlang.");
        return;
      }
      if (!user.manzil) {
        await ctx.reply(`${user.tanlov} tanlangan. Manzilingizni yozing.`);
        return;
      }
      await ctx.reply(`Buyurtmangiz: ${user.tanlov} · ${user.manzil}`);
    };
    this.bot.command('buyurtma', (ctx) => buyurtma(ctx));
    this.bot.action('order', async (ctx) => {
      await ctx.answerCbQuery();
      await buyurtma(ctx);
    });

    // Matn keldi — holatga qarab: ism, manzil yoki fallback. bot.on('text') eng oxirida turadi
    this.bot.on('text', async (ctx) => {
      const user = await this.users.topOrYarat(ctx.from.id);
      const matn = ctx.message.text.trim();
      if (user.holat === 'ism_kutilmoqda') {
        await this.users.ismQoy(user, matn);
        await ctx.reply(
          `Xush kelibsiz, ${user.ism}! Endi sizni eslab qolaman.`,
          asosiyMenyu,
        );
        return;
      }
      if (user.holat === 'manzil_kutilmoqda') {
        await this.users.manzilQoy(user, matn);
        await ctx.reply(
          `Buyurtma tasdiqlandi: ${user.tanlov} · ${user.manzil}`,
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
