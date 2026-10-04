import Constants from 'expo-constants';

// Backend manzili — bitta joyda. Kompyuter IP'sini Expo o'zi beradi (exp://192.168.…:8081 qatoridagi raqamlar),
// shuning uchun telefon kompyuterdagi Backend'ni (3000-port) topadi. Ishlamasa, IP'ni qo'lda yozing:
// export const BACKEND = 'http://192.168.1.5:3000';
const host = (Constants.expoConfig?.hostUri ?? 'localhost').split(':')[0];

export const BACKEND = `http://${host}:3000`;

// 45000 → «45 000 so'm»
export const som = (n) =>
  `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} so'm`;
