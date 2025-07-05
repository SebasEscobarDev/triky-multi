import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Card, Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ContactSupportScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = () => {
    if (subject.trim() === '' || message.trim() === '') {
      return;
    }

    setLoading(true);
    // Aquí iría la lógica para enviar el mensaje al soporte
    // Por ahora simulamos una llamada a API
    setTimeout(() => {
      console.log('Mensaje enviado:', { subject, message });
      setLoading(false);
      setSnackbarVisible(true);
      // Limpiamos los campos después de enviar
      setSubject('');
      setMessage('');
    }, 1500);
  };

  const onDismissSnackbar = () => setSnackbarVisible(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={[styles.header]}>
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Contactar soporte"
          color="#ffffff"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Mensaje de confirmación */}
        {snackbarVisible && (
          <View style={styles.customSnackbarContainer}>
            <View style={styles.customSnackbar}>
              <Text style={styles.snackbarText}>Mensaje enviado correctamente</Text>
              <Button onPress={onDismissSnackbar} textColor="#ffffff" compact>OK</Button>
            </View>
          </View>
        )}
        
        <Card style={styles.card}>
          <Card.Title
            title="Enviar un mensaje a soporte"
            titleStyle={styles.cardTitle}
            left={(props) => <MaterialCommunityIcons name="email-outline" size={30} color="#3f9142" />}
          />
          <Card.Content>
            <Text style={styles.description}>
              Por favor, describa su problema o pregunta y nuestro equipo de soporte
              le responderá lo antes posible.
            </Text>

            <TextInput
              label="Asunto"
              value={subject}
              onChangeText={setSubject}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#3f9142' } }}
              outlineColor="rgba(63, 145, 66, 0.5)"
              outlineStyle={{ borderWidth: 1 }}
            />

            <TextInput
              label="Mensaje"
              value={message}
              onChangeText={setMessage}
              mode="outlined"
              multiline
              numberOfLines={8}
              style={styles.messageInput}
              theme={{ colors: { primary: '#3f9142' } }}
              outlineColor="rgba(63, 145, 66, 0.5)"
              outlineStyle={{ borderWidth: 1 }}
            />

            <Button
              mode="contained"
              onPress={handleSendMessage}
              style={styles.sendButton}
              labelStyle={styles.sendButtonLabel}
              loading={loading}
              disabled={loading || subject.trim() === '' || message.trim() === ''}
            >
              Enviar mensaje
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title="Información de contacto"
            titleStyle={styles.cardTitle}
            left={(props) => <MaterialCommunityIcons name="card-account-phone" size={30} color="#3f9142" />}
          />
          <Card.Content>
            <View style={styles.contactItem}>
              <MaterialCommunityIcons name="email" size={22} color="#3f9142" style={styles.contactIcon} />
              <Text style={styles.contactText}>soporte@trikyapp.com</Text>
            </View>
            
            <View style={styles.contactItem}>
              <MaterialCommunityIcons name="web" size={22} color="#3f9142" style={styles.contactIcon} />
              <Text style={styles.contactText}>www.trikyapp.com/soporte</Text>
            </View>
            
            <View style={styles.contactItem}>
              <MaterialCommunityIcons name="clock-outline" size={22} color="#3f9142" style={styles.contactIcon} />
              <Text style={styles.contactText}>Tiempo de respuesta habitual: 24-48 horas</Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Ya no usamos el Snackbar estándar, lo reemplazamos con nuestra versión personalizada arriba */}
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
  description: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
  },
  messageInput: {
    marginBottom: 24,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    height: 150,
  },
  sendButton: {
    backgroundColor: '#3f9142',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    paddingVertical: 6,
  },
  sendButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactIcon: {
    marginRight: 16,
  },
  contactText: {
    color: '#cbd5e1',
    fontSize: 15,
  },
  customSnackbarContainer: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  customSnackbar: {
    backgroundColor: '#3f9142',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  snackbarText: {
    color: '#ffffff',
    fontSize: 15,
    flex: 1,
    paddingLeft: 6,
  },
});
