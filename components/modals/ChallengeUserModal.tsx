import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import WaitingConfirmationModal from './WaitingConfirmationModal';
import { 
  Modal, 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  FlatList, 
  TextInput,
  ActivityIndicator
} from 'react-native';
import { Text } from 'react-native-paper';

// Definir la interfaz para los usuarios
interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'playing';
}

// Mock de datos de usuarios para la demo
const mockUsers: User[] = [
  { id: '1', name: 'Alejandro Pérez', status: 'online' },
  { id: '2', name: 'Maria González', status: 'online' },
  { id: '3', name: 'Juan Rodríguez', status: 'playing' },
  { id: '4', name: 'Carlos Martínez', status: 'offline' },
  { id: '5', name: 'Laura Sánchez', status: 'online' },
  { id: '6', name: 'Miguel Torres', status: 'online' },
  { id: '7', name: 'Ana López', status: 'playing' },
  { id: '8', name: 'Pedro Ramírez', status: 'offline' },
];

interface ChallengeUserModalProps {
  visible: boolean;
  onClose: () => void;
  onChallengeUser: (userId: string) => void;
}

const ChallengeUserModal: React.FC<ChallengeUserModalProps> = ({
  visible,
  onClose,
  onChallengeUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [waitingConfirmationVisible, setWaitingConfirmationVisible] = useState(false);

  // Simular la carga de usuarios (en una app real esto sería una llamada a API)
  useEffect(() => {
    if (visible) {
      setLoading(true);
      // Simular delay de carga
      setTimeout(() => {
        setUsers(mockUsers);
        setLoading(false);
      }, 1000);
    } else {
      setSearchQuery('');
    }
  }, [visible]);

  // Filtrar usuarios basados en la búsqueda
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (user: User) => {
    // Solo permitir desafiar usuarios en línea
    if (user.status === 'online') {
      setSelectedUser(user);
      setWaitingConfirmationVisible(true);
      // Aquí normalmente enviarías una solicitud al servidor para desafiar al usuario
      onClose(); // Cerramos el modal de selección de usuario
    }
  };

  const handleCancelChallenge = () => {
    // Cancelar el desafío
    setWaitingConfirmationVisible(false);
    setSelectedUser(null);
  };

  const renderUserItem = ({ item }: { item: User }) => {
    // Determinar el color del estado
    let statusColor = '#888';
    let statusText = 'Desconectado';
    
    if (item.status === 'online') {
      statusColor = '#3f9142';
      statusText = 'En línea';
    } else if (item.status === 'playing') {
      statusColor = '#e6a500';
      statusText = 'Jugando';
    }

    return (
      <TouchableOpacity 
        style={styles.userItem} 
        onPress={() => handleUserSelect(item)}
        disabled={item.status !== 'online'}
      >
        <View style={styles.userAvatar}>
          {item.avatar ? (
            <View style={styles.avatarImage}>
              {/* Avatar del usuario (podría ser una imagen) */}
              <MaterialCommunityIcons name="account" size={24} color="#FFF" />
            </View>
          ) : (
            <View style={styles.avatarPlaceholder}>
              <MaterialCommunityIcons name="account" size={24} color="#FFF" />
            </View>
          )}
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
            <Text style={styles.userStatus}>{statusText}</Text>
          </View>
        </View>

        {item.status === 'online' && (
          <View style={styles.challengeButton}>
            <MaterialCommunityIcons name="sword-cross" size={20} color="#3f9142" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['rgba(15, 23, 42, 0.95)', 'rgba(15, 23, 42, 0.98)']}
            style={styles.gradient}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Desafiar a alguien</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialCommunityIcons name="close" size={24} color="rgba(255, 255, 255, 0.8)" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <MaterialCommunityIcons name="magnify" size={20} color="rgba(255, 255, 255, 0.5)" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar usuario..."
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={styles.userList}>
              <Text style={styles.sectionTitle}>Todas las personas</Text>

              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#3f9142" />
                  <Text style={styles.loadingText}>Cargando usuarios...</Text>
                </View>
              ) : filteredUsers.length > 0 ? (
                <FlatList
                  data={filteredUsers}
                  keyExtractor={(item) => item.id}
                  renderItem={renderUserItem}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View style={styles.emptyState}>
                  <MaterialCommunityIcons name="account-search" size={40} color="rgba(255, 255, 255, 0.3)" />
                  <Text style={styles.emptyStateText}>No se encontraron usuarios</Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </View>
      </View>
      </Modal>

      {/* Modal de espera de confirmación */}
      <WaitingConfirmationModal
        visible={waitingConfirmationVisible}
        onCancel={handleCancelChallenge}
        challengedUserName={selectedUser?.name || ''}
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
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
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
    height: '100%',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(63, 145, 66, 0.3)',
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: '#ffffff',
    fontSize: 16,
  },
  userList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    textShadowColor: 'rgba(63, 145, 66, 0.4)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  userAvatar: {
    marginRight: 15,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(63, 145, 66, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(63, 145, 66, 0.3)',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  userStatus: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  challengeButton: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

export default ChallengeUserModal;
