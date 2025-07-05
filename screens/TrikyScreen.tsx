import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { Appbar, Avatar, Text, useTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAuth } from '@/context/AuthContext';

type CellValue = 'X' | 'O' | null;
type GameState = 'playing' | 'win' | 'lose' | 'draw';

export default function TrikyScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const opacity = useSharedValue(0);
  const { user } = useAuth();
  
  // Estado del tablero (3x3)
  const [board, setBoard] = useState<CellValue[][]>(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [currentTurn, setCurrentTurn] = useState<'X' | 'O'>('X'); // X es el usuario, O es la IA
  const [gameState, setGameState] = useState<GameState>('playing');
  const [stats, setStats] = useState({
    ganados: 0,
    empates: 0,
    perdidos: 0
  });
  
  // Manejar fin del juego
  const handleGameOver = useCallback((winner: CellValue) => {
    if (winner === 'X') {
      setGameState('win');
      setStats(prev => ({
        ...prev,
        ganados: prev.ganados + 1
      }));
    } else if (winner === 'O') {
      setGameState('lose');
      setStats(prev => ({
        ...prev,
        perdidos: prev.perdidos + 1
      }));
    }
  }, []);

  // Verificar estado del juego
  const checkGameStatus = useCallback(() => {
    // Verificar filas
    for (let row = 0; row < 3; row++) {
      if (board[row][0] && board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
        handleGameOver(board[row][0]);
        return;
      }
    }
    
    // Verificar columnas
    for (let col = 0; col < 3; col++) {
      if (board[0][col] && board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
        handleGameOver(board[0][col]);
        return;
      }
    }
    
    // Verificar diagonales
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      handleGameOver(board[0][0]);
      return;
    }
    
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      handleGameOver(board[0][2]);
      return;
    }
    
    // Verificar empate
    const isBoardFull = board.every(row => row.every(cell => cell !== null));
    if (isBoardFull && gameState === 'playing') {
      setGameState('draw');
      setStats(prev => ({
        ...prev,
        empates: prev.empates + 1
      }));
    }
  }, [board, gameState, handleGameOver]);

  // Movimiento de la IA
  const makeAIMove = useCallback(() => {
    if (gameState !== 'playing') return;
    
    // Versión simple de la IA: selecciona una celda vacía al azar
    const emptyCells: [number, number][] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          emptyCells.push([row, col]);
        }
      }
    }
    
    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      
      // Actualizar el tablero con el movimiento de la IA
      const newBoard = [...board];
      newBoard[row][col] = 'O';
      setBoard(newBoard);
      setCurrentTurn('X'); // Cambiar el turno al usuario
    }
  }, [board, gameState]);

  // Manejar el clic del usuario en una celda
  const handleCellPress = (row: number, col: number) => {
    // Ignorar si la celda ya está ocupada, no es el turno del usuario o el juego ha terminado
    if (board[row][col] || currentTurn !== 'X' || gameState !== 'playing') return;
    
    // Actualizar el tablero con el movimiento del usuario
    const newBoard = [...board];
    newBoard[row][col] = 'X';
    setBoard(newBoard);
    setCurrentTurn('O'); // Cambiar el turno a la IA
  };

  // Reiniciar el juego
  const resetGame = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null)));
    setCurrentTurn('X');
    setGameState('playing');
  };

  // Animación de entrada
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, [opacity]);

  // Verificar si hay un ganador o empate
  useEffect(() => {
    checkGameStatus();
  }, [board, checkGameStatus]);

  // IA hace su movimiento cuando es su turno
  useEffect(() => {
    if (currentTurn === 'O' && gameState === 'playing') {
      const timerId = setTimeout(() => {
        makeAIMove();
      }, 700); // Pequeña demora para simular "pensamiento" de la IA
      return () => clearTimeout(timerId);
    }
  }, [currentTurn, gameState, makeAIMove]);

  // Renderizar una celda del tablero
  const renderCell = (row: number, col: number) => {
    const cellValue = board[row][col];
    
    return (
      <TouchableOpacity 
        style={styles.cell} 
        onPress={() => handleCellPress(row, col)}
        activeOpacity={currentTurn === 'X' && !cellValue && gameState === 'playing' ? 0.7 : 1}
      >
        {cellValue === 'X' && (
          <MaterialCommunityIcons name="close" size={40} color="#3f9142" style={styles.cellIcon} />
        )}
        {cellValue === 'O' && (
          <MaterialCommunityIcons name="circle-outline" size={36} color="#ff6b6b" style={styles.cellIcon} />
        )}
      </TouchableOpacity>
    );
  };

  // Obtener mensaje de estado del juego
  const getGameStatusMessage = () => {
    switch (gameState) {
      case 'win':
        return '¡Ganaste!';
      case 'lose':
        return 'Perdiste';
      case 'draw':
        return 'Empate';
      default:
        return currentTurn === 'X' ? 'Tu turno' : 'Turno de la IA';
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header 
        style={[styles.header, { backgroundColor: 'rgba(15, 23, 42, 0.9)', borderBottomColor: '#3f9142' }]}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#ffffff" />
        <Appbar.Content 
          title="Entrenamiento con IA"
          color="#ffffff"
          titleStyle={styles.headerTitle}
        />
        <Appbar.Action icon="refresh" color="#ffffff" onPress={resetGame} />
      </Appbar.Header>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Perfiles y marcador */}
        <View style={styles.profilesContainer}>
          {/* Jugador */}
          <View style={styles.playerContainer}>
            {user?.user?.photo ? (
              <Avatar.Image size={50} source={{ uri: user.user.photo }} />
            ) : (
              <Avatar.Icon size={50} icon="account" color="white" style={{ backgroundColor: '#3f9142' }} />
            )}
            <Text style={styles.playerName}>{user?.user?.name || 'Tú'}</Text>
            <View style={[styles.playerSymbol, { backgroundColor: '#3f9142' }]}>
              <MaterialCommunityIcons name="close" size={16} color="white" />
            </View>
          </View>
          
          {/* VS */}
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          
          {/* IA */}
          <View style={styles.playerContainer}>
            <Avatar.Icon size={50} icon="robot" color="white" style={{ backgroundColor: '#ff6b6b' }} />
            <Text style={styles.playerName}>IA</Text>
            <View style={[styles.playerSymbol, { backgroundColor: '#ff6b6b' }]}>
              <MaterialCommunityIcons name="circle-outline" size={16} color="white" />
            </View>
          </View>
        </View>

        {/* Estado del juego */}
        <View style={styles.gameStatusContainer}>
          <Text style={[
            styles.gameStatusText, 
            gameState === 'win' ? styles.winText : 
            gameState === 'lose' ? styles.loseText : 
            gameState === 'draw' ? styles.drawText : 
            styles.playingText
          ]}>
            {getGameStatusMessage()}
          </Text>
        </View>

        {/* Tablero de juego */}
        <View style={styles.board}>
          <View style={styles.boardRow}>
            {renderCell(0, 0)}
            {renderCell(0, 1)}
            {renderCell(0, 2)}
          </View>
          <View style={styles.boardRow}>
            {renderCell(1, 0)}
            {renderCell(1, 1)}
            {renderCell(1, 2)}
          </View>
          <View style={styles.boardRow}>
            {renderCell(2, 0)}
            {renderCell(2, 1)}
            {renderCell(2, 2)}
          </View>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Estadísticas:</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Ganados</Text>
              <Text style={[styles.statValue, styles.winText]}>{stats.ganados}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Empates</Text>
              <Text style={[styles.statValue, styles.drawText]}>{stats.empates}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Perdidos</Text>
              <Text style={[styles.statValue, styles.loseText]}>{stats.perdidos}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 80, // Espacio adicional para evitar que el contenido quede oculto por la barra de tabs
    justifyContent: 'space-between',
  },
  profilesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
  },
  playerContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  playerName: {
    color: 'white',
    marginTop: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  playerSymbol: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  vsContainer: {
    alignItems: 'center',
  },
  vsText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(63, 145, 66, 0.6)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  gameStatusContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 10,
  },
  gameStatusText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  playingText: {
    color: '#ffffff',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
  },
  winText: {
    color: '#3f9142',
    textShadowColor: 'rgba(63, 145, 66, 0.6)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 6,
  },
  loseText: {
    color: '#ff6b6b',
    textShadowColor: 'rgba(255, 107, 107, 0.6)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 6,
  },
  drawText: {
    color: '#f9a825',
    textShadowColor: 'rgba(249, 168, 37, 0.6)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 6,
  },
  board: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 360,
    aspectRatio: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(63, 145, 66, 0.3)',
    shadowColor: '#3f9142',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  boardRow: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    margin: 5,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(63, 145, 66, 0.2)',
  },
  cellIcon: {
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  statsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(63, 145, 66, 0.3)',
  },
  statsTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
  }
});
