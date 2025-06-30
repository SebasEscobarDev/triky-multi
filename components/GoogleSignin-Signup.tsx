import useGoogleAuth from '@/hooks/useGoogleAuth';
import { FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useEffect } from 'react';
import { ActivityIndicator, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GoogleSigninSignup = () => {
 
  const { user, loading, error, signIn, signOut, getCurrentUser } = useGoogleAuth();

  useEffect(() => {
    getCurrentUser();
  }, [loading]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : user ? (
        <View style={styles.cardContainer}>
          <BlurView intensity={50} style={styles.cardBlur} tint="light">
            <View style={styles.cardContent}>
              <View style={styles.photoContainer}>
                <Image 
                  source={{ uri: user.user.photo }} 
                  style={styles.profilePhoto} 
                  resizeMode="cover"
                />
              </View>
              
              <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{user.user.name}</Text>
                <View style={styles.emailContainer}>
                  <Text style={styles.typeLabel}>Correo:</Text>
                  <Text style={styles.emailText}>{user.user.email}</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
                <Text style={styles.signOutText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      ) : (
        <TouchableOpacity style={styles.googleButton} onPress={signIn}>
          <FontAwesome5 name="google" size={20} color="white" style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Inicia Sesión con Google</Text>
        </TouchableOpacity>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  googleIcon: {
    marginRight: 12,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardBlur: {
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  typeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#636366',
    marginRight: 6,
  },
  emailText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '400',
  },
  signOutButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 8,
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GoogleSigninSignup;
