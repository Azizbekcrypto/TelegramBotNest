import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { som } from '../config';
import { jami, useSavat } from '../savat';

// 6-Modul 11-dars: Savat — tanlangan pitsalar, jami (reduce) va «Buyurtma berish»
export default function Savat({ navigation }) {
  const { savat } = useSavat();
  const bosh = savat.length === 0;

  return (
    <View style={styles.container}>
      <FlatList
        data={savat}
        keyExtractor={(item, i) => item.id + i}
        contentContainerStyle={styles.royxat}
        ListEmptyComponent={
          <Text style={styles.bosh}>Savat bo'sh — menyudan tanlang</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.qator}>
            <Text style={styles.nom}>{item.nom}</Text>
            <Text style={styles.narx}>{som(item.narx)}</Text>
          </View>
        )}
      />
      <View style={styles.pastki}>
        <Text style={styles.jami}>Jami: {som(jami(savat))}</Text>
        {/* A3: bo'sh savat bilan buyurtma berib bo'lmaydi */}
        <Pressable
          style={[styles.tugma, bosh && styles.ochiq]}
          disabled={bosh}
          onPress={() => navigation.navigate('Buyurtma')}
        >
          <Text style={styles.tugmaMatn}>Buyurtma berish</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  royxat: { padding: 16, gap: 12 },
  bosh: { fontSize: 16, color: '#868e96', textAlign: 'center', marginTop: 32 },
  qator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  nom: { fontSize: 18 },
  narx: { fontSize: 18, color: '#e8590c' },
  pastki: { padding: 16, gap: 12, backgroundColor: '#fff' },
  jami: { fontSize: 20, fontWeight: 'bold' },
  tugma: {
    backgroundColor: '#e8590c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  ochiq: { backgroundColor: '#ced4da' },
  tugmaMatn: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
