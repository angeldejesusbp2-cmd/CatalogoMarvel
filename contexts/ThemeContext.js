import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Función para obtener el tema del sistema de forma compatible con web
const getSystemColorScheme = () => {
  if (Platform.OS === 'web') {
    // En web, usar matchMedia para detectar el tema del sistema
    return window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
  } else {
    // En mobile, usar Appearance de React Native
    const { Appearance } = require('react-native');
    return Appearance.getColorScheme() || 'light';
  }
};

// Función para escuchar cambios del tema del sistema
const addSystemThemeListener = (callback) => {
  if (Platform.OS === 'web') {
    const mediaQuery = window?.matchMedia?.('(prefers-color-scheme: dark)');
    if (mediaQuery) {
      const listener = (e) => callback({ colorScheme: e.matches ? 'dark' : 'light' });
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
    return null;
  } else {
    const { Appearance } = require('react-native');
    const subscription = Appearance.addChangeListener(callback);
    return () => subscription?.remove();
  }
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('sistema'); // 'oscuro', 'claro', 'sistema'
  const [currentTheme, setCurrentTheme] = useState('light');

  // Cargar tema guardado al inicializar
  useEffect(() => {
    loadTheme();
  }, []);

  // Escuchar cambios del sistema cuando tema es 'sistema'
  useEffect(() => {
    if (theme === 'sistema') {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setCurrentTheme(colorScheme || 'light');
      });
      
      // Establecer tema inicial del sistema
      setCurrentTheme(Appearance.getColorScheme() || 'light');
      
      return () => subscription?.remove();
    } else {
      setCurrentTheme(theme === 'oscuro' ? 'dark' : 'light');
    }
  }, [theme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app_theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Error cargando tema:', error);
    }
  };

  const saveTheme = async (newTheme) => {
    try {
      await AsyncStorage.setItem('app_theme', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error guardando tema:', error);
    }
  };

  const value = {
    theme,
    currentTheme,
    setTheme: saveTheme,
    isDark: currentTheme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};