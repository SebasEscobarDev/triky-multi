import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { useGameMatch } from '@/context/GameMatchContext';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChallengeUserModal from './ChallengeUserModal';

interface NewGameModalProps {
  visible: boolean;
  onClose: () => void;
}

const NewGameModal: React.FC<NewGameModalProps> = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const [challengeModalVisible, setChallengeModalVisible] = useState(false);

  const handleTrainingWithAI = () => {
    navigation.navigate('TrikyScreen' as never);
    onClose();
  };

  const { startMatchSearch } = useGameMatch();

  const handleFindRandomOpponent = () => {
    startMatchSearch();
    onClose();
  };

  const handleChallengePlayer = () => {
    setChallengeModalVisible(true);
    onClose();
  };
  
  const handleChallengeUser = (userId: string) => {
    console.log(`Desafiando al usuario con ID: ${userId}`);
    setChallengeModalVisible(false);
    // Aquí se implementaría la lógica para iniciar el desafío
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.modalCard}
            activeOpacity={0.9}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nueva partida</Text>
              <TouchableOpacity 
                onPress={onClose}
                style={styles.closeButton}
              >
                <MaterialCommunityIcons name="close" size={24} color="rgba(255, 255, 255, 0.8)" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              {/* Botón Entrenamiento con IA */}
              <TouchableOpacity 
                style={styles.modalOptionButton}
                onPress={handleTrainingWithAI}
              >
                <View style={styles.modalButtonBorder}>
                  <LinearGradient
                    colors={['rgba(63, 145, 66, 0.9)', 'rgba(20, 80, 30, 0.7)']}
                    style={styles.modalButtonGradient}
                  >
                    <MaterialCommunityIcons name="robot" size={20} color="white" style={styles.modalButtonIcon} />
                    <Text style={styles.modalButtonText}>Entrenamiento con IA</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
              
              {/* Botón Buscar un oponente random */}
              <TouchableOpacity 
                style={styles.modalOptionButton}
                onPress={handleFindRandomOpponent}
              >
                <View style={styles.modalButtonBorder}>
                  <LinearGradient
                    colors={['rgba(63, 145, 66, 0.9)', 'rgba(20, 80, 30, 0.7)']}
                    style={styles.modalButtonGradient}
                  >
                    <MaterialCommunityIcons name="account-search" size={20} color="white" style={styles.modalButtonIcon} />
                    <Text style={styles.modalButtonText}>Buscar oponente random</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
              
              {/* Botón Desafiar a alguien */}
              <TouchableOpacity 
                style={styles.modalOptionButton}
                onPress={handleChallengePlayer}
              >
                <View style={styles.modalButtonBorder}>
                  <LinearGradient
                    colors={['rgba(63, 145, 66, 0.9)', 'rgba(20, 80, 30, 0.7)']}
                    style={styles.modalButtonGradient}
                  >
                    <MaterialCommunityIcons name="account-multiple" size={20} color="white" style={styles.modalButtonIcon} />
                    <Text style={styles.modalButtonText}>Desafiar a alguien</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
    
    {/* Modal para desafiar a otros usuarios */}
    <ChallengeUserModal 
      visible={challengeModalVisible}
      onClose={() => setChallengeModalVisible(false)}
      onChallengeUser={handleChallengeUser}
    />
    </>
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
  },
  modalCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(63, 145, 66, 0.4)',
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(63, 145, 66, 0.3)',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(63, 145, 66, 0.6)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 6,
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    padding: 20,
    gap: 15,
  },
  modalOptionButton: {
    width: '100%',
  },
  modalButtonBorder: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3f9142',
    overflow: 'hidden',
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  modalButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonIcon: {
    marginRight: 10,
  },
  modalButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
  },
});

export default NewGameModal;
