import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PlayButtonProps {
  onPress: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.playButtonContainer}
    >
      <View style={styles.neonButtonBorder}>
        <LinearGradient
          colors={['rgba(63, 145, 66, 0.9)', 'rgba(20, 80, 30, 0.7)']}
          style={styles.playButton}
        >
          <MaterialCommunityIcons
            name="play"
            size={18}
            color="white"
            style={styles.playIcon}
          />
          <Text style={styles.playButtonText}>Jugar</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playButtonContainer: {
    marginRight: 10,
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  neonButtonBorder: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3f9142',
    overflow: 'hidden',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    justifyContent: 'center',
  },
  playButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  playIcon: {
    marginRight: 5,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
});

export default PlayButton;
