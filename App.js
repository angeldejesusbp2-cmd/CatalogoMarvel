import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import SplashScreen from './src/components/SplashScreen';
import {
  HomeScreen,
  OpcionesScreen,
  AjustesScreen,
  AyudaScreen,
  TemaScreen,
  IdiomaScreen,
  CharacterDetailScreen
} from './src/screens';

const Stack = createStackNavigator();

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: isDark ? '#121212' : '#fff' }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Opciones" component={OpcionesScreen} />
        <Stack.Screen name="Ajustes" component={AjustesScreen} />
        <Stack.Screen name="Ayuda" component={AyudaScreen} />
        <Stack.Screen name="Tema" component={TemaScreen} />
        <Stack.Screen name="Idioma" component={IdiomaScreen} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <NavigationContainer>
          {isLoading ? (
            <SplashScreen onFinish={handleSplashFinish} />
          ) : (
            <AppContent />
          )}
        </NavigationContainer>
      </LanguageProvider>
    </ThemeProvider>
  );
}



