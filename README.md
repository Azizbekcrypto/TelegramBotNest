# TelegramBotNest

CoddyCamp 5-Modul uchun bot qolipi: NestJS + Telegraf + PostgreSQL + Gemini.
3-darsda bir marta yuklab olasiz, 10-darsgacha botingiz shu papkada o'sadi.

## 5 daqiqada ishga tushirish

1. GitHub'da shu repo'ning yuqori o'ng burchagida **Fork** bosing — o'z nusxangiz paydo bo'ladi
   (7-darsda server kodni aynan shu nusxadan oladi). Keyin o'z nusxangizni yuklab oling:
   ```bash
   git clone https://github.com/SIZNING_LOGIN/TelegramBotNest.git
   cd TelegramBotNest
   ```
2. Kutubxonalarni o'rnating:
   ```bash
   npm install
   ```
3. `.env.example` faylini nusxalab `.env` deb nomlang. `BOT_TOKEN=` qatoriga
   @BotFather bergan tokenni yozing.
4. Ishga tushiring:
   ```bash
   npm run start:dev
   ```
   Terminalda «Telegram bot ulandi» chiqadi.
5. Telegramda botingizni oching, `/start` bosing. Javob: «Salom! Bot ishlayapti.»
6. Papkani Antigravity'da oching. Keyingi qadamlar — darsda.

## Darslar va teglar

Har dars oxiridagi tayyor holat teg bilan saqlanadi. Dars tugagach teg paydo bo'ladi.

| Dars | Bot nimani o'rganadi | Teg |
|---|---|---|
| 3 | menyu tugmalari | `dars-03-done` |
| 4 | ismingizni eslaydi (PostgreSQL) | `dars-04-done` |
| 5 | o'z g'oyangiz (namuna: AvtoPizza) | `dars-05-done` |
| 6 | AI javob beradi (Gemini) | `dars-06-done` |
| 7 | baza + 24/7 hosting | `dars-07-done` |
| 9 | fidbekdan keyin tuzatish | `dars-09-done` |
| 10 | agent: 2 ta asbob | `dars-10-done` |

Ortda qolsangiz, mentor bilan tayyor holatga o'ting:
```bash
git checkout -f dars-04-done
```
Diqqat: o'zingiz yozgan kod o'chadi. Kerak bo'lsa, oldin papkani nusxalab qo'ying.

## Papkalar

```
src/main.ts                 serverni yoqadi
src/config/index.ts         .env dan sozlamalarni o'qiydi
src/api/app.module.ts       modullarni bir joyga yig'adi (4a-Moduldagi kabi)
src/api/app.controller.ts   GET /  →  «Bot ishlayapti» (hosting tekshiradi)
src/api/telegram/           bot: /start va javoblar — asosiy ish shu yerda; telegram.controller.ts — webhook (7-dars)
src/api/buyurtma/           buyurtmalar jadvali (7-dars)
FIKRLAR.md                  foydalanuvchi fikrlari va iteratsiyalar (9-dars)
src/api/ai/                 Gemini: system-prompt.ts (6-dars) — botingizning xarakteri shu yerda
src/core/entity/            baza jadvallari: users (4-dars)
src/api/user/               users bilan ishlash: topish, ism saqlash
src/infrastructure/         bazaga ulanish (DATABASE_URL)
```

## Serverga joylash (7-dars)

Bot laptopda ishlasa, laptop yopilganda to'xtaydi. Serverda u laptopsiz ishlaydi.

1. Kodingizni GitHub'dagi nusxangizga yuboring: `git add -A` → `git commit -m "7-dars"` → `git push`.
2. render.com → **Sign in with GitHub** → **New → Web Service** → o'z `TelegramBotNest` repo'ngiz. Render `Dockerfile`ni o'zi topadi, tarif **Free**.
3. **Environment** bo'limiga uchta qator: `BOT_TOKEN`, `DATABASE_URL`, `GEMINI_API_KEY` (qiymatlar `.env` dan). `WEBHOOK_URL` yozish shart emas — Render o'zi beradi.
4. **Deploy**. Loglarda «Telegram bot ulandi (webhook)» chiqsin.
5. Laptopdagi botni to'xtating (Ctrl+C) — bitta token ikki joyda ishlamaydi. Telefondan `/start`.

Bepul server 15 daqiqa jimlikdan keyin uxlaydi; xabar kelganda 30–60 soniyada uyg'onadi va javob beradi.
Laptopda yana ishlasangiz (`npm run start:dev`), polling webhook'ni o'chiradi — keyin `git push` qiling, Render qayta joylaydi va webhook'ni o'zi tiklaydi.

## Xatolar

| Terminalda nima chiqdi | Sabab | Nima qilasiz |
|---|---|---|
| `BOT_TOKEN topilmadi` | `.env` yo'q yoki bo'sh | 3-qadam |
| `DATABASE_URL topilmadi` | 4-darsdan baza kerak | Neon URL ni `.env` ga yozing |
| `401: Unauthorized` | token noto'g'ri nusxalangan | @BotFather'dan qayta oling |
| `409: Conflict` | bitta bot ikki joyda ishlayapti | eski terminalni yoping |
| bot jim | «Telegram bot ulandi» chiqmagan | terminaldagi xatoni o'qing |
| serverdagi bot jim | laptopda bot ishlayapti (polling webhook'ni o'chirdi) | laptopdagini to'xtating, `git push` yoki Render'da «Manual Deploy» |

## .env — hech kimga bermang

Token — botingizning kaliti. `.env` git'ga tushmaydi (`.gitignore`da).
Chatga, skrinshotga, guruhga yozmang. Tarqalib ketsa, @BotFather'da `/revoke`.
