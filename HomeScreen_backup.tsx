import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, Avatar, Card, Text, useTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAuth } from '@/context/AuthContext';

// Tipo para representar una partida en juego
interface Game {
  id: string;
  player1: {
    name: string;
    photo?: string;
  };
  player2: {
    name: string;
    photo?: string;
  };
  isAI: boolean; // indica si el jugador 2 es la IA
  lastMove: string; // cuando fue el Ãºltimo movimiento
  yourTurn?: boolean; // true si es el turno del usuario actual
}

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const opacity = useSharedValue(0);
  const { user } = useAuth();
  const [searchingGame, setSearchingGame] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const searchTimerRef = useRef<number | null>(null);
  // Estado para controlar el filtro activo (todos, pvp, ia)
  const [activeFilter, setActiveFilter] = useState<'todos' | 'pvp' | 'ia'>('todos');
  // Estado para controlar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);
  
  // Datos ficticios de partidas en juego
  const [allGames] = useState<Game[]>([
    {
      id: '1',
      player1: { name: 'Alex', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
      player2: { name: 'Sofia', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
      isAI: false,
      lastMove: 'hace 10 min',
      yourTurn: true,
    },
    {
      id: '2',
      player1: { name: 'Juan' },
      player2: { name: 'IA' },
      isAI: true,
      lastMove: 'hace 5 min',
      yourTurn: false,
    },
    {
      id: '3',
      player1: { name: 'Marta', photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
      player2: { name: 'IA' },
      isAI: true,
      lastMove: 'hace 30 min',
      yourTurn: true,
    },
    {
      id: '4',
      player1: { name: 'Carlos' },
      player2: { name: 'Ana', photo: 'https://randomuser.me/api/portraits/women/22.jpg' },
      isAI: false,
      lastMove: 'hace 1 hr',
      yourTurn: false,
    },
    {
      id: '5',
      player1: { name: 'Lucia', photo: 'https://randomuser.me/api/portraits/women/56.jpg' },
      player2: { name: 'IA' },
      isAI: true,
      lastMove: 'hace 3 hrs',
      yourTurn: false,
    },
    {
      id: '6',
      player1: { name: 'Roberto', photo: 'https://randomuser.me/api/portraits/men/91.jpg' },
      player2: { name: 'Maria', photo: 'https://randomuser.me/api/portraits/women/33.jpg' },
      isAI: false,
      lastMove: 'hace 15 min',
      yourTurn: true,
    },
    {
      id: '7',
      player1: { name: 'Daniela', photo: 'https://randomuser.me/api/portraits/women/27.jpg' },
      player2: { name: 'IA' },
      isAI: true,
      lastMove: 'hace 45 min',
      yourTurn: false,
    },
    {
      id: '8',
      player1: { name: 'Miguel' },
      player2: { name: 'Laura', photo: 'https://randomuser.me/api/portraits/women/62.jpg' },
      isAI: false,
      lastMove: 'hace 2 hrs',
      yourTurn: true,
    },
    {
      id: '9',
      player1: { name: 'Pedro', photo: 'https://randomuser.me/api/portraits/men/54.jpg' },
      player2: { name: 'IA' },
      isAI: true,
      lastMove: 'hace 20 min',
      yourTurn: false,
    },
    {
      id: '10',
      player1: { name: 'Carmen', photo: 'https://randomuser.me/api/portraits/women/18.jpg' },
      player2: { name: 'Gabriel', photo: 'https://randomuser.me/api/portraits/men/78.jpg' },
      isAI: false,
      lastMove: 'hace 8 min',
      yourTurn: true,
    },
  ]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, [opacity]);

  // Renderiza cada Ã­tem de la lista de partidas
  const renderGameItem = ({ item }: { item: Game }) => (
    <Card style={[styles.gameCard, item.yourTurn && styles.activeGameCard]}>
      <View style={styles.cardContent}>
          <View style={styles.gameRow}>
            {/* Contenedor principal */}
            <View style={styles.profilesContainer}>
              {/* Jugador 1 */}
              <View style={styles.playerContainer}>
                {item.player1.photo ? (
                  <Avatar.Image 
                    size={46} 
                    source={{ uri: item.player1.photo }}
                    style={styles.avatar}
                  />
                ) : (
                  <Avatar.Icon 
                    size={46} 
                    icon="account"
                    style={styles.avatar}
                    color="white"
                  />
                )}
                <Text style={styles.playerName}>{item.player1.name}</Text>
              </View>
              
              {/* VS */}
              <View style={styles.vsContainer}>
                <Text style={styles.vsText}>VS</Text>
              </View>
              
              {/* Jugador 2 */}
              <View style={styles.playerContainer}>
                {item.isAI ? (
                  <Avatar.Icon 
                    size={46} 
                    icon="robot" 
                    style={styles.avatar}
                    color="white"
                  />
                ) : item.player2.photo ? (
                  <Avatar.Image 
                    size={46} 
                    source={{ uri: item.player2.photo }}
                    style={styles.avatar}
                  />
                ) : (
                  <Avatar.Icon 
                    size={46} 
                    icon="account"
                    style={styles.avatar}
                    color="white"
                  />
                )}
                <Text style={styles.playerName}>{item.player2.name}</Text>
              </View>
            </View>
            
            {/* Solo mostrar tiempo */}
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{item.lastMove}</Text>
            </View>
          </View>
      </View>
    </Card>
  );

  // Filtrar las partidas segÃºn el filtro activo
  const getFilteredGames = () => {
    switch(activeFilter) {
      case 'pvp':
        return allGames.filter(game => !game.isAI);
      case 'ia':
        return allGames.filter(game => game.isAI);
      case 'todos':
      default:
        return allGames;
    }
  };

  // Obtener las partidas filtradas
  const gamesInProgress = getFilteredGames();

  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header 
        style={[styles.header, { borderBottomColor: '#3f9142', backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', shadowColor: '#3f9142', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 5 }]}
      >
        <Appbar.Content 
          title={activeFilter === 'todos' ? "Todas las partidas" : activeFilter === 'pvp' ? "Partidas PVP" : "Partidas con IA"} 
          color="#ffffff"
          titleStyle={styles.headerTitle} 
        />
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
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
      </Appbar.Header>

      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        
        <View style={styles.subHeaderContainer}>
          <Text variant="titleMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Partidas en juego
          </Text>
        </View>
        
        <View style={styles.tabContainer}>
          <View style={[styles.tabsRow, { borderBottomColor: 'rgba(63, 145, 66, 0.3)' }]}>
            <TouchableOpacity 
              style={styles.tabButtonContainer}
              onPress={() => setActiveFilter('todos')}
            >
              <View style={activeFilter === 'todos' ? styles.activeTabBorder : styles.inactiveTabBorder}>
                {activeFilter === 'todos' ? (
                  <LinearGradient
                    colors={['rgba(63, 145, 66, 0.9)', 'rgba(20, 80, 30, 0.7)']}
                    style={styles.activeTabButton}
                  >
                    <Text style={styles.activeTabText}>Todos</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.inactiveTabButton}>
                    <Text style={styles.inactiveTabText}>Todos</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.tabButtonContainer}
              onPress={() => setActiveFilter('pvp')}
            >
              <View style={activeFilter === 'pvp' ? styles.activeTabBorder : styles.inactiveTabBorder}>
                {activeFilter === 'pvp' ? (
                  <LinearGradient
                    colors={['rgba(63, 145, 66, 0.9)', 'rgba(20, 80, 30, 0.7)']}
                    style={styles.activeTabButton}
                  >
                    <Text style={styles.activeTabText}>PVP</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.inactiveTabButton}>
                    <Text style={styles.inactiveTabText}>PVP</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.tabButtonContainer}
              onPress={() => setActiveFilter('ia')}
            >
              <View style={activeFilter === 'ia' ? styles.activeTabBorder : styles.inactiveTabBorder}>
                {activeFilter === 'ia' ? (
                  <LinearGradient
                    colors={['rgba(63, 145, 66, 0.9)', 'rgba(20, 80, 30, 0.7)']}
                    style={styles.activeTabButton}
                  >
                    <Text style={styles.activeTabText}>IA</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.inactiveTabButton}>
                    <Text style={styles.inactiveTabText}>IA</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList
          data={gamesInProgress}
          keyExtractor={(item) => item.id}
          renderItem={renderGameItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      {/* Modal para seleccionar tipo de partida */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
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
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialCommunityIcons name="close" size={24} color="rgba(255, 255, 255, 0.8)" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalBody}>
                {/* BotÃ³n Entrenamiento con IA */}
                <TouchableOpacity 
                  style={styles.modalOptionButton}
                  onPress={() => {
                    navigation.navigate('TrikyScreen' as never);
                    setModalVisible(false);
                  }}
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
                
                {/* BotÃ³n Buscar un oponente random */}
                <TouchableOpacity 
                  style={styles.modalOptionButton}
                  onPress={() => {
                    setSearchingGame(true);
                    setSearchTime(0);
                    setModalVisible(false);
                    
                    // Iniciar el contador
                    if (searchTimerRef.current) {
                      clearInterval(searchTimerRef.current);
                    }
                    
                    searchTimerRef.current = setInterval(() => {
                      setSearchTime(prevTime => prevTime + 1);
                    }, 1000);
                  }}
                >
                  <View style={styles.modalButtonBorder}>
                    <LinearGradient
                      colors={['rgba(63, 145, 66, 0.9)', 'rgba(20, 80, 30, 0.7)']}
                      style={styles.modalButtonGradient}
                    >
                      <MaterialCommunityIcons name="account-search" size={20} color="white" style={styles.modalButtonIcon} />
                      <Text style={styles.modalButtonText}>Buscar partida</Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
                
                {/* BotÃ³n Desafiar a alguien */}
                <TouchableOpacity 
                  style={styles.modalOptionButton}
                  onPress={() => {
                    console.log('Desafiar a alguien');
                    setModalVisible(false);
                  }}
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
      {/* Contador flotante de bÃºsqueda */}
      {searchingGame && (
        <View style={styles.searchingOverlay}>
          <TouchableOpacity 
            style={styles.searchingContainer}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['rgba(63, 145, 66, 0.95)', 'rgba(20, 80, 30, 0.85)']}
              style={styles.searchingGradient}
            >
              <MaterialCommunityIcons name="account-search" size={20} color="white" style={styles.modalButtonIcon} />
              <Text style={styles.searchingText}>
                Buscando partida: {Math.floor(searchTime / 60).toString().padStart(2, '0')}:{(searchTime % 60).toString().padStart(2, '0')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSearchingGame(false);
                  if (searchTimerRef.current) {
                    clearInterval(searchTimerRef.current);
                    searchTimerRef.current = null;
                  }
                }}
                style={styles.cancelSearchButton}
              >
                <MaterialCommunityIcons name="close-circle" size={22} color="white" />
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
}

  // Limpiar el timer cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearInterval(searchTimerRef.current);
        searchTimerRef.current = null;
      }
    };
  }, []);
  
  container: {
    flex: 1,
  },
  // Estilos para el modal
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
  header: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderBottomWidth: 1,
    elevation: 5,
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    backdropFilter: 'blur(10px)',
  },
  headerTitle: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(63, 145, 66, 0.6)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  content: {
    flex: 1,
    padding: 0,
    paddingBottom: 10,
  },
  headerContainer: {
    padding: 20,
    paddingBottom: 5,
    width: '100%',
  },
  subHeaderContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 5,
  },
  tabContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  tabButtonContainer: {
    marginRight: 20,
    paddingVertical: 5,
  },
  activeTabBorder: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#3f9142',
    overflow: 'hidden',
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  activeTabButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  inactiveTabBorder: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(63, 145, 66, 0.3)',
    overflow: 'hidden',
  },
  inactiveTabButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
  },
  inactiveTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Aumentado para evitar que el Ãºltimo elemento quede oculto por la barra de tabs
  },
  gameCard: {
    marginBottom: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(15, 20, 30, 0.95)',
    elevation: 0,
    borderWidth: 1,
    borderColor: 'rgba(30, 41, 59, 0.8)',
  },
  activeGameCard: {
    borderColor: 'rgba(63, 145, 66, 0.6)',
    borderLeftWidth: 3,
    borderLeftColor: '#3f9142',
  },
  cardContent: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  gameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  profilesContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  playerContainer: {
    alignItems: 'center',
    width: 70,
  },
  vsContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  timeContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 70,
  },
  avatar: {
    backgroundColor: 'rgba(30, 40, 50, 0.8)',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(63, 145, 66, 0.3)',
  },
  playerName: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3f9142',
  },
  timeText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  yourTurnText: {
    fontSize: 12,
    color: '#3f9142',
    fontWeight: '500',
  },
  statusText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  separator: {
    height: 0,
  },

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
    textShadowRadius: 8,
  },
  searchingOverlay: {
    position: 'absolute',
    bottom: 80, // PosiciÃ³n por encima de la barra de tabs
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 10,
  },
  searchingContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    width: '80%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  searchingGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  searchingText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  cancelSearchButton: {
    padding: 5,
  },
});
