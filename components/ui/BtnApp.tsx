import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BtnAppProps {
  onPress: () => void;
  title: string;
  iconName?: React.ComponentProps<typeof FontAwesome5>['name'];
  iconColor?: string;
  iconSize?: number;
}

const BtnApp: React.FC<BtnAppProps> = ({
  onPress,
  title,
  iconName,
  iconColor = 'white',
  iconSize = 20,
}) => {
  // No necesitamos theme ya que estamos usando colores fijos para el efecto neón
  return (
    <TouchableOpacity 
      style={styles.buttonContainer}
      onPress={onPress}
    >
      <View style={styles.neonBorder}>
        <LinearGradient
          colors={['rgba(63, 145, 66, 0.9)', 'rgba(63, 145, 66, 0.6)']}
          style={styles.button}
        >
          {iconName && (
            <FontAwesome5
              name={iconName}
              size={iconSize}
              color={iconColor}
              style={[styles.icon, styles.neonText]}
            />
          )}
          <Text style={[styles.buttonText, styles.neonText]}>{title}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
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
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 15,
    minHeight: 60,
    width: '100%',
    justifyContent: 'center',
  },
  neonText: {
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  icon: {
    marginRight: 12,
  },
});

export default BtnApp;
