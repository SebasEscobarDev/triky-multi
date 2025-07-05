import React from 'react';
import { StyleSheet, View, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { Appbar, Card, Text, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const navigation = useNavigation();
  const appVersion = '1.0.0';
  
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Error al abrir el enlace:', err));
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Acerca de"
          color="#ffffff"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Logo y versión */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Triky Multi</Text>
          <Text style={styles.version}>Versión {appVersion}</Text>
        </View>

        {/* Descripción */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.description}>
              Triky Multi es un divertido juego de tres en raya con modo multijugador que te permite
              jugar con amigos o contra la computadora. ¡Compite para estar en lo más alto del ranking!
            </Text>
          </Card.Content>
        </Card>

        {/* Desarrolladores */}
        <Card style={styles.card}>
          <Card.Title
            title="Desarrollado por"
            titleStyle={styles.cardTitle}
            left={(props) => <MaterialCommunityIcons name="code-tags" size={30} color="#3f9142" />}
          />
          <Card.Content>
            <View style={styles.developerContainer}>
              <Avatar.Icon 
                size={50} 
                icon="account" 
                color="white"
                style={{backgroundColor: '#3f9142'}} 
              />
              <View style={styles.developerInfo}>
                <Text style={styles.developerName}>Sebastián Escobar</Text>
                <Text style={styles.developerRole}>Desarrollador Principal</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Redes sociales */}
        <Card style={styles.card}>
          <Card.Title
            title="Síguenos"
            titleStyle={styles.cardTitle}
            left={(props) => <MaterialCommunityIcons name="share-variant" size={30} color="#3f9142" />}
          />
          <Card.Content>
            <TouchableOpacity 
              style={styles.socialLink} 
              onPress={() => handleOpenLink('https://facebook.com/trikyapp')}
            >
              <Ionicons name="logo-facebook" size={24} color="#3f9142" />
              <Text style={styles.socialLinkText}>Facebook</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.socialLink} 
              onPress={() => handleOpenLink('https://instagram.com/trikyapp')}
            >
              <Ionicons name="logo-instagram" size={24} color="#3f9142" />
              <Text style={styles.socialLinkText}>Instagram</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.socialLink} 
              onPress={() => handleOpenLink('https://twitter.com/trikyapp')}
            >
              <Ionicons name="logo-twitter" size={24} color="#3f9142" />
              <Text style={styles.socialLinkText}>Twitter</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>

        {/* Información legal */}
        <Card style={styles.card}>
          <Card.Title
            title="Legal"
            titleStyle={styles.cardTitle}
            left={(props) => <MaterialCommunityIcons name="gavel" size={30} color="#3f9142" />}
          />
          <Card.Content>
            <TouchableOpacity 
              style={styles.legalLink} 
              onPress={() => handleOpenLink('https://trikyapp.com/terminos')}
            >
              <Text style={styles.legalLinkText}>Términos y condiciones</Text>
              <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={styles.legalLink} 
              onPress={() => handleOpenLink('https://trikyapp.com/privacidad')}
            >
              <Text style={styles.legalLinkText}>Política de privacidad</Text>
              <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={styles.legalLink} 
              onPress={() => handleOpenLink('https://trikyapp.com/licencias')}
            >
              <Text style={styles.legalLinkText}>Licencias de terceros</Text>
              <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
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
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 10,
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
  description: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  developerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  developerInfo: {
    marginLeft: 16,
  },
  developerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  developerRole: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  socialLinkText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#ffffff',
  },
  legalLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  legalLinkText: {
    fontSize: 16,
    color: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 4,
  },
  copyright: {
    textAlign: 'center',
    fontSize: 12,
    color: '#64748b',
    marginTop: 10,
    marginBottom: 10,
  },
  bottomSpacer: {
    height: 80, // Espacio suficiente para evitar sobreposición con la barra de tabs
    marginBottom: 20,
  },
});
