import ProfileScreen from '@/screens/tabs/ProfileScreen';
import EditAccountScreen from '@/screens/EditAccountScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditAccount" component={EditAccountScreen} />
    </Stack.Navigator>
  );
}
