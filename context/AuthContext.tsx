// /context/AuthContext.tsx

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// 1. Definir la forma de los datos del usuario y del contexto
interface GoogleUser {
  user: {
    email: string;
    name: string;
    photo: string;
  };
}

interface AuthContextData {
  user: GoogleUser | null;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

// 2. Crear el Contexto con un valor inicial undefined
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// 3. Crear el Proveedor (AuthProvider)
// Este componente envolverá tu aplicación y contendrá toda la lógica.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(true); // Iniciar en true para la carga inicial
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Configurar Google Sign-In al iniciar
    try {
      const webClientId = Constants.expoConfig?.extra?.googleWebClientId;
      GoogleSignin.configure({
        webClientId,
        offlineAccess: true,
        scopes: ['profile', 'email'],
      });
    } catch (err) {
      console.error('Error al configurar Google Sign-In:', err);
    }
    
    // Comprobar si hay un usuario ya logueado
    const checkCurrentUser = async () => {
      try {
        const currentUser = await GoogleSignin.getCurrentUser();
        if (currentUser) {
          setUser(currentUser as GoogleUser);
        }
      } catch (err) {
        console.error('Error al obtener el usuario actual:', err);
      } finally {
        setLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo as GoogleUser);
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('Inicio de sesión cancelado.');
      } else if (err.code === statusCodes.DEVELOPER_ERROR) {
        setError('Error de configuración. Revisa el SHA-1 en Google Cloud.');
      } else {
        setError('Ocurrió un error al iniciar sesión.');
      }
      console.error('Error en signIn:', err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await GoogleSignin.signOut();
      setUser(null);
    } catch (err) {
      console.error('Error en signOut:', err);
      setError('Ocurrió un error al cerrar sesión.');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Crear el Hook personalizado `useAuth` para consumir el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};