import { useAuth } from '@/context/AuthContext';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Text, useTheme, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function ProfileScreen() {
  const { user } = useAuth();
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

  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={[styles.header]}>
        <Appbar.Content 
          title="Mi Perfil" 
          color="#ffffff"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>
      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        
        {/* Tarjeta Neón */}
        <Animated.View style={[styles.neonCardContainer, animatedStyle]}>
          <View style={styles.neonBorder}>
            <LinearGradient
              colors={['rgba(63, 145, 66, 0.2)', 'rgba(15, 23, 42, 0.85)']}
              style={styles.gradientBackground}
            >
              <View style={styles.cardContent}>
                <View style={styles.avatarContainer}>
                  {user?.user.photo ? (
                    <Avatar.Image 
                      size={100} 
                      source={{ uri: user.user.photo }}
                      style={[styles.avatar]}
                    />
                  ) : (
                    <Avatar.Icon 
                      size={100} 
                      icon="account-circle" 
                      style={[styles.avatar, { backgroundColor: theme.colors.primary }]} 
                      color={theme.colors.onPrimary}
                    />
                  )}
                  <View style={styles.neonCircle} />
                </View>
                
                <Text variant="headlineMedium" style={[styles.username, { color: theme.colors.onSurface, textShadowColor: 'rgba(63, 145, 66, 0.8)', textShadowOffset: {width: 0, height: 0}, textShadowRadius: 10 }]}>
                  {user?.user.name || 'Usuario'}
                </Text>
                
                <View style={styles.infoContainer}>
                  <View style={styles.infoRow}>
                    <IconButton icon="email" size={24} iconColor={theme.colors.primary} />
                    <Text style={[styles.infoText, { color: theme.colors.onSurfaceVariant }]}>
                      {user?.user.email || 'usuario@triky.app'}
                    </Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <IconButton icon="trophy" size={24} iconColor={theme.colors.primary} />
                    <Text style={[styles.infoText, { color: theme.colors.onSurfaceVariant }]}>
                      Jugador Profesional
                    </Text>
                  </View>
                </View>
                
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: theme.colors.primary }]}>15</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>Partidas</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: theme.colors.primary }]}>8</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>Victorias</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: theme.colors.primary }]}>150</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>Puntos</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        </Animated.View>
      </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  neonCardContainer: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
    backgroundColor: 'transparent',
  },
  neonBorder: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3f9142',
    overflow: 'hidden',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
  },
  gradientBackground: {
    padding: 20,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#3f9142',
  },
  neonCircle: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: '#3f9142',
    top: -5,
    left: -5,
    opacity: 0.7,
  },
  username: {
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(63, 145, 66, 0.3)',
    alignSelf: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(63, 145, 66, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});