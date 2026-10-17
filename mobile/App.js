import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menyu from './ekranlar/Menyu';
import Tafsilot from './ekranlar/Tafsilot';
import Savat from './ekranlar/Savat';
import Buyurtma from './ekranlar/Buyurtma';
import { SavatContext, useSavat } from './savat';

// 6-Modul 10-dars: ekranlar — Stack Navigator (ekranlar dastasi: navigate qo'yadi, «Orqaga» oladi)
// 11-dars: Savat va Buyurtma ekranlari, savat state'i — hamma ekranlar uchun bitta
const Stack = createNativeStackNavigator();

// Sarlavhadagi savat soni (savat.length) — bosilsa Savat ekrani ochiladi
function SavatSoni({ navigation }) {
  const { savat } = useSavat();
  return (
    <Pressable
      style={styles.savat}
      onPress={() => navigation.navigate('Savat')}
    >
      <Text style={styles.savatMatn}>Savat</Text>
      <View style={styles.son}>
        <Text style={styles.sonMatn}>{savat.length}</Text>
      </View>
    </Pressable>
  );
}

export default function App() {
  const [savat, setSavat] = useState([]);

  return (
    <SavatContext.Provider value={{ savat, setSavat }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerBackTitle: 'Orqaga',
            headerTintColor: '#e8590c',
            headerRight: () => <SavatSoni navigation={navigation} />,
          })}
        >
          <Stack.Screen name="Menyu" component={Menyu} />
          <Stack.Screen name="Tafsilot" component={Tafsilot} />
          <Stack.Screen name="Savat" component={Savat} />
          <Stack.Screen name="Buyurtma" component={Buyurtma} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SavatContext.Provider>
  );
}

const styles = StyleSheet.create({
  savat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  savatMatn: { fontSize: 16, color: '#e8590c' },
  son: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: '#e8590c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sonMatn: { color: '#fff', fontWeight: 'bold' },
});
