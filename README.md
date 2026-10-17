# TelegramBotNest

CoddyCamp 5-Modul uchun bot qolipi: NestJS + Telegraf + PostgreSQL + Gemini.
3-darsda bir marta yuklab olasiz, 10-darsgacha botingiz shu papkada o'sadi.
6-Modulda shu Backend'ga sayt (`web/`, 8-dars) va telefon ilovasi (`mobile/`, 9–11-darslar) ulanadi.

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

### 6-Modul

| Dars | Nima qo'shiladi | Teglar |
|---|---|---|
| 4 | agentga uchinchi asbob `getOrders` (faqat o'qiydi) | `dars-6-04-start` · `dars-6-04-done` |
| 8 | sayt (`web/`): menyu, buyurtma, AI — bitta Backend orqali | `dars-6-08-start` · `dars-6-08-done` |
| 9 | telefon ilovasi (`mobile/`, Expo): menyu Backend'dan | `dars-6-09-start` · `dars-6-09-done` |
| 10 | ilovada ikki ekran: Menyu (FlatList) → Tafsilot (Stack Navigator) | `dars-6-10-start` · `dars-6-10-done` |
| 11 | mobil: savat va buyurtma — `POST /buyurtma` (manba `mobil`), admin xabari | `dars-6-11-start` · `dars-6-11-done` |
| 13 | to'liq tizim: test jadvali (`TEST.md`), admin xabari hamma yo'l uchun bitta joyda, Backend serverda | `dars-6-13-start` · `dars-6-13-done` |

Repo'ni 5-Modulda fork qilgansiz — 6-Modul teglari sizning nusxangizda yo'q.
Ortda qolsangiz, avval teglarni asosiy repo'dan oling, keyin tayyor holatga o'ting:
```bash
git fetch https://github.com/Azizbekcrypto/TelegramBotNest --tags
git checkout -f dars-6-04-done
```

8-darsdan ikkita terminal ishlaydi: birinchisida Backend (`npm run start:dev`, 3000-port),
ikkinchisida sayt (`cd web` → `npm install` → `npm run dev`, 5173-port).
9-darsdan telefon ilovasi ham: `cd mobile` → `npm install` → `npx expo start`, telefonda Expo Go bilan QR (telefon va kompyuter bitta Wi-Fi'da).
10-darsdan ilovada navigatsiya kutubxonalari bor — tegga o'tgandan keyin `cd mobile` → `npm install` qayta bajaring.

## Papkalar

```
src/main.ts                 serverni yoqadi
src/config/index.ts         .env dan sozlamalarni o'qiydi
src/api/app.module.ts       modullarni bir joyga yig'adi (4a-Moduldagi kabi)
src/api/app.controller.ts   GET /  →  «Bot ishlayapti» (hosting tekshiradi); GET /menyu, POST /savol (6-Modul 8-dars)
src/api/telegram/           bot: /start va javoblar — asosiy ish shu yerda; telegram.controller.ts — webhook (7-dars)
src/api/buyurtma/           buyurtmalar jadvali (7-dars); buyurtma.controller.ts — POST /buyurtma (6-Modul 8-dars), manba body'dan (11-dars); buyurtma.service.ts — yoz: adminga xabar hamma yo'l uchun (13-dars)
FIKRLAR.md                  foydalanuvchi fikrlari va iteratsiyalar (9-dars)
TEST.md                     test jadvali: Web · Mobil · Bot × 4 tekshiruv (6-Modul 13-dars)
web/                        sayt — React (6-Modul 8-dars), localhost:5173
mobile/                     telefon ilovasi — React Native + Expo (6-Modul 9–11-darslar); config.js — Backend manzili (BACKEND)
mobile/ekranlar/            ilova ekranlari: Menyu.js, Tafsilot.js (10-dars), Savat.js, Buyurtma.js (11-dars); App.js — navigatsiya (Stack)
mobile/savat.js             savat — hamma ekranlar uchun bitta (11-dars)
src/api/ai/                 Gemini: system-prompt.ts (6-dars), agent.service.ts — asboblar checkOrder/saveOrder (10-dars), getOrders (6-Modul 4-dars)
src/api/menyu.ts            menyu va narxlar — bitta joyda
src/core/entity/            baza jadvallari: users (4-dars)
src/api/user/               users bilan ishlash: topish, ism saqlash
src/infrastructure/         bazaga ulanish (DATABASE_URL)
```

## Serverga joylash (7-dars)

Bot laptopda ishlasa, laptop yopilganda to'xtaydi. Serverda u laptopsiz ishlaydi.

1. Kodingizni GitHub'dagi nusxangizga yuboring: `git add -A` → `git commit -m "7-dars"` → `git push`.
2. render.com → **Sign in with GitHub** → **New → Web Service** → o'z `TelegramBotNest` repo'ngiz. Render `Dockerfile`ni o'zi topadi, tarif **Free**.
3. **Environment** bo'limiga uchta qator: `BOT_TOKEN`, `DATABASE_URL`, `GEMINI_API_KEY` (qiymatlar `.env` dan). `WEBHOOK_URL` yozish shart emas — Render o'zi beradi.
   6-Modul 13-darsdan to'rtinchi qator: `ADMIN_CHAT_ID` (admin xabari serverda ham kelsin).
4. **Deploy**. Loglarda «Telegram bot ulandi (webhook)» chiqsin.
5. Laptopdagi botni to'xtating (Ctrl+C) — bitta token ikki joyda ishlamaydi. Telefondan `/start`.

Bepul server 15 daqiqa jimlikdan keyin uxlaydi; xabar kelganda 30–60 soniyada uyg'onadi va javob beradi.
Laptopda yana ishlasangiz (`npm run start:dev`), polling webhook'ni o'chiradi — keyin `git push` qiling, Render qayta joylaydi va webhook'ni o'zi tiklaydi.

6-Modul 13-dars: serverga faqat Backend (bot bilan birga) chiqadi. Sayt va ilova laptopdan ishlaydi va serverdagi Backend'ga ulanadi —
`web/src/App.jsx` va `mobile/config.js` dagi `BACKEND` ga o'z Render manzilingizni yozing (`dars-6-13-done` da namuna: `https://SIZNING-XIZMAT.onrender.com`).

## Xatolar

| Terminalda nima chiqdi | Sabab | Nima qilasiz |
|---|---|---|
| `BOT_TOKEN topilmadi` | `.env` yo'q yoki bo'sh | 3-qadam |
| `DATABASE_URL topilmadi` | 4-darsdan baza kerak | Neon URL ni `.env` ga yozing |
| `401: Unauthorized` | token noto'g'ri nusxalangan | @BotFather'dan qayta oling |
| `409: Conflict` | bitta bot ikki joyda ishlayapti | eski terminalni yoping |
| bot jim | «Telegram bot ulandi» chiqmagan | terminaldagi xatoni o'qing |
| saytda `Failed to fetch` | Backend ishlamayapti, manzil noto'g'ri yoki CORS yoqilmagan | 1-terminalni tekshiring; `web/src/App.jsx` dagi `BACKEND` va `src/main.ts` dagi CORS |
| admin xabar olmadi | `.env` da `ADMIN_CHAT_ID` bo'sh | botga `/id` yuboring, raqamni `.env` ga yozing, Backend'ni qayta yoqing |
| serverdagi bot jim | laptopda bot ishlayapti (polling webhook'ni o'chirdi) | laptopdagini to'xtating, `git push` yoki Render'da «Manual Deploy» |

## .env — hech kimga bermang

Token — botingizning kaliti. `.env` git'ga tushmaydi (`.gitignore`da).
Chatga, skrinshotga, guruhga yozmang. Tarqalib ketsa, @BotFather'da `/revoke`.
