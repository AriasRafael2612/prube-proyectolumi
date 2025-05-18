import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_URL = 'http://192.168.0.10:3000/user'; 

export default function VerifyAccountScreen() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal para reenviar token
  const [modalVisible, setModalVisible] = useState(false);
  const [resendEmail, setResendEmail] = useState('');

  const handleVerify = async () => {
    if (!token) {
      Alert.alert('Error', 'Por favor ingresa el token de verificación');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { token });
      Alert.alert('Éxito', response.data.message || 'Email verificado correctamente');
      router.replace('/auth/login_screen');
    } catch (error: any) {
      console.error('Error en verificación:', error.response?.data);
      let errorMessage = 'Error al verificar el token';
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Token inválido o expirado';
        } else if (error.response.status === 404) {
          errorMessage = 'Usuario no encontrado';
        }
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendToken = async () => {
    if (!resendEmail) return;

    try {
      setLoading(true);
      await axios.post(`${API_URL}/resend-verification`, { email: resendEmail });
      Alert.alert('Éxito', 'Token reenviado, revisa tu email');
      setModalVisible(false);
      setResendEmail('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo reenviar el token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifica tu cuenta</Text>
      <Text style={styles.subtitle}>
        Ingresa el token de verificación que recibiste en tu email
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Token de verificación"
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button
            title="Verificar cuenta"
            onPress={handleVerify}
            disabled={loading || !token}
          />
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>¿No recibiste el token?</Text>
            <Button
              title="Reenviar token"
              onPress={() => setModalVisible(true)}
              color="#666"
            />
          </View>
        </>
      )}

      {/* Modal para ingresar el email */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Reenviar token</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={resendEmail}
              onChangeText={setResendEmail}
            />
            <View style={styles.modalButtons}>
              <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.sendButton} onPress={handleResendToken}>
                <Text style={styles.sendText}>Enviar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  resendContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendText: {
    marginBottom: 10,
    color: '#666',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelButton: {
    marginRight: 10,
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  sendText: {
    color: '#fff',
    fontSize: 16,
  },

});


















