import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGameMatch } from '@/context/GameMatchContext';

// Función auxiliar para formatear segundos en formato mm:ss
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const MatchSearchAlert: React.FC = () => {
  const { isSearchingMatch, elapsedTime, estimatedTime, cancelMatchSearch } = useGameMatch();

  // Estilo animado para el pulso
  const pulseStyle = useAnimatedStyle(() => {
    const animation = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1, // Repetir infinitamente
      true // Alternar dirección
    );
    
    return {
      transform: [{ scale: isSearchingMatch ? animation : withSpring(1) }],
    };
  });

  // Si no está buscando partida, no mostrar nada
  if (!isSearchingMatch) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, pulseStyle]}>
      <LinearGradient
        colors={['rgba(20, 80, 30, 0.9)', 'rgba(63, 145, 66, 0.85)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <MaterialCommunityIcons name="account-search" size={20} color="white" style={styles.icon} />
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>Esperando partida</Text>
            <Text style={styles.subtitle}>
              {formatTime(elapsedTime)} / Estimado: {formatTime(estimatedTime)}
            </Text>
          </View>
          
          <TouchableOpacity onPress={cancelMatchSearch} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 55, // Justo debajo del header
    left: 15,
    right: 15,
    zIndex: 1000, // Asegura que esté por encima de otros elementos
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    marginTop: 2,
  },
  closeButton: {
    padding: 5,
  }
});

export default MatchSearchAlert;
