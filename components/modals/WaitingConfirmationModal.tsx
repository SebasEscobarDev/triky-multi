import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';

interface WaitingConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  challengedUserName: string;
}

const WaitingConfirmationModal: React.FC<WaitingConfirmationModalProps> = ({
  visible,
  onCancel,
  challengedUserName
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['rgba(15, 23, 42, 0.95)', 'rgba(15, 23, 42, 0.98)']}
            style={styles.gradient}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Desafiando</Text>
            </View>

            <View style={styles.messageContainer}>
              <Text style={styles.message}>
                Esperando confirmación del usuario.
              </Text>
              
              <View style={styles.spinnerContainer}>
                <ActivityIndicator 
                  size="large" 
                  color="#3f9142" 
                  style={styles.spinner} 
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={onCancel}
              >
                <LinearGradient
                  colors={['rgba(75, 75, 75, 0.9)', 'rgba(50, 50, 50, 0.7)']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(63, 145, 66, 0.4)',
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  gradient: {
    width: '100%',
    padding: 20,
  },
  modalHeader: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(63, 145, 66, 0.3)',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(63, 145, 66, 0.6)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 6,
  },
  messageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  message: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(63, 145, 66, 0.3)',
    marginVertical: 15,
  },
  spinner: {
    transform: [{ scale: 1.5 }]
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
  },
  cancelButton: {
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.6)',
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  }
});

export default WaitingConfirmationModal;
