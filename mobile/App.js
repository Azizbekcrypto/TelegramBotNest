import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menyu from './ekranlar/Menyu';
import Tafsilot from './ekranlar/Tafsilot';

// 6-Modul 10-dars: ikki ekran — Stack Navigator (ekranlar dastasi: navigate qo'yadi, «Orqaga» oladi)
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menyu" component={Menyu} />
        <Stack.Screen
          name="Tafsilot"
          component={Tafsilot}
          options={{ headerBackTitle: 'Orqaga' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
