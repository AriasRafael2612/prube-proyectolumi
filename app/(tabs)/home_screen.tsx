import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/useAuth';

const HomeScreen = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No hay datos de usuario.</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, color:'red'}}>
        Bienvenido, {user.name} {user.userLastName} 👋
      </Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>
        Usuario: {user.userNickName}
      </Text>
      <Text style={{ fontSize: 16 }}>
        Correo: {user.email}
      </Text>
    </View>
  );
};

export default HomeScreen;
