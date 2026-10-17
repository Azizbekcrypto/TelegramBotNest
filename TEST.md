# Test jadvali (6-Modul 13-dars)

Har kirish yo'lidan bitta buyurtma bering va buyurtmani oxirigacha kuzating (end-to-end test).
Har katakka ✓ yoki ✗ qo'ying. Serverga chiqargandan keyin (A3) jadvalni qayta to'ldiring.

| Kirish yo'li | Yuborildi | Database'da | Admin xabari | Mijozga tasdiq |
|---|---|---|---|---|
| Web    | ✓ | ✓ | ✓ | ✓ |
| Mobil  | ✓ | ✓ | ✓ | ✓ |
| Bot    | ✓ | ✓ | ✓ | ✓ |

Namuna (AvtoPizza): birinchi sinovda Bot × Admin xabari — ✗ (xabar faqat `POST /buyurtma` ichida edi, bot uni chetlab o'tardi).
Tuzatish: xabar `BuyurtmaService.yoz` ichiga ko'chdi — endi sayt, mobil, bot va AI buyurtmasi hammasi admin chatiga keladi.

Har ustun nimani tekshiradi:

- **Yuborildi** — buyurtma tugmasi bosildi, xato chiqmadi (sayt: «Buyurtma», ilova: «Yuborish», bot: pitsa tugmasi + manzil).
- **Database'da** — Neon'dagi SQL Editor:
  `SELECT manba, pitsa, manzil, created_at FROM buyurtmalar ORDER BY created_at DESC LIMIT 3;`
  — har yo'l o'z `manba` si bilan: `sayt` · `mobil` · `bot`.
- **Admin xabari** — admin chatida (`.env` dagi `ADMIN_CHAT_ID`) «Yangi buyurtma (…)» xabari.
- **Mijozga tasdiq** — mijoz ko'rgan javob: saytda «Buyurtma qabul qilindi», ilovada «Qabul qilindi», botda «Buyurtma tasdiqlandi: …».
