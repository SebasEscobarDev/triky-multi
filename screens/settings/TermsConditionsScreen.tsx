import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Card, Text, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TermsConditionsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Términos y Condiciones"
          color="#ffffff"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <Card.Title
            title="Términos de Uso"
            titleStyle={styles.cardTitle}
            left={(props) => <MaterialCommunityIcons name="file-document-outline" size={30} color="#3f9142" />}
          />
          <Card.Content>
            <Text style={styles.date}>Última actualización: 1 de julio de 2025</Text>
            
            <Text style={styles.sectionTitle}>1. Aceptación de los Términos</Text>
            <Text style={styles.paragraph}>
              Al descargar, instalar o utilizar la aplicación Triky Multi, usted acepta quedar vinculado
              por estos Términos y Condiciones de uso. Si no está de acuerdo con estos términos,
              no debe utilizar la aplicación.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>2. Descripción del Servicio</Text>
            <Text style={styles.paragraph}>
              Triky Multi es un juego de tres en raya con modo multijugador que permite a los usuarios
              jugar partidas con amigos o contra la computadora. La aplicación puede incluir funciones
              sociales como rankings y perfiles de usuario.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>3. Requisitos de Edad</Text>
            <Text style={styles.paragraph}>
              Triky Multi está destinado a usuarios de todas las edades. Sin embargo, los usuarios
              menores de 13 años deben utilizar la aplicación bajo la supervisión de un padre o tutor legal.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>4. Cuentas de Usuario</Text>
            <Text style={styles.paragraph}>
              Para acceder a ciertas funciones de la aplicación, es posible que deba crear una cuenta
              de usuario. Usted es responsable de mantener la confidencialidad de su información de
              cuenta y de todas las actividades que ocurran bajo su cuenta.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>5. Conducta del Usuario</Text>
            <Text style={styles.paragraph}>
              Usted acepta no utilizar la aplicación para:
            </Text>
            <Text style={styles.listItem}>• Violar cualquier ley o regulación aplicable</Text>
            <Text style={styles.listItem}>• Acosar, intimidar o amenazar a otros usuarios</Text>
            <Text style={styles.listItem}>• Publicar contenido ofensivo o inapropiado</Text>
            <Text style={styles.listItem}>• Interferir con el funcionamiento normal de la aplicación</Text>
            <Text style={styles.listItem}>• Intentar acceder a datos de otros usuarios sin autorización</Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>6. Propiedad Intelectual</Text>
            <Text style={styles.paragraph}>
              Todos los derechos de propiedad intelectual relacionados con Triky Multi,
              incluyendo pero no limitado a derechos de autor, marcas comerciales, nombres comerciales,
              código, gráficos e imágenes, son propiedad exclusiva de los desarrolladores de Triky Multi.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>7. Limitación de Responsabilidad</Text>
            <Text style={styles.paragraph}>
              Triky Multi se proporciona &quot;tal cual&quot; y &quot;según disponibilidad&quot; sin garantías de ningún tipo.
              No garantizamos que la aplicación sea ininterrumpida o libre de errores, ni que los defectos
              serán corregidos.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>8. Cambios en los Términos</Text>
            <Text style={styles.paragraph}>
              Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento.
              Las modificaciones entrarán en vigor inmediatamente después de su publicación en la aplicación.
              El uso continuado de la aplicación después de dichos cambios constituye su aceptación de
              los nuevos términos.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>9. Ley Aplicable</Text>
            <Text style={styles.paragraph}>
              Estos términos se regirán e interpretarán de acuerdo con las leyes de Colombia,
              sin tener en cuenta sus disposiciones sobre conflictos de leyes.
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>10. Contacto</Text>
            <Text style={styles.paragraph}>
              Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos a través
              de la sección &quot;Contactar soporte&quot; en la aplicación o envíenos un correo electrónico a
              soporte@trikyapp.com
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
