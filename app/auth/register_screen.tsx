// app/auth/register_screen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../../services/api';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    userName: '',
    userLastName: '',
    userNickName: '',
    userEmail: '',
    userPassword: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    try {
      await registerUser(formData);
      Alert.alert('Éxito', 'Usuario registrado correctamente');
      router.replace('/auth/verify_account_screen'); 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      {[
        { name: 'userName', placeholder: 'Nombre' },
        { name: 'userLastName', placeholder: 'Apellido' },
        { name: 'userNickName', placeholder: 'Nombre de Usuario' },
        { name: 'userEmail', placeholder: 'Correo Electrónico' },
        { name: 'userPassword', placeholder: 'Contraseña', secure: true },
      ].map(({ name, placeholder, secure }) => (
        <TextInput
          key={name}
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secure}
          value={(formData as any)[name]}
          onChangeText={text => handleChange(name, text)}
        />
      ))}

      <Button title="Registrarse" onPress={handleRegister} />
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
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
});




