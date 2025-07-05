import SettingsScreen from '@/screens/tabs/SettingsScreen';
import HelpSupportScreen from '@/screens/settings/HelpSupportScreen';
import ContactSupportScreen from '@/screens/settings/ContactSupportScreen';
import AboutScreen from '@/screens/settings/AboutScreen';
import TermsConditionsScreen from '@/screens/settings/TermsConditionsScreen';
import PrivacyPolicyScreen from '@/screens/settings/PrivacyPolicyScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    </Stack.Navigator>
  );
}
