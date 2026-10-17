import { createContext, useContext } from 'react';

// 6-Modul 11-dars: savat — bitta, hamma ekranlar uchun. useState App.js da, ekranlar shu yerdan oladi
export const SavatContext = createContext({ savat: [], setSavat: () => {} });

export const useSavat = () => useContext(SavatContext);

// Jami — narxlar yig'indisi
export const jami = (savat) => savat.reduce((s, p) => s + p.narx, 0);
