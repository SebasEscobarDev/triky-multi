import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FilterType = 'todos' | 'pvp' | 'ia';

interface GameFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const GameFilters: React.FC<GameFiltersProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <View style={styles.tabContainer}>
      <View style={[styles.tabsRow, { borderBottomColor: 'rgba(63, 145, 66, 0.3)' }]}>
        {/* Filtro Todos */}
        <TouchableOpacity 
          style={styles.tabButtonContainer}
          onPress={() => onFilterChange('todos')}
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
        
        {/* Filtro PvP */}
        <TouchableOpacity 
          style={styles.tabButtonContainer}
          onPress={() => onFilterChange('pvp')}
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
        
        {/* Filtro IA */}
        <TouchableOpacity 
          style={styles.tabButtonContainer}
          onPress={() => onFilterChange('ia')}
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
  );
};

const styles = StyleSheet.create({
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
});

export default GameFilters;
