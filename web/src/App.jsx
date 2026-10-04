import { useEffect, useState } from 'react';

// 6-Modul 8-dars: Backend manzili — bitta joyda
const BACKEND = 'http://localhost:3000';
const XATO = "Server javob bermayapti, birozdan keyin urinib ko'ring";
const som = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} so'm`;

export default function App() {
  const [menyu, setMenyu] = useState(null);
  const [xabar, setXabar] = useState('');
  const [savol, setSavol] = useState('');
  const [javob, setJavob] = useState('');

  // A1: menyu Backend'dan keladi (GET /menyu)
  useEffect(() => {
    fetch(BACKEND + '/menyu')
      .then((r) => r.json())
      .then(setMenyu)
      .catch(() => setXabar(XATO));
  }, []);

  // A2: «Buyurtma» → manzil → POST /buyurtma
  async function buyurtma(taom) {
    const manzil = prompt(`${taom} — manzilingizni yozing:`);
    if (!manzil) return;
    try {
      const r = await fetch(BACKEND + '/buyurtma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taom, manzil }),
      });
      const d = await r.json();
      setXabar(r.ok ? 'Buyurtma qabul qilindi' : d.message);
    } catch {
      setXabar(XATO);
    }
  }

  // A3: savol → POST /savol → AI javobi
  async function yubor() {
    if (!savol.trim()) return;
    setJavob('…');
    try {
      const r = await fetch(BACKEND + '/savol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savol }),
      });
      setJavob((await r.json()).javob);
    } catch {
      setJavob(XATO);
    }
  }

  return (
    <main style={s.sahifa}>
      <h1>AvtoPizza</h1>
      {!menyu && !xabar && <p>Menyu yuklanmoqda…</p>}
      {menyu?.map((p) => (
        <div key={p.id} style={s.karta}>
          <b>{p.nom}</b>
          <span>{som(p.narx)}</span>
          <button onClick={() => buyurtma(p.nom)}>Buyurtma</button>
        </div>
      ))}
      {xabar && <p style={s.xabar}>{xabar}</p>}

      <h2>Savolingiz bormi?</h2>
      <div style={s.qator}>
        <input
          style={s.input}
          value={savol}
          onChange={(e) => setSavol(e.target.value)}
          placeholder="Qaysi pitsa achchiq emas?"
        />
        <button onClick={yubor}>Yuborish</button>
      </div>
      {javob && <p>{javob}</p>}
    </main>
  );
}

const s = {
  sahifa: { maxWidth: 480, margin: '40px auto', fontFamily: 'sans-serif' },
  karta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    marginBottom: 8,
    border: '1px solid #ddd',
    borderRadius: 8,
  },
  xabar: { fontWeight: 'bold' },
  qator: { display: 'flex', gap: 8 },
  input: { flex: 1, padding: 8 },
};
