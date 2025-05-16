import { useState, useEffect } from 'react';
import { AuthService } from '../auth/auth.service';
import { User } from '../../interfaces/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const fullProfile = await AuthService.getUserProfile();
        console.log('Perfil completo cargado:', fullProfile);
        setUser(fullProfile);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
        const fallbackUser = await AuthService.getCurrentUser();
        setUser(fallbackUser);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: AuthService.login,
    logout: AuthService.logout,
  };
}
