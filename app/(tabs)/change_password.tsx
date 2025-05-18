import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthService } from '../auth/auth.service';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const ChangePasswordScreen = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      await AuthService.changePassword(currentPassword, newPassword);
      Alert.alert('Éxito', 'Contraseña actualizada');
      router.back(); // vuelve a la pantalla anterior
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'No se pudo cambiar la contraseña');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Contraseña actual:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          secureTextEntry={!showCurrentPassword}
          style={styles.passwordInput}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => setShowCurrentPassword(!showCurrentPassword)}
        >
          <MaterialIcons 
            name={showCurrentPassword ? 'visibility-off' : 'visibility'} 
            size={24} 
            color="#666" 
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Nueva contraseña:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          secureTextEntry={!showNewPassword}
          style={styles.passwordInput}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => setShowNewPassword(!showNewPassword)}
        >
          <MaterialIcons 
            name={showNewPassword ? 'visibility-off' : 'visibility'} 
            size={24} 
            color="#666" 
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirmar nueva contraseña:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          secureTextEntry={!showConfirmPassword}
          style={styles.passwordInput}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <MaterialIcons 
            name={showConfirmPassword ? 'visibility-off' : 'visibility'} 
            size={24} 
            color="#666" 
          />
        </TouchableOpacity>
      </View>

      <Button title="Cambiar contraseña" onPress={handleChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 5 },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  iconButton: {
    padding: 10,
  },
});

export default ChangePasswordScreen;