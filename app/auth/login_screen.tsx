import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading: authLoading } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsLoggingIn(true);
    try {
      await login(identifier, password, isEmail);
      console.log('Inicio de sesión exitoso');
      router.replace('/(tabs)/home_screen');
    } catch (error: any) {
      let errorMessage = 'Error al iniciar sesión';
      
      if (error.response) {
        switch(error.response.status) {
          case 401:
            errorMessage = 'Credenciales incorrectas';
            break;
          case 403:
            errorMessage = 'Por favor verifica tu email antes de iniciar sesión';
            break;
          case 404:
            errorMessage = 'Usuario no encontrado';
            break;
          default:
            errorMessage = error.response.data?.message || errorMessage;
        }
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const toggleIdentifierType = () => {
    setIdentifier('');
    setIsEmail(!isEmail);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, !isEmail && styles.activeToggle]}
          onPress={() => setIsEmail(false)}
        >
          <Text style={[styles.toggleText, !isEmail && styles.activeToggleText]}>
            Nickname
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.toggleButton, isEmail && styles.activeToggle]}
          onPress={() => setIsEmail(true)}
        >
          <Text style={[styles.toggleText, isEmail && styles.activeToggleText]}>
            Email
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder={isEmail ? 'Correo electrónico' : 'Nombre de usuario'}
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
        keyboardType={isEmail ? 'email-address' : 'default'}
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoComplete="password"
      />

      {/* Nuevo: Enlace para recuperar contraseña */}
      <TouchableOpacity 
        style={styles.forgotPasswordLink}
        onPress={() => router.push('/auth/forgot_password_screen')}
      >
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {(authLoading || isLoggingIn) ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <Button
              title="Iniciar Sesión"
              onPress={handleLogin}
              color="#007AFF"
            />
          </View>
          
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
            <Button
              title="Regístrate"
              onPress={() => router.push('/auth/register_screen')}
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  toggleButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  activeToggle: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  toggleText: {
    color: '#333',
    fontWeight: '500',
  },
  activeToggleText: {
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8, 
    fontSize: 16,
    backgroundColor: '#fff',
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 10,
  },
  registerContainer: {
    marginTop: 25,
    alignItems: 'center',
    gap: 5,
  },
  registerText: {
    marginBottom: 5,
    color: '#666',
  },
  loader: {
    marginVertical: 20,
  },
});