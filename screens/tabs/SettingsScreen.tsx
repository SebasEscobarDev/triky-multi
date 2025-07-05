import { useAuth } from '@/context/AuthContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, Divider, Text, useTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function SettingsScreen() {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();
  const theme = useTheme();
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }); 

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, [opacity]);
  
  // Obtener la primera letra del nombre para el avatar
  const getInitial = () => {
    if (user?.user?.name) {
      return user.user.name.charAt(0).toUpperCase();
    }
    return "?";
  };

  const handleSignOut = () => {
    signOut();
  };
  
  const handleDeleteAccount = () => {
    // Implementar lógica para eliminar la cuenta
    console.log('Eliminando cuenta...');
  };
  
  const navigateToContactSupport = () => {
    // @ts-ignore - Sabemos que esta ruta existe
    navigation.navigate('ContactSupport');
  };
  
  const navigateToAbout = () => {
    // @ts-ignore - Sabemos que esta ruta existe
    navigation.navigate('About');
  };
  
  const navigateToTermsConditions = () => {
    // @ts-ignore - Sabemos que esta ruta existe
    navigation.navigate('TermsConditions');
  };
  
  const navigateToPrivacyPolicy = () => {
    // @ts-ignore - Sabemos que esta ruta existe
    navigation.navigate('PrivacyPolicy');
  };
  
  const navigateToHelpSupport = () => {
    // @ts-ignore - Sabemos que esta ruta existe
    navigation.navigate('HelpSupport');
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={[styles.header]}>
        <Appbar.Content 
          title="Ajustes" 
          color="#ffffff"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Sección App Settings */}
        <Text style={styles.sectionTitle}>Ajustes de la aplicación</Text>
        
        {/* Help & Support */}
        <TouchableOpacity style={styles.menuItem} onPress={navigateToHelpSupport}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="help-circle-outline" size={22} color="#3f9142" style={styles.menuIcon} />
          </View>
          <Text style={styles.menuText}>Ayuda y soporte</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
        
        {/* Contact Support */}
        <TouchableOpacity style={styles.menuItem} onPress={navigateToContactSupport}>
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="email-outline" size={22} color="#3f9142" style={styles.menuIcon} />
          </View>
          <Text style={styles.menuText}>Contactar soporte</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
        
        {/* About */}
        <TouchableOpacity style={styles.menuItem} onPress={navigateToAbout}>
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="information-outline" size={22} color="#3f9142" style={styles.menuIcon} />
          </View>
          <Text style={styles.menuText}>Acerca de</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
        
        <Divider style={styles.divider} />
        
        {/* Sección Data & Privacy */}
        <Text style={styles.sectionTitle}>Datos y privacidad</Text>
        
        {/* Términos y Condiciones */}
        <TouchableOpacity style={styles.menuItem} onPress={navigateToTermsConditions}>
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="file-document-outline" size={22} color="#3f9142" style={styles.menuIcon} />
          </View>
          <Text style={styles.menuText}>Términos y Condiciones</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
        
        {/* Políticas de Privacidad */}
        <TouchableOpacity style={styles.menuItem} onPress={navigateToPrivacyPolicy}>
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="shield-lock-outline" size={22} color="#3f9142" style={styles.menuIcon} />
          </View>
          <Text style={styles.menuText}>Políticas de Privacidad</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
        
        {/* Delete Account */}
        <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount}>
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="account-remove-outline" size={22} color="#e53e3e" style={styles.menuIcon} />
          </View>
          <Text style={[styles.menuText, { color: '#e53e3e' }]}>Eliminar cuenta</Text>
        </TouchableOpacity>
        
        <Divider style={styles.divider} />
        
        {/* Sección Account */}
        <Text style={styles.sectionTitle}>Cuenta</Text>
        
        {/* Sign Out */}
        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="logout" size={22} color="#3f9142" style={styles.menuIcon} />
          </View>
          <Text style={[styles.menuText, { color: '#3f9142' }]}>Cerrar sesión</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#3f9142',
    elevation: 5,
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    backdropFilter: 'blur(10px)',
  },
  headerTitle: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(63, 145, 66, 0.6)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  warningText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 5,
  },
  bottomSpacer: {
    height: 80, // Espacio suficiente para evitar sobreposición con la barra de tabs
    marginBottom: 20,
  },
  divider: {
    backgroundColor: 'rgba(63, 145, 66, 0.2)',
    height: 1,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  // Estilos para las secciones
  sectionTitle: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#3f9142',
    textShadowColor: 'rgba(63, 145, 66, 0.4)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(30, 40, 50, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(63, 145, 66, 0.15)',
  },
  menuIcon: {
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  // Estilos antiguos para el botón de cerrar sesión
  buttonContainer: {
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  neonBorder: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3f9142',
    overflow: 'hidden',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
  },
  buttonIcon: {
    marginRight: 10,
  },
});
