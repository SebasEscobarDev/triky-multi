import { useAuth } from '@/context/AuthContext';
import { BlurView } from 'expo-blur';
import { useEffect } from 'react';
import { ActivityIndicator, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import BtnApp from './ui/BtnApp';

const GoogleSigninSignup = () => {
  const theme = useTheme();
  const { user, loading, error, signIn, signOut, getCurrentUser } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : user ? (
        <View style={styles.cardContainer}>
          <BlurView intensity={50} style={[styles.cardBlur, { backgroundColor: theme.colors.surface }]} tint="dark">
            <View style={styles.cardContent}>
              <View style={styles.photoContainer}>
                <Image 
                  source={{ uri: user.user.photo }} 
                  style={styles.profilePhoto} 
                  resizeMode="cover"
                />
              </View>
              
              <View style={styles.infoContainer}>
                {/* <Text>106118156905475330433</Text>
                <Text >{user.user.id}</Text> */}
                <Text style={styles.nameText}>{user.user.name}</Text>
                <View style={styles.emailContainer}>
                  <Text style={styles.typeLabel}>Correo:</Text>
                  <Text style={styles.emailText}>{user.user.email}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={[styles.signOutButton, { backgroundColor: theme.colors.primary }]} 
                onPress={signOut}
              >
                <Text style={styles.signOutText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      ) : (
        <BtnApp
          onPress={signIn}
          title="Continua con Google"
          iconName="google"
          iconColor="white"
          iconSize={20}
        />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontWeight: '500',
  },
  cardContainer: {
    width: '100%',
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
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
    color: '#fff',
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
    fontSize: 18,
    fontWeight: '500',
    color: '#94a3b8',
    marginRight: 6,
  },
  emailText: {
    fontSize: 18,
    color: '#4caf50',
    fontWeight: '400',
  },
  signOutButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  signOutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default GoogleSigninSignup;
