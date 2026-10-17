// Backend manzili — bitta joyda.
// 13-dars: Backend serverda (Render) — o'z manzilingizni yozing.
// Laptopdagi Backend bilan ishlash uchun (9–11-darslar) — kompyuter IP'si (Expo terminalidagi exp://192.168.…:8081 qatoridagi raqamlar):
// export const BACKEND = 'http://192.168.1.5:3000';
export const BACKEND = 'https://SIZNING-XIZMAT.onrender.com';

// 45000 → «45 000 so'm»
export const som = (n) =>
  `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} so'm`;
