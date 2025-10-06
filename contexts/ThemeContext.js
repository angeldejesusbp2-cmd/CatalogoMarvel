import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

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