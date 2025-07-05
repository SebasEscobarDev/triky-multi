import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
// Importamos los datos de las partidas y la interfaz Game
import { Game, gamesData } from '@/utils/json/gamesData';
// Importamos los componentes modularizados
import NewGameModal from '@/components/modals/NewGameModal';
import GameCard from '@/components/ui/GameCard';
import GameFilters from '@/components/ui/GameFilters';
import PlayButton from '@/components/ui/PlayButton';

// La interfaz Game se importa desde utils/json/gamesData

export default function HomeScreen() {
  const theme = useTheme();
  const opacity = useSharedValue(0);
  // Estado para controlar el filtro activo (todos, pvp, ia)
  const [activeFilter, setActiveFilter] = useState<'todos' | 'pvp' | 'ia'>('todos');
  // Estado para controlar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);
  
  // Importamos los datos de partidas desde el archivo JSON
  const [allGames] = useState<Game[]>(gamesData);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, [opacity]);

  // Renderiza cada ítem de la lista de partidas utilizando el componente GameCard
  const renderGameItem = ({ item }: { item: Game }) => (
    <GameCard game={item} />
  );

  // Filtrar las partidas según el filtro activo
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
        <PlayButton onPress={() => setModalVisible(true)} />
      </Appbar.Header>

      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        
        <View style={styles.subHeaderContainer}>
          <Text variant="titleMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Partidas en juego
          </Text>
        </View>
        
        <GameFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        
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
      <NewGameModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Los estilos del modal ahora están en NewGameModal.tsx
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
  // Los estilos de los filtros ahora están en el componente GameFilters
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Aumentado para evitar que el último elemento quede oculto por la barra de tabs
  },
  // Los estilos de las tarjetas de juegos ahora están en el componente GameCard
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

  // Los estilos del botón de jugar ahora están en el componente PlayButton
});
