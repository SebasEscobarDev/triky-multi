import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Card, Text, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Políticas de Privacidad"
          color="#ffffff"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <Card.Title
            title="Política de Privacidad"
            titleStyle={styles.cardTitle}
            left={(props) => <MaterialCommunityIcons name="shield-lock-outline" size={30} color="#3f9142" />}
          />
          <Card.Content>
            <Text style={styles.date}>Última actualización: 1 de julio de 2025</Text>
            
            <Text style={styles.sectionTitle}>1. Introducción</Text>
            <Text style={styles.paragraph}>
              Triky Multi respeta la privacidad de sus usuarios y se compromete a proteger su información personal.
              Esta Política de Privacidad explica cómo recopilamos, usamos y compartimos información cuando
              utiliza nuestra aplicación móvil Triky Multi.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>2. Información que recopilamos</Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>Información proporcionada por usted:</Text> Cuando crea una cuenta, podemos recopilar
              su nombre de usuario, dirección de correo electrónico y contraseña.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>Información de uso:</Text> Recopilamos datos sobre cómo interactúa con nuestra aplicación,
              incluyendo registros de juego, puntuaciones y estadísticas.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>Información del dispositivo:</Text> Podemos recopilar información sobre su dispositivo móvil,
              incluyendo modelo, sistema operativo y configuración regional.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>3. Cómo utilizamos su información</Text>
            <Text style={styles.paragraph}>
              Utilizamos la información recopilada para:
            </Text>
            <Text style={styles.listItem}>• Proporcionar, mantener y mejorar nuestra aplicación</Text>
            <Text style={styles.listItem}>• Personalizar su experiencia de juego</Text>
            <Text style={styles.listItem}>• Facilitar el modo multijugador y las clasificaciones</Text>
            <Text style={styles.listItem}>• Enviar notificaciones relacionadas con la aplicación</Text>
            <Text style={styles.listItem}>• Prevenir actividades fraudulentas o inapropiadas</Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>4. Compartición de información</Text>
            <Text style={styles.paragraph}>
              No vendemos ni compartimos su información personal con terceros, excepto en las siguientes circunstancias:
            </Text>
            <Text style={styles.listItem}>• Con otros jugadores en el modo multijugador (solo nombre de usuario y estadísticas)</Text>
            <Text style={styles.listItem}>• Con proveedores de servicios que nos ayudan a operar la aplicación</Text>
            <Text style={styles.listItem}>• Cuando sea requerido por ley o para proteger nuestros derechos</Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>5. Seguridad de datos</Text>
            <Text style={styles.paragraph}>
              Implementamos medidas de seguridad razonables para proteger la información personal recopilada.
              Sin embargo, ningún método de transmisión o almacenamiento electrónico es 100% seguro,
              por lo que no podemos garantizar su seguridad absoluta.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>6. Derechos de los usuarios</Text>
            <Text style={styles.paragraph}>
              Dependiendo de su ubicación, puede tener ciertos derechos relacionados con sus datos personales, como:
            </Text>
            <Text style={styles.listItem}>• Acceder a la información personal que tenemos sobre usted</Text>
            <Text style={styles.listItem}>• Corregir información inexacta</Text>
            <Text style={styles.listItem}>• Eliminar su información personal</Text>
            <Text style={styles.listItem}>• Oponerse o limitar el procesamiento de su información</Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>7. Menores de edad</Text>
            <Text style={styles.paragraph}>
              Triky Multi está destinado a usuarios de todas las edades, pero no recopilamos intencionalmente
              información personal de niños menores de 13 años sin el consentimiento verificable de los padres.
              Si cree que hemos recopilado información de un niño menor de 13 años sin el consentimiento adecuado,
              contáctenos para que podamos tomar las medidas apropiadas.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>8. Cambios a esta política</Text>
            <Text style={styles.paragraph}>
              Podemos actualizar esta política de privacidad periódicamente. Le notificaremos de cualquier
              cambio material publicando la nueva política de privacidad en esta página y,
              cuando sea apropiado, notificándole dentro de la aplicación.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>9. Contacto</Text>
            <Text style={styles.paragraph}>
              Si tiene preguntas o inquietudes acerca de esta Política de Privacidad,
              puede contactarnos a través de la sección &quot;Contactar soporte&quot; en la aplicación
              o por correo electrónico a privacidad@trikyapp.com
            </Text>
          </Card.Content>
        </Card>
        
        {/* Copyright */}
        <Text style={styles.copyright}>© 2025 Triky App. Todos los derechos reservados.</Text>
        
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
  date: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    marginLeft: 16,
    marginBottom: 5,
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 1,
    marginVertical: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  copyright: {
    textAlign: 'center',
    fontSize: 12,
    color: '#64748b',
    marginTop: 20,
    marginBottom: 10,
  },
  bottomSpacer: {
    height: 80, // Espacio suficiente para evitar sobreposición con la barra de tabs
    marginBottom: 20,
  },
});
