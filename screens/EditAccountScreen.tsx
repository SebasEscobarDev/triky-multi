import { useAuth } from '@/context/AuthContext';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Divider, HelperText, IconButton, Surface, Text, TextInput, useTheme } from 'react-native-paper';

type EditAccountScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function EditAccountScreen({ navigation }: EditAccountScreenProps) {
  const { user, updateUserProfile } = useAuth();
  const theme = useTheme();
  
  // Estados para los campos editables
  const [customName, setCustomName] = useState('');
  const [customPhoto, setCustomPhoto] = useState<string | undefined>(undefined);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [photoError, setPhotoError] = useState<string>('');
  const [isValidUrl, setIsValidUrl] = useState<boolean>(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para validar y establecer la URL de la imagen
  const handlePhotoUrlChange = (text: string) => {
    setPhotoUrl(text);
    
    // Si el campo está vacío, no mostrar error
    if (!text.trim()) {
      setIsValidUrl(true);
      setPhotoError('');
      return;
    }
    
    // Verificar si la URL es válida
    const urlPattern = /^(https?:\/\/)?([\w\-])+\.[a-zA-Z]{2,}(\/[\w\-\.~:\/?#\[\]@!$&'\(\)\*\+,;=]*)*$/;
    const isValid = urlPattern.test(text);
    setIsValidUrl(isValid);
    
    if (!isValid) {
      setPhotoError('Por favor ingresa una URL válida');
    } else {
      setPhotoError('');
    }
  };
  
  // Función para aplicar la URL de la foto automáticamente cuando es válida
  React.useEffect(() => {
    if (photoUrl && isValidUrl) {
      setCustomPhoto(photoUrl);
    }
  }, [photoUrl, isValidUrl]);

  // Validar contraseña
  const validatePassword = () => {
    if (newPassword && newPassword.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    
    if (newPassword && newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  // Guardar cambios
  const handleSaveChanges = async () => {
    if (newPassword && !validatePassword()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Llamar a la función de actualización del perfil
      await updateUserProfile({
        customName,
        customPhoto: customPhoto,
        ...(newPassword ? { password: newPassword } : {})
      });
      
      // Mostrar mensaje de éxito
      Alert.alert(
        'Perfil actualizado',
        'Los cambios en tu perfil se han guardado correctamente.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      Alert.alert('Error', 'No se pudieron guardar los cambios en tu perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header 
        style={[styles.header, { backgroundColor: 'rgba(15, 23, 42, 0.9)' }]}
      >
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content 
          title="Editar Cuenta" 
          color="#ffffff"
          titleStyle={styles.headerTitle}
        />
        <Appbar.Action icon="content-save" color="#ffffff" disabled={loading} onPress={handleSaveChanges} />
      </Appbar.Header>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
      >
        <Surface style={styles.section} elevation={1}>
          <Text style={styles.sectionTitle}>Información de Google</Text>
          <Divider style={styles.divider} />
          
          {/* Campos no editables */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre de Google</Text>
            <TextInput
              value={user?.user?.name || 'No disponible'}
              style={styles.textInput}
              disabled
              right={<TextInput.Icon icon="lock" color="#888" />}
            />
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Correo electrónico</Text>
            <TextInput
              value={user?.user?.email || 'No disponible'}
              style={styles.textInput}
              disabled
              right={<TextInput.Icon icon="lock" color="#888" />}
            />
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Foto de Google</Text>
            <View style={styles.photoPreviewContainer}>
              {user?.user?.photo ? (
                <Image 
                  source={{ uri: user.user.photo }} 
                  style={styles.photoPreview} 
                />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Icon name="account" size={36} color="#888" />
                </View>
              )}
              <Text style={styles.photoNote}>foto de la cuenta de Google</Text>
            </View>
          </View>
        </Surface>

        <Surface style={styles.section} elevation={1}>
          <Text style={styles.sectionTitle}>Personalización</Text>
          <Divider style={styles.divider} />
          
          {/* Campos editables */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Personalizado</Text>
            <TextInput
              value={customName}
              onChangeText={setCustomName}
              placeholder="Introduce un nombre personalizado"
              style={styles.textInput}
              maxLength={30}
            />
            <HelperText type="info">
              Este nombre se mostrará en lugar del nombre de Google
            </HelperText>
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Foto Personalizada (URL)</Text>
            <View style={styles.photoSelectionContainer}>
              {customPhoto ? (
                <View style={styles.customPhotoContainer}>
                  <Image 
                    source={{ uri: customPhoto }} 
                    style={styles.photoPreview} 
                  />
                  <IconButton 
                    icon="close-circle" 
                    size={24} 
                    style={styles.removePhotoButton} 
                    onPress={() => {
                      setCustomPhoto(undefined);
                      setPhotoUrl('');
                    }} 
                  />
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Icon name="account" size={36} color="#888" />
                </View>
              )}
              
              <View style={styles.urlInputContainer}>
                <TextInput
                  value={photoUrl}
                  onChangeText={handlePhotoUrlChange}
                  placeholder="https://ejemplo.com/mi-imagen.jpg"
                  style={[styles.textInput, !isValidUrl && styles.errorInput]}
                  maxLength={500}
                  autoCapitalize="none"
                  keyboardType="url"
                  right={<TextInput.Icon icon="link" color="#888" />}
                />
                
                {photoError ? (
                  <HelperText type="error">{photoError}</HelperText>
                ) : photoUrl && isValidUrl ? (
                  <HelperText type="info" style={styles.validUrlMessage}>
                    <Icon name="check-circle" size={16} color="#3f9142" /> URL válida
                  </HelperText>
                ) : (
                  <HelperText type="info">
                    Ingresa la URL completa de tu imagen incluyendo http:// o https://
                  </HelperText>
                )}
              </View>
            </View>
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Contraseña</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!passwordVisible}
              placeholder="Nueva contraseña"
              style={styles.textInput}
              right={
                <TextInput.Icon 
                  icon={passwordVisible ? "eye-off" : "eye"} 
                  onPress={() => setPasswordVisible(!passwordVisible)} 
                />
              }
            />
            
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!confirmPasswordVisible}
              placeholder="Confirmar contraseña"
              style={[styles.textInput, styles.confirmPasswordInput]}
              right={
                <TextInput.Icon 
                  icon={confirmPasswordVisible ? "eye-off" : "eye"} 
                  onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} 
                />
              }
            />
            
            {passwordError ? (
              <HelperText type="error">
                {passwordError}
              </HelperText>
            ) : (
              <HelperText type="info">
                La contraseña debe tener al menos 6 caracteres
              </HelperText>
            )}
          </View>
        </Surface>
        
        {/* Botones de acción */}
        <View style={styles.actionContainer}>
          <Button 
            mode="contained"
            style={styles.saveButton}
            labelStyle={styles.saveButtonLabel}
            onPress={handleSaveChanges}
            loading={loading}
            icon="content-save-outline"
            uppercase={false}
          >
            Guardar Cambios
          </Button>
          
          <Button 
            mode="outlined"
            style={styles.cancelButton}
            labelStyle={styles.cancelButtonLabel}
            onPress={() => navigation.goBack()}
            disabled={loading}
            icon="close"
            uppercase={false}
          >
            Cancelar
          </Button>
        </View>
      </ScrollView>

      {/* El diálogo para seleccionar foto ya no es necesario */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#3f9142',
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContentContainer: {
    paddingVertical: 16,
    paddingBottom: 50,
  },
  section: {
    borderRadius: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 8,
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(63, 145, 66, 0.5)',
    fontSize: 16,
  },
  errorInput: {
    borderBottomColor: 'rgba(255, 70, 70, 0.8)',
    borderBottomWidth: 2,
  },
  confirmPasswordInput: {
    marginTop: 8,
  },
  photoPreviewContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  photoSelectionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 8,
  },
  customPhotoContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  photoPreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  photoNote: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  urlInputContainer: {
    width: '100%',
    marginTop: 8,
  },
  validUrlMessage: {
    color: '#3f9142',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  actionContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  saveButton: {
    marginBottom: 12,
    paddingVertical: 8,
    backgroundColor: '#3f9142',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  saveButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: '#ffffff',
  },
  cancelButton: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    borderWidth: 1,
  },
  cancelButtonLabel: {
    fontSize: 16,
    color: '#f1f1f1',
  },
  dialog: {
    backgroundColor: '#1a2234',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingBottom: 10,
  },
  dialogTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  dialogText: {
    color: '#f0f0f0',
    fontSize: 16,
  },
  dialogActions: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    width: '100%',
  },
  dialogButton: {
    backgroundColor: '#3f9142',
    marginBottom: 8,
    borderRadius: 8,
    width: '100%',
  },
  dialogButtonLabel: {
    fontSize: 14,
    color: '#ffffff',
  },
  dialogCancelButton: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    width: '100%',
  },
  dialogCancelButtonLabel: {
    fontSize: 14,
    color: '#f1f1f1',
  },
});
