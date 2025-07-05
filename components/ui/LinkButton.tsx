import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LinkButtonProps {
  onPress: () => void;
  text: string;
  highlightText?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  onPress,
  text,
  highlightText,
}) => {
  // Si hay texto destacado, dividimos el texto para renderizarlo correctamente
  const renderText = () => {
    if (highlightText && text.includes(highlightText)) {
      const parts = text.split(highlightText);
      return (
        <Text style={styles.linkText}>
          {parts[0]}
          <Text style={styles.highlightText}>{highlightText}</Text>
          {parts.length > 1 ? parts[1] : ''}
        </Text>
      );
    }
    return <Text style={styles.linkText}>{text}</Text>;
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.neonBorder}>
        {renderText()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  neonBorder: {
    borderRadius: 10,
    padding: 4,
  },
  linkText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  highlightText: {
    color: '#4ade80',
    fontWeight: 'bold',
  },
});

export default LinkButton;
