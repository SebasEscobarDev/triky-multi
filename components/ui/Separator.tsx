import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SeparatorProps {
  text?: string;
}

const Separator: React.FC<SeparatorProps> = ({ text = 'ó' }) => {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.separatorLine} />
      <Text style={styles.separatorText}>{text}</Text>
      <View style={styles.separatorLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  separatorText: {
    color: '#94a3b8',
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default Separator;
