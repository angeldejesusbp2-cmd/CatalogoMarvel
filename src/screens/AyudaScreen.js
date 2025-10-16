import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AyudaScreen({ navigation }) {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#121212' : '#fff' }
  ];

  const contentStyle = [
    styles.content,
    { backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8' }
  ];

  const textStyle = [
    styles.text,
    { color: isDark ? '#fff' : '#333' }
  ];

  return (
    <SafeAreaView style={containerStyle}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={isDark ? '#fff' : '#333'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#333' }]}>
          {t('ayuda')}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={contentStyle}>
          <View style={styles.section}>
            <Icon name="info" size={32} color={isDark ? '#4CAF50' : '#2196F3'} style={styles.icon} />
            <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>
              ¿Cómo usar la aplicación?
            </Text>
            <Text style={textStyle}>
              Esta aplicación te permite navegar por el catálogo de Marvel y personalizar la experiencia según tus preferencias.
            </Text>
          </View>

          <View style={styles.section}>
            <Icon name="settings" size={32} color={isDark ? '#4CAF50' : '#2196F3'} style={styles.icon} />
            <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>
              Configuración
            </Text>
            <Text style={textStyle}>
              • Puedes cambiar el tema entre claro, oscuro o automático{'\n'}
              • Selecciona tu idioma preferido (Español o Inglés){'\n'}
              • Todas las configuraciones se guardan automáticamente
            </Text>
          </View>

          <View style={styles.section}>
            <Icon name="help" size={32} color={isDark ? '#4CAF50' : '#2196F3'} style={styles.icon} />
            <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>
              Navegación
            </Text>
            <Text style={textStyle}>
              • Usa el botón de opciones (⋮) en la esquina inferior derecha{'\n'}
              • Navega entre las diferentes secciones usando los menús{'\n'}
              • Usa el botón de retroceso para regresar a la pantalla anterior
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    margin: 16,
    borderRadius: 12,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
  },
});