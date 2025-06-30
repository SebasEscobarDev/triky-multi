import GoogleSigninSignup from '@/components/GoogleSignin-Signup'; // Tu componente de UI
import { AuthProvider } from '@/context/AuthContext';
import React from 'react';

const App = () => {
  return (
    <AuthProvider>
      <GoogleSigninSignup />
    </AuthProvider>
  );
};

export default App;