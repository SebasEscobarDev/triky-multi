// /context/AuthContext.tsx

import useGoogleAuth from '@/hooks/useGoogleAuth';
import React, { createContext, ReactNode, useContext } from 'react';

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
  getCurrentUser: () => Promise<GoogleUser | null>;
}

// 2. Crear el Contexto con un valor inicial undefined
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// 3. Crear el Proveedor (AuthProvider)
// Este componente envolverá tu aplicación y contendrá toda la lógica.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
 const { user, loading, error, signIn, signOut, getCurrentUser } = useGoogleAuth();

  const value = {
    user,
    loading,
    error,
    signIn,
    signOut,
    getCurrentUser,
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