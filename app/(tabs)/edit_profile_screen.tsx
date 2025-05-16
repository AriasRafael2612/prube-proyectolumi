import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type EditField = 'name' | 'lastname' | 'nickname';

type RouteParams = {
  EditProfile: {
    field: EditField;
    currentValue: string;
  };
};

const fieldTitles: Record<EditField, string> = {
  name: 'Nombre',
  lastname: 'Apellido',
  nickname: 'Nombre de usuario',
};

const endpointMap: Record<EditField, string> = {
  name: 'change-name',
  lastname: 'change-lastname',
  nickname: 'change-nickname',
};

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'EditProfile'>>();
  const { field, currentValue } = route.params;

  const [newValue, setNewValue] = useState('');

  const handleSave = async () => {
    if (!newValue.trim()) {
      Alert.alert('Error', 'El nuevo valor no puede estar vacío');
      return;
    }

    try {
        const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        throw new Error('No se encontró el token');
      }

      const response = await fetch(`http://192.168.0.10:3000/user/${endpointMap[field]}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          [field === 'name'
            ? 'userName'
            : field === 'lastname'
            ? 'userLastName'
            : 'nickName']: newValue,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Error al actualizar el dato');
      }

      Alert.alert('Éxito', `${fieldTitles[field]} actualizado correctamente`);
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo actualizar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar {fieldTitles[field]}</Text>

      <Text style={styles.label}>Actual:</Text>
      <Text style={styles.currentValue}>{currentValue}</Text>

      <Text style={styles.label}>Nuevo:</Text>
      <TextInput
        style={styles.input}
        placeholder={`Nuevo ${fieldTitles[field]}`}
        value={newValue}
        onChangeText={setNewValue}
      />

      <View style={styles.buttons}>
        <Button title="Cancelar" color="#888" onPress={() => navigation.goBack()} />
        <Button title="Guardar cambios" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10 },
  currentValue: { fontSize: 18, color: '#333', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EditProfileScreen;
