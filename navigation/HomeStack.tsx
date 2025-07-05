import HomeScreen from '@/screens/tabs/HomeScreen';
import TrikyScreen from '@/screens/TrikyScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="TrikyScreen" component={TrikyScreen} />
    </Stack.Navigator>
  );
}
