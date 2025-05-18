// app/auth/verify_email.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'expo-router';

const API_URL = 'http://192.168.0.10:3000/user';

export default function VerifyEmail() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResendVerification = async () => {
    try {
      await axios.post(`${API_URL}/resend-verification`, { email });
      Alert.alert('Éxito', 'Correo de verificación enviado');
      router.replace('/auth/verify_account_screen'); 
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error(error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo enviar el correo de verificación');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificar Correo</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Enviar verificación" onPress={handleResendVerification} />
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
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
