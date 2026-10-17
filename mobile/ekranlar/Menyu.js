import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { BACKEND, som } from '../config';

// 6-Modul 10-dars: menyu botning o'sha Backend'idan (GET /menyu), ro'yxat — FlatList
export default function Menyu({ navigation }) {
  const [menyu, setMenyu] = useState([]);

  useEffect(() => {
    fetch(BACKEND + '/menyu')
      .then((r) => r.json())
      .then(setMenyu);
  }, []);

  return (
    <FlatList
      data={menyu}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.royxat}
      renderItem={({ item }) => (
        <Pressable
          style={styles.qator}
          onPress={() => navigation.navigate('Tafsilot', { pitsa: item })}
        >
          <Text style={styles.nom}>{item.nom}</Text>
          <Text style={styles.narx}>{som(item.narx)}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  royxat: { padding: 16, gap: 12 },
  qator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  nom: { fontSize: 18, fontWeight: 'bold' },
  narx: { fontSize: 18, color: '#e8590c' },
});
