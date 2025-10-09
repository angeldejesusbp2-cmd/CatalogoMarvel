import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#121212' : '#fff' }
  ];

  const textStyle = [
    styles.text,
    { color: isDark ? '#fff' : '#000' }
  ];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        {t('catalogoMarvel')}
      </Text>
      
      {/* Botón de Opciones en esquina inferior derecha */}
      <TouchableOpacity
        style={[styles.optionsButton, { backgroundColor: isDark ? '#333' : '#f0f0f0' }]}
        onPress={() => navigation.navigate('Opciones')}
        activeOpacity={0.7}
      >
        <Icon 
          name="more-vert" 
          size={24} 
          color={isDark ? '#fff' : '#333'} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionsButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
});