// Menyu — bitta joyda: bot tugmalari, AI system prompt va agent asboblari shu ro'yxatni ishlatadi
export const PITSALAR: Record<string, { nom: string; narx: number }> = {
  margarita: { nom: 'Margarita', narx: 45000 },
  pepperoni: { nom: 'Pepperoni', narx: 55000 },
  pishloqli: { nom: 'Pishloqli', narx: 50000 },
};
export const narxi = (nom: string | null) =>
  Object.values(PITSALAR).find(
    (p) => p.nom.toLowerCase() === String(nom).toLowerCase(),
  )?.narx ?? 0;
export const som = (n: number) =>
  `${n.toLocaleString('ru-RU').replace(/ /g, ' ')} so'm`;
