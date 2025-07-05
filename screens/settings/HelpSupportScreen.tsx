import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Card, Text, List, useTheme, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HelpSupportScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={[styles.header]}>
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Ayuda y soporte"
          color="#ffffff"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Sección de preguntas frecuentes */}
        <Card style={styles.card}>
          <Card.Title
            title="Preguntas Frecuentes"
            titleStyle={styles.cardTitle}
            left={(props) => <MaterialCommunityIcons name="help-circle" size={30} color="#3f9142" />}
          />
          <Card.Content>
            <List.Accordion
              title="¿Cómo se juega al Triky?"
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
            >
              <Text style={styles.accordionContent}>
                El juego consiste en marcar tres casillas en línea (horizontal, vertical o diagonal) 
                antes que tu oponente. Cada jugador tiene su propio símbolo (X o O). 
                Los jugadores toman turnos para marcar casillas vacías.
              </Text>
            </List.Accordion>

            <Divider style={styles.divider} />

            <List.Accordion
              title="¿Cómo funciona el modo multijugador?"
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
            >
              <Text style={styles.accordionContent}>
                En el modo multijugador puedes jugar contra amigos en tiempo real.
                Para iniciar una partida multijugador, ve a la pantalla de inicio,
                selecciona &quot;Juego Multijugador&quot; y comparte el código generado con tu amigo.
                También puedes unirte a una partida existente ingresando el código proporcionado
                por otro jugador.
              </Text>
            </List.Accordion>

            <Divider style={styles.divider} />

            <List.Accordion
              title="¿Cómo funciona el sistema de ranking?"
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
            >
              <Text style={styles.accordionContent}>
                El sistema de ranking asigna puntos por victorias en partidas multijugador.
                Las victorias contra jugadores de mayor nivel otorgan más puntos.
                El ranking global muestra a los mejores jugadores ordenados por puntuación.
                Compite para llegar a lo más alto de la clasificación.
              </Text>
            </List.Accordion>

            <Divider style={styles.divider} />

            <List.Accordion
              title="¿Puedo jugar sin conexión a Internet?"
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
            >
              <Text style={styles.accordionContent}>
                Sí, puedes jugar contra la IA sin necesidad de conexión a Internet.
                Sin embargo, el modo multijugador y las actualizaciones del ranking
                requieren conexión a Internet.
              </Text>
            </List.Accordion>
            
            <Divider style={styles.divider} />
            
            <List.Accordion
              title="¿Cómo reporto un error en la aplicación?"
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
            >
              <Text style={styles.accordionContent}>
                Si encuentras algún error o bug en la aplicación, puedes reportarlo
                a través de la sección &quot;Contactar soporte&quot; en el menú de ajustes.
                Por favor, proporciona una descripción detallada del problema y los
                pasos para reproducirlo para que podamos solucionarlo lo antes posible.
              </Text>
            </List.Accordion>
            
            <Divider style={styles.divider} />
            
            <List.Accordion
              title="¿Hay una versión premium de la aplicación?"
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
            >
              <Text style={styles.accordionContent}>
                Actualmente todas las funciones de la aplicación son gratuitas.
                En el futuro podrían agregarse funciones premium opcionales,
                pero el juego básico siempre será gratuito para todos los usuarios.
              </Text>
            </List.Accordion>
          </Card.Content>
        </Card>
        
        {/* Espacio adicional para evitar sobreposición con el menú de tabs */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    backgroundColor: '#3f9142',
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#3f9142',
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  accordion: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
  },
  accordionTitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  accordionContent: {
    padding: 16,
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 22,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
  },
  divider: {
    backgroundColor: 'rgba(203, 213, 225, 0.1)',
    height: 0.5,
    marginVertical: 8,
  },
  listItemTitle: {
    color: '#ffffff',
    fontSize: 16,
  },
  listItemDescription: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  bottomSpacer: {
    height: 80, // Espacio suficiente para evitar sobreposición con la barra de tabs
    marginBottom: 20,
  },
});
