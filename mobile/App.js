import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BACKEND, som } from './config';

// 6-Modul 9-dars: AvtoPizza menyusi — botning o'sha Backend'idan (GET /menyu)
export default function App() {
  const [menyu, setMenyu] = useState([]);

  useEffect(() => {
    fetch(BACKEND + '/menyu')
      .then((r) => r.json())
      .then(setMenyu);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sarlavha}>AvtoPizza</Text>
      {menyu.map((p) => (
        <Text key={p.id} style={styles.pitsa}>
          {p.nom} — {som(p.narx)}
        </Text>
      ))}
      <Pressable style={styles.tugma}>
        <Text style={styles.tugmaMatn}>Buyurtma berish</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  sarlavha: { fontSize: 28, fontWeight: 'bold', color: '#e8590c' },
  pitsa: { fontSize: 18 },
  tugma: {
    marginTop: 16,
    backgroundColor: '#e8590c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  tugmaMatn: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
