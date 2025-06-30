import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

// Define the shape of the user object based on library documentation
interface GoogleUser {
  user: {
    email: string;
    familyName: string;
    givenName: string;
    id: string;
    name: string;
    photo: string;
  };
  idToken: string | null;
  serverAuthCode: string | null;
  scopes?: string[];
}

interface AuthState {
  user: GoogleUser | null;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<GoogleUser | null>;
}

const useGoogleAuth = (): AuthState => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Configure Google Sign-In
    try {
      // Get web client ID from Constants (properly loaded from app.config.js)
      const webClientId = Constants.expoConfig?.extra?.googleWebClientId;
      
      console.log('Using web client ID from app.config.js:', webClientId);
      
      GoogleSignin.configure({
        webClientId,
        offlineAccess: true, // Try with offline access enabled
        scopes: ['profile', 'email']
      });
      
      console.log('Google Sign-In configured with hard-coded web client ID');
      
      // We won't do automatic sign-in check here, only on button press
      // This helps avoid initialization errors
    } catch (err: any) {
      console.error('GoogleSignin configure error:', err);
    }
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if Play Services are available
      await GoogleSignin.hasPlayServices();
      
      // Sign in and get user info
      const userInfo = await GoogleSignin.signIn();
      
      // Make sure we have a valid user response before setting state
      // First convert to unknown, then check if it has the expected structure
      const signInResult = userInfo as unknown;
      if (signInResult && 
          typeof signInResult === 'object' && 
          'user' in signInResult && 
          signInResult.user && 
          typeof signInResult.user === 'object' && 
          'name' in signInResult.user) {
        setUser(signInResult as GoogleUser);
      }
      
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
      setLoading(false);
      
      console.error('Unexpected sign-in error:', err);
      
      // Handle specific error codes
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('Sign in was cancelled');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        setError('Sign in is already in progress');
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Google Play Services not available');
      } else if (err.message && err.message.includes('DEVELOPER_ERROR')) {
        setError('Authentication configuration error. Check SHA-1 certificate fingerprint in Google Cloud Console.');
        console.error('DEVELOPER_ERROR: This is typically caused by missing SHA-1 fingerprint registration in Google Cloud Console.');
      } else {
        console.error('Unexpected sign-in error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
    } catch (err: any) {
      console.error('Sign out error:', err);
    }
  };

  const getCurrentUser = async () => {
    try {
      // Check if the user is already signed in
      const currentUser = await GoogleSignin.getCurrentUser();
      
      if (currentUser) {
        // Update the user state if a user is already signed in
        setUser(currentUser as GoogleUser);
        return currentUser as GoogleUser;
      }
      
      return null;
    } catch (err: any) {
      console.error('Error getting current user:', err);
      setError(err.message || 'Failed to get current user');
      return null;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
    getCurrentUser,
  };
};

export default useGoogleAuth;