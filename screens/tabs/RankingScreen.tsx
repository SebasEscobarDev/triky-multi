import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, DataTable, Text, useTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const rankingData = [
  { id: 1, name: 'Jugador 1', score: 1500 },
  { id: 2, name: 'Jugador 2', score: 1450 },
  { id: 3, name: 'Jugador 3', score: 1300 },
  { id: 4, name: 'Jugador 4', score: 1250 },
  { id: 5, name: 'Jugador 5', score: 1100 },
];

export default function RankingScreen() {
  const theme = useTheme();
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={[styles.header]}>
        <Appbar.Content 
          title="Ranking Global" 
          color="#ffffff"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>
      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>Top 5 Jugadores</Text>
        <DataTable style={{ backgroundColor: theme.colors.surface, borderRadius: 8 }}>
          <DataTable.Header style={{ backgroundColor: theme.colors.surfaceVariant }}>
            <DataTable.Title textStyle={{ color: theme.colors.primary }}>Posición</DataTable.Title>
            <DataTable.Title textStyle={{ color: theme.colors.primary }}>Jugador</DataTable.Title>
            <DataTable.Title numeric textStyle={{ color: theme.colors.primary }}>Puntaje</DataTable.Title>
          </DataTable.Header>

          {rankingData.map((player) => (
            <DataTable.Row key={player.id}>
              <DataTable.Cell textStyle={{ color: theme.colors.onSurface }}>{player.id}</DataTable.Cell>
              <DataTable.Cell textStyle={{ color: theme.colors.onSurface }}>{player.name}</DataTable.Cell>
              <DataTable.Cell numeric textStyle={{ color: theme.colors.primary, fontWeight: 'bold' }}>{player.score}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
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
    borderBottomColor: '#3f9142',
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
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
});