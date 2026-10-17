import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { BACKEND, som } from '../config';
import { jami, useSavat } from '../savat';

// 6-Modul 11-dars: Buyurtma — telefondan backend'ga. Backend bitta so'rovda bitta taom oladi (8-dars),
// shuning uchun savatdagi har pitsa alohida POST /buyurtma bo'lib ketadi. manba: 'mobil'
export default function Buyurtma() {
  const { savat, setSavat } = useSavat();
  const [manzil, setManzil] = useState('');
  const [yuborilmoqda, setYuborilmoqda] = useState(false);
  const [xato, setXato] = useState('');
  const [qabul, setQabul] = useState(null); // yuborilgan buyurtma — tasdiq uchun
  const ketyapti = useRef(false); // ekran yangilanguncha bo'lgan ikkinchi bosish uchun

  async function yubor() {
    if (ketyapti.current) return; // A3: ikki marta bosilsa ham bitta buyurtma
    ketyapti.current = true;
    setYuborilmoqda(true);
    setXato('');
    try {
      for (const pitsa of savat) {
        const r = await fetch(BACKEND + '/buyurtma', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taom: pitsa.nom, manzil, manba: 'mobil' }),
        });
        if (!r.ok) throw new Error(String(r.status));
      }
      setQabul({ pitsalar: savat, manzil });
      setSavat([]);
    } catch {
      setXato("Buyurtma ketmadi, qayta urinib ko'ring");
    } finally {
      ketyapti.current = false;
      setYuborilmoqda(false);
    }
  }

  // Qabul qilindi — nima yuborilgani ko'rinadi, savat tozalangan
  const pitsalar = qabul ? qabul.pitsalar : savat;
  const tayyor = manzil.trim() && savat.length && !yuborilmoqda;

  return (
    <View style={styles.container}>
      {qabul && <Text style={styles.qabul}>Qabul qilindi</Text>}
      {pitsalar.map((p, i) => (
        <View key={p.id + i} style={styles.qator}>
          <Text style={styles.nom}>{p.nom}</Text>
          <Text style={styles.narx}>{som(p.narx)}</Text>
        </View>
      ))}
      <Text style={styles.jami}>Jami: {som(jami(pitsalar))}</Text>

      {qabul ? (
        <Text style={styles.manzil}>{qabul.manzil}</Text>
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={manzil}
            onChangeText={setManzil}
            placeholder="Manzilingiz"
          />
          {/* A3: manzilsiz va yuborilayotganda tugma o'chiq */}
          <Pressable
            style={[styles.tugma, !tayyor && styles.ochiq]}
            disabled={!tayyor}
            onPress={yubor}
          >
            <Text style={styles.tugmaMatn}>
              {yuborilmoqda ? 'Yuborilmoqda…' : 'Yuborish'}
            </Text>
          </Pressable>
          {xato ? <Text style={styles.xato}>{xato}</Text> : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  qabul: { fontSize: 24, fontWeight: 'bold', color: '#2b8a3e' },
  qator: { flexDirection: 'row', justifyContent: 'space-between' },
  nom: { fontSize: 18 },
  narx: { fontSize: 18, color: '#e8590c' },
  jami: { fontSize: 20, fontWeight: 'bold' },
  manzil: { fontSize: 16, color: '#495057' },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  tugma: {
    backgroundColor: '#e8590c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  ochiq: { backgroundColor: '#ced4da' },
  tugmaMatn: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  xato: { color: '#c92a2a', fontSize: 16 },
});
