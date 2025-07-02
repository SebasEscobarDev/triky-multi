import { useAuth } from '@/context/AuthContext';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text as RNText } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function LogoutScreen() {
  const { signOut } = useAuth();
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
          title="Salir" 
          color="#ffffff"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>
      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        <Text variant="headlineMedium" style={[styles.text, { color: theme.colors.onSurface }]}>
          ¿Estás seguro de que quieres salir?
        </Text>
        <TouchableOpacity 
          onPress={signOut}
          style={styles.buttonContainer}
        >
          <View style={styles.neonBorder}>
            <LinearGradient
              colors={['rgba(63, 145, 66, 0.9)', 'rgba(20, 80, 30, 0.7)']}
              style={styles.button}
            >
              <MaterialCommunityIcons
                name="logout"
                size={20}
                color="white"
                style={styles.buttonIcon}
              />
              <RNText style={styles.buttonText}>Cerrar Sesión</RNText>
            </LinearGradient>
          </View>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
    width: '80%',
  },
  neonBorder: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#3f9142',
    overflow: 'hidden',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  buttonIcon: {
    marginRight: 10,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
});