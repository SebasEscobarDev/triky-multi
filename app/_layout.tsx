import { AuthProvider } from '@/context/AuthContext';
import RootNavigator from '@/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';

// Crear un tema oscuro personalizado con acentos verdes
const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3f9142',         // Verde principal para botones y elementos principales
    accent: '#4ade80',          // Verde para acentos
    onPrimary: '#ffffff',       // Texto sobre botones primarios
    background: '#0f172a',      // Fondo oscuro azulado
    surface: '#1e293b',         // Superficies (tarjetas, inputs)
    surfaceVariant: '#334155',  // Variante de superficie para contenedores
    onSurface: '#ffffff',       // Texto sobre superficies
    onSurfaceVariant: '#94a3b8',// Texto secundario
    outline: '#3f9142',         // Contornos de componentes
    elevation: {
      level0: 'transparent',
      level1: '#1e293b',        // Fondo elevado nivel 1
      level2: '#273549',        // Fondo elevado nivel 2
      level3: '#334155',        // Fondo elevado nivel 3
      level4: '#3e4a61',        // Fondo elevado nivel 4
      level5: '#475569',        // Fondo elevado nivel 5
    }
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="light" />
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}