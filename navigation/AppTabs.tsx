import { useAuth } from '@/context/AuthContext';
import HomeStack from '@/navigation/HomeStack';
import SettingsStack from '@/navigation/SettingsStack';
import ProfileStack from '@/navigation/ProfileStack';
import RankingScreen from '@/screens/tabs/RankingScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        unmountOnBlur: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'] = 'help';

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Ranking') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Perfil') {
            // Si estamos en la pestaña de perfil y el usuario tiene foto, mostrarla
            if (user?.user?.photo) {
              return (
                <View style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderWidth: focused ? 2 : 0,
                  borderColor: focused ? '#3f9142' : color,
                  overflow: 'hidden',
                  shadowColor: focused ? '#3f9142' : 'transparent',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: focused ? 0.8 : 0,
                  shadowRadius: focused ? 4 : 0,
                  elevation: focused ? 5 : 0
                }}>
                  <Image 
                    source={{ uri: user.user.photo }} 
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
              );
            }
            // Si no hay foto, usar el icono predeterminado
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Ajustes') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          // Aplicar efecto neón a los iconos activos
          return focused ? (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={iconName} size={size} color={color} style={styles.activeIcon} />
            </View>
          ) : (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#3f9142',
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          borderTopWidth: 1,
          borderTopColor: '#3f9142',
          height: 60,
          elevation: 5,
          shadowColor: '#3f9142',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          position: 'absolute',
          backdropFilter: 'blur(10px)',
        },
        tabBarItemStyle: {
          marginVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 3,
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStack} />
      <Tab.Screen name="Ranking" component={RankingScreen} />
      <Tab.Screen name="Perfil" component={ProfileStack} />
      <Tab.Screen name="Ajustes" component={SettingsStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    textShadowColor: 'rgba(63, 145, 66, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
});