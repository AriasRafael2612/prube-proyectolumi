// app/auth/verify_account_screen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_URL = 'http://192.168.0.10:3000/user'; 

export default function VerifyAccountScreen() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

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
    Alert.prompt(
      'Reenviar token',
      'Ingresa tu email para reenviar el token de verificación',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Enviar',
          onPress: async (email) => {
            if (!email) return;
            
            try {
              setLoading(true);
              await axios.post(`${API_URL}/resend-verification`, { email });
              Alert.alert('Éxito', 'Token reenviado, revisa tu email');
            } catch (error) {
              Alert.alert('Error', 'No se pudo reenviar el token');
            } finally {
              setLoading(false);
            }
          }
        }
      ],
      'plain-text',
      '',
      'email-address'
    );
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
            disabled={loading}
          />
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>¿No recibiste el token?</Text>
            <Button
              title="Reenviar token"
              onPress={handleResendToken}
              color="#666"
            />
          </View>
        </>
      )}
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
});