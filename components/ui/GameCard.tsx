import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { Game } from '@/utils/json/gamesData';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Card style={[styles.gameCard, game.yourTurn && styles.activeGameCard]}>
      <View style={styles.cardContent}>
        <View style={styles.gameRow}>
          {/* Contenedor principal */}
          <View style={styles.profilesContainer}>
            {/* Jugador 1 */}
            <View style={styles.playerContainer}>
              {game.player1.photo ? (
                <Avatar.Image 
                  size={46} 
                  source={{ uri: game.player1.photo }}
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
              <Text style={styles.playerName}>{game.player1.name}</Text>
            </View>
            
            {/* VS */}
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
            </View>
            
            {/* Jugador 2 */}
            <View style={styles.playerContainer}>
              {game.isAI ? (
                <Avatar.Icon 
                  size={46} 
                  icon="robot" 
                  style={styles.avatar}
                  color="white"
                />
              ) : game.player2.photo ? (
                <Avatar.Image 
                  size={46} 
                  source={{ uri: game.player2.photo }}
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
              <Text style={styles.playerName}>{game.player2.name}</Text>
            </View>
          </View>
          
          {/* Solo mostrar tiempo */}
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{game.lastMove}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
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
});

export default GameCard;
