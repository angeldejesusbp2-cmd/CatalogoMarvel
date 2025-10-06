import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de LanguageProvider');
  }
  return context;
};

// Textos en diferentes idiomas
const texts = {
  es: {
    // Pantallas
    catalogoMarvel: 'CatalogoMarvel',
    opciones: 'Opciones',
    ajustes: 'Ajustes',
    ayuda: 'Ayuda',
    tema: 'Tema',
    idioma: 'Idioma',
    
    // Opciones de tema
    oscuro: 'Oscuro',
    claro: 'Claro',
    predeterminadoSistema: 'Predeterminado por el Sistema',
    
    // Opciones de idioma
    español: 'Español',
    ingles: 'Inglés',
    
    // Otros
    seleccionar: 'Seleccionar',
    configuracion: 'Configuración'
  },
  en: {
    // Pantallas
    catalogoMarvel: 'MarvelCatalog',
    opciones: 'Options',
    ajustes: 'Settings',
    ayuda: 'Help',
    tema: 'Theme',
    idioma: 'Language',
    
    // Opciones de tema
    oscuro: 'Dark',
    claro: 'Light',
    predeterminadoSistema: 'System Default',
    
    // Opciones de idioma
    español: 'Spanish',
    ingles: 'English',
    
    // Otros
    seleccionar: 'Select',
    configuracion: 'Configuration'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // 'es' o 'en'

  // Cargar idioma guardado al inicializar
  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('app_language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error cargando idioma:', error);
    }
  };

  const saveLanguage = async (newLanguage) => {
    try {
      await AsyncStorage.setItem('app_language', newLanguage);
      setLanguage(newLanguage);
    } catch (error) {
      console.error('Error guardando idioma:', error);
    }
  };

  const t = (key) => {
    return texts[language][key] || key;
  };

  const value = {
    language,
    setLanguage: saveLanguage,
    t, // función para obtener textos traducidos
    texts: texts[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};