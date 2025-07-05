import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

interface InputWithIconProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  label,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.inputContainer}>
      <MaterialCommunityIcons name={icon} size={24} color="#4ade80" style={styles.inputIcon} />
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        mode="flat"
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        theme={{ colors: { primary: '#4ade80', onSurfaceVariant: '#94a3b8' } }}
        textColor="#fff"
        underlineStyle={{ display: 'none' }}
        contentStyle={{ backgroundColor: '#1e293b', borderRadius: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 15,
    paddingLeft: 40,
  },
});

export default InputWithIcon;
