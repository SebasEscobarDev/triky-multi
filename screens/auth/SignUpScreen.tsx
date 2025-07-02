import BtnApp from '@/components/ui/BtnApp';
import { useAuth } from '@/context/AuthContext';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TextInput } from 'react-native-paper';

export default function SignUpScreen({ navigation }: any) {
  const { signIn } = useAuth(); // Simulamos login después de registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    signIn();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.iconContainer}>
            <Image 
              source={require('@/assets/images/icon.png')} 
              style={styles.iconImage} 
              resizeMode="contain"
            />
          </View>
          <Text variant="headlineLarge" style={styles.appTitle}>
            Triky App
          </Text>
          <TouchableOpacity style={styles.demoButtonContainer}>
            <View style={styles.neonDemoBorder}>
              <LinearGradient
                colors={['rgba(63, 145, 66, 0.7)', 'rgba(20, 40, 25, 0.5)']}
                style={styles.demoButtonContent}
              >
                <FontAwesome5 name="info-circle" size={16} color="#ffffff" style={styles.demoIcon} />
                <Text style={styles.demoText}>Desafía a jugadores en todo el mundo</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Registrarse</Text>
        
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email-outline" size={24} color="#4ade80" style={styles.inputIcon} />
          <TextInput
            label="Correo (cualquier correo funciona)"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="flat"
            autoCapitalize="none"
            keyboardType="email-address"
            theme={{ colors: { primary: '#4ade80', onSurfaceVariant: '#94a3b8' } }}
            textColor="#fff"
            underlineStyle={{ display: 'none' }}
            contentStyle={{ backgroundColor: '#1e293b', borderRadius: 15 }}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="#4ade80" style={styles.inputIcon} />
          <TextInput
            label="Contraseña (cualquier contraseña funciona)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="flat"
            theme={{ colors: { primary: '#4ade80', onSurfaceVariant: '#94a3b8' } }}
            textColor="#fff"
            underlineStyle={{ display: 'none' }}
            contentStyle={{ backgroundColor: '#1e293b', borderRadius: 15 }}
          />
        </View>
        
        <BtnApp
          onPress={handleRegister}
          title="Crear Cuenta"
        />
        
        <TouchableOpacity 
          style={styles.signInButtonContainer}
          onPress={() => navigation.navigate('SignIn')}
        >
          <View style={styles.neonSignInBorder}>
            <Text style={styles.signInText}>¿Ya tienes una cuenta? <Text style={styles.signInHighlight}>Inicia Sesión</Text></Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Dark blue background from the image
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
    padding: 5,
  },
  iconImage: {
    width: '100%',
    height: '100%',
  },
  appTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 6,
  },
  demoButtonContainer: {
    marginTop: 10,
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  neonDemoBorder: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#3f9142',
    overflow: 'hidden',
  },
  demoButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
  },
  demoIcon: {
    marginRight: 8,
    textShadowColor: 'rgba(63, 145, 66, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  demoText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    textShadowColor: 'rgba(63, 145, 66, 0.6)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 10,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  formTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 15,
    overflow: 'hidden',
  },
  inputIcon: {
    marginLeft: 8,
    zIndex: 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  input: {
    flex: 1,
    marginBottom: 0,
    backgroundColor: '#1e293b',
    fontSize: 16,
    borderRadius: 15,
    paddingLeft: 36,
    marginLeft: -36,
  },
  signInButtonContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 5,
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  neonSignInBorder: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(63, 145, 66, 0.5)',
  },
  signInText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  signInHighlight: {
    color: '#3f9142',
    fontWeight: '700',
    textShadowColor: 'rgba(63, 145, 66, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
});