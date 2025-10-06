import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import {
  HomeScreen,
  OpcionesScreen,
  AjustesScreen,
  AyudaScreen,
  TemaScreen,
  IdiomaScreen
} from './screens';

const Stack = createStackNavigator();

function AppContent() {
  const { isDark, currentTheme } = useTheme();
  
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Ocultamos el header por defecto para usar nuestros headers personalizados
          cardStyle: { backgroundColor: isDark ? '#121212' : '#fff' }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Opciones" component={OpcionesScreen} />
        <Stack.Screen name="Ajustes" component={AjustesScreen} />
        <Stack.Screen name="Ayuda" component={AyudaScreen} />
        <Stack.Screen name="Tema" component={TemaScreen} />
        <Stack.Screen name="Idioma" component={IdiomaScreen} />
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </LanguageProvider>
    </ThemeProvider>
  );
}



