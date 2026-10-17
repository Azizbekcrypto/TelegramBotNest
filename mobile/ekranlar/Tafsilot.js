import { Pressable, StyleSheet, Text, View } from 'react-native';
import { som } from '../config';

// 6-Modul 10-dars: bitta Tafsilot ekrani — qaysi pitsa ekanini navigate uzatgan ma'lumotdan (route.params) biladi
export default function Tafsilot({ route, navigation }) {
  const { pitsa } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.nom}>{pitsa.nom}</Text>
      <Text style={styles.narx}>{som(pitsa.narx)}</Text>
      <Pressable style={styles.tugma} onPress={() => navigation.goBack()}>
        <Text style={styles.tugmaMatn}>Menyuga qaytish</Text>
      </Pressable>
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
  nom: { fontSize: 28, fontWeight: 'bold' },
  narx: { fontSize: 20, color: '#e8590c' },
  tugma: {
    marginTop: 16,
    backgroundColor: '#e8590c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  tugmaMatn: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
