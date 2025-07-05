// /context/AuthContext.tsx

import useGoogleAuth from '@/hooks/useGoogleAuth';
import React, { createContext, ReactNode, useContext } from 'react';

// 1. Definir la forma de los datos del usuario y del contexto
interface GoogleUser {
  user: {
    email: string;
    name: string;
    photo: string;
    customName?: string;
    customPhoto?: string;
  };
}

// Interfaz para actualización de datos de usuario
interface UserUpdateData {
  customName?: string;
  customPhoto?: string;
  password?: string;
}

interface AuthContextData {
  user: GoogleUser | null;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<GoogleUser | null>;
  updateUserProfile: (data: UserUpdateData) => Promise<void>;
}

// 2. Crear el Contexto con un valor inicial undefined
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// 3. Crear el Proveedor (AuthProvider)
// Este componente envolverá tu aplicación y contendrá toda la lógica.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading, error, signIn, signOut, getCurrentUser } = useGoogleAuth();

  // Función para actualizar el perfil del usuario
  const updateUserProfile = async (data: UserUpdateData): Promise<void> => {
    // En una implementación real, esto se conectaría con Firebase u otro backend
    // Por ahora, solo actualizamos el estado local
    if (user) {
      const updatedUser = {
        ...user,
        user: {
          ...user.user,
          ...(data.customName ? { customName: data.customName } : {}),
          ...(data.customPhoto ? { customPhoto: data.customPhoto } : {})
        }
      };

      // Aquí iría la lógica para guardar en backend
      console.log('Actualizando perfil:', updatedUser);

      // Simulamos un retraso de red
      await new Promise(resolve => setTimeout(resolve, 500));

      // En un caso real, actualizaríamos el estado con los datos del backend
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signOut,
    getCurrentUser,
    updateUserProfile,
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