import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert,
  TouchableOpacity
} from 'react-native';
import { registerUser } from '../../services/api';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
      ].map(({ name, placeholder }) => (
        <TextInput
          key={name}
          style={styles.input}
          placeholder={placeholder}
          value={(formData as any)[name]}
          onChangeText={text => handleChange(name, text)}
        />
      ))}

      {/* Campo de contraseña con toggle de visibilidad */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={formData.userPassword}
          onChangeText={text => handleChange('userPassword', text)}
        />
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialIcons 
            name={showPassword ? 'visibility-off' : 'visibility'} 
            size={24} 
            color="#666" 
          />
        </TouchableOpacity>
      </View>

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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  iconButton: {
    padding: 10,
  },
});














