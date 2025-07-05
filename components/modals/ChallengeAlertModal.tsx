import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ChallengeAlertModalProps {
  visible: boolean;
  onAccept: () => void;
  onReject: () => void;
  userName: string;
}

const ChallengeAlertModal: React.FC<ChallengeAlertModalProps> = ({
  visible,
  onAccept,
  onReject,
  userName
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
              <Text style={styles.modalTitle}>Mensaje de alerta de desafío</Text>
            </View>

            <View style={styles.messageContainer}>
              <MaterialCommunityIcons 
                name="sword-cross" 
                size={40} 
                color="#3f9142" 
                style={styles.icon} 
              />
              <Text style={styles.challengeMessage}>
                El usuario <Text style={styles.userName}>{userName}</Text> te está retando a jugar
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.acceptButton]}
                onPress={onAccept}
              >
                <LinearGradient
                  colors={['rgba(63, 145, 66, 0.9)', 'rgba(20, 80, 30, 0.7)']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Aceptar</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.rejectButton]}
                onPress={onReject}
              >
                <LinearGradient
                  colors={['rgba(150, 30, 30, 0.9)', 'rgba(80, 20, 20, 0.7)']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Rechazar</Text>
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
  icon: {
    marginBottom: 15,
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  challengeMessage: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  userName: {
    fontWeight: 'bold',
    color: '#3f9142',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    width: '45%',
    borderRadius: 10,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  acceptButton: {
    borderWidth: 1,
    borderColor: '#3f9142',
    shadowColor: '#3f9142',
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: 'rgba(150, 30, 30, 0.6)',
    shadowColor: 'rgba(150, 30, 30, 0.8)',
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

export default ChallengeAlertModal;
