import { useAuth } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, Avatar, Card, Divider, IconButton, Surface, Text, useTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user } = useAuth();
  const theme = useTheme();
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 });
  }, [opacity]);

  /**
   * Extrae las iniciales del nombre de usuario para mostrar en el Avatar
   * @returns {string} Las iniciales del usuario o 'U' si no hay nombre disponible
   */
  const getInitial = (): string => {
    // Si no hay usuario o nombre, devolver 'U' (Usuario)
    if (!user?.user?.name) return 'U';
    
    // Dividir el nombre en palabras
    const nameParts = user.user.name.trim().split(' ');
    
    // Si solo hay una palabra, tomar la primera letra
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    // Si hay múltiples palabras, tomar la inicial de la primera y última palabra
    return (
      nameParts[0].charAt(0).toUpperCase() + 
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor: theme.colors.background }]}>
      <StatusBar backgroundColor="#0f172a" barStyle="light-content" />
      
      {/* Header al estilo de HomeScreen */}
      <Appbar.Header 
        style={[styles.header, { borderBottomColor: '#3f9142', backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', shadowColor: '#3f9142', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 5 }]}
      >
        <Appbar.Content 
          title="Mi Perfil" 
          color="#ffffff"
          titleStyle={styles.headerTitle}
        />
        <Appbar.Action icon="account-edit" color="#ffffff" onPress={() => navigation.navigate('EditAccount')} />
      </Appbar.Header>
      
      {/* Contenido principal */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
        bounces={true}
        overScrollMode="always"
        scrollEventThrottle={16}
        fadingEdgeLength={10}
      >
        {/* Perfil de Usuario - Google Style Card */}
        <Surface style={styles.cardSurface} elevation={1}>
          <Card style={styles.profileCard}>
            <Card.Content style={styles.profileCardContent}>
              <View style={styles.horizontalLayout}>
                <View style={styles.avatarContainer}>
                  {user?.user?.photo ? (
                    <Avatar.Image
                      size={72}
                      source={{ uri: user.user.photo }}
                      style={styles.avatar}
                    />
                  ) : (
                    <Avatar.Text
                      size={72}
                      label={getInitial()}
                      style={[styles.avatar, { backgroundColor: '#3f9142' }]}
                      color="#ffffff"
                      labelStyle={{ fontSize: 32, fontWeight: '500' }}
                    />
                  )}
                </View>
                
                <View style={styles.contentContainer}>
                  <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{user?.user?.name || 'Usuario'}</Text>
                    <Text style={styles.profileEmail}>{user?.user?.email || 'Sin correo'}</Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.editProfileButton} 
                    onPress={() => navigation.navigate('EditAccount')}
                  >
                    <Text style={styles.editProfile}>Gestionar tu cuenta</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card.Content>
          </Card>
        </Surface>
        
        <Divider style={styles.divider} />
        
        {/* Nivel del jugador - estilo Material You */}
        <Surface style={styles.levelCard} elevation={1}>
          <View style={styles.levelCardHeader}>
            <View>
              <Text variant="titleMedium" style={styles.levelTitle}>Nivel 5</Text>
              <Text variant="bodySmall" style={styles.levelSubtitle}>420/600 XP para nivel 6</Text>
            </View>
            <IconButton
              icon="information-outline"
              size={20}
              iconColor={theme.colors.primary}
              onPress={() => {}}
            />
          </View>
          
          {/* Barra de progreso */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <LinearGradient
                colors={['#3f9142', '#68BB59']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: '70%' }]}
              />
            </View>
          </View>
        </Surface>
        
        {/* Estadísticas del jugador - Tarjetas al estilo Google */}
        <Text variant="titleMedium" style={styles.sectionTitle}>Estadísticas de juego</Text>
        
        <View style={styles.statsGrid}>
          {/* Partidas */}
          <Surface style={styles.statCard} elevation={1}>
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Partidas</Text>
          </Surface>
          
          {/* Victorias */}
          <Surface style={styles.statCard} elevation={1}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Victorias</Text>
          </Surface>
          
          {/* Derrotas */}
          <Surface style={styles.statCard} elevation={1}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Derrotas</Text>
          </Surface>
          
          {/* Empates */}
          <Surface style={styles.statCard} elevation={1}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Empates</Text>
          </Surface>
          
          {/* Puntos */}
          <Surface style={styles.statCard} elevation={1}>
            <Text style={styles.statValue}>150</Text>
            <Text style={styles.statLabel}>Puntos</Text>
          </Surface>
          
          {/* % Victorias */}
          <Surface style={styles.statCard} elevation={1}>
            <Text style={styles.statValue}>53%</Text>
            <Text style={styles.statLabel}>% Victorias</Text>
          </Surface>
        </View>
        
        {/* Logros y Rachas */}
        <Text variant="titleMedium" style={styles.sectionTitle}>Logros y rachas</Text>
        
        <Surface style={styles.achievementsCard} elevation={1}>
          {/* Racha actual */}
          <View style={styles.achievementRow}>
            <View style={styles.achievementIconContainer}>
              <IconButton icon="trophy" size={24} iconColor="#FFD700" />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Racha actual</Text>
              <Text style={styles.achievementValue}>3 victorias consecutivas</Text>
            </View>
          </View>
          
          <Divider style={styles.achievementDivider} />
          
          {/* Mejor racha */}
          <View style={styles.achievementRow}>
            <View style={styles.achievementIconContainer}>
              <IconButton icon="crown" size={24} iconColor="#FFD700" />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Mejor racha</Text>
              <Text style={styles.achievementValue}>6 victorias consecutivas</Text>
            </View>
          </View>
        </Surface>
        
        {/* Espaciador inferior para evitar superposición con la barra de tabs */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Estilos para el perfil con diseño de tarjeta estilo Google
  cardSurface: {
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  profileCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileCardContent: {
    paddingHorizontal: 16,
  },
  horizontalLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 16,
  },
  avatar: {
    backgroundColor: '#3f9142',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileInfo: {
    marginBottom: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  editProfileButton: {
    backgroundColor: 'rgba(63, 145, 66, 0.15)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(63, 145, 66, 0.3)',
  },
  editProfile: {
    fontSize: 14,
    color: '#3f9142',
    fontWeight: '500',
  },
  // Estilos base
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  scrollContentContainer: {
    paddingBottom: 100,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginVertical: 16,
  },
  bottomSpacer: {
    height: 80, // Para evitar solapamiento con la barra de tabs
  },
  
  // Estilos de cabecera
  header: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(63, 145, 66, 0.6)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  
  // Estilos de perfil
  profileHeader: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  avatarWrapper: {
    marginBottom: 12,
  },
  userName: {
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  userEmail: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 16,
    textAlign: 'center',
  },
  editButton: {
    borderRadius: 20,
    backgroundColor: 'rgba(63, 145, 66, 0.2)',
    borderColor: 'transparent',
  },
  editButtonContent: {
    height: 36,
  },
  editButtonLabel: {
    color: '#3f9142',
    fontSize: 14,
  },
  
  // Estilos de nivel
  levelCard: {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 16,
    marginBottom: 24,
  },
  levelCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  levelTitle: {
    fontWeight: '500',
    color: '#ffffff',
  },
  levelSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  progressContainer: {
    height: 8,
    width: '100%',
    backgroundColor: 'transparent',
  },
  progressBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  
  // Estilos de secciones
  sectionTitle: {
    fontWeight: '500',
    marginBottom: 16,
    color: '#ffffff',
  },
  
  // Estilos de estadísticas
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: 'rgba(63, 145, 66, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3f9142',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  
  // Estilos de logros
  achievementsCard: {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    overflow: 'hidden',
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  achievementIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  achievementValue: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  achievementDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});
