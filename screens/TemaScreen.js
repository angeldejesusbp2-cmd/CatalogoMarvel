import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Text } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TemaScreen({ navigation }) {
  const { t } = useLanguage();
  const { isDark, theme, setTheme } = useTheme();

  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#121212' : '#fff' }
  ];

  const themeOptions = [
    {
      key: 'claro',
      title: t('claro'),
      icon: 'wb-sunny',
      description: 'Tema claro para uso diurno'
    },
    {
      key: 'oscuro',
      title: t('oscuro'),
      icon: 'brightness-2',
      description: 'Tema oscuro para uso nocturno'
    },
    {
      key: 'sistema',
      title: t('predeterminadoSistema'),
      icon: 'settings-system-daydream',
      description: 'Sigue la configuración del sistema'
    }
  ];

  const renderThemeOption = ({ item }) => {
    const isSelected = theme === item.key;
    
    const itemStyle = [
      styles.themeItem,
      { 
        backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8',
        borderColor: isSelected ? (isDark ? '#4CAF50' : '#2196F3') : (isDark ? '#333' : '#e0e0e0'),
        borderWidth: isSelected ? 2 : 1
      }
    ];

    const titleStyle = [
      styles.themeTitle,
      { color: isDark ? '#fff' : '#333' }
    ];

    const descriptionStyle = [
      styles.themeDescription,
      { color: isDark ? '#ccc' : '#666' }
    ];

    return (
      <TouchableOpacity
        style={itemStyle}
        onPress={() => {
          setTheme(item.key);
          // Pequeño delay para mostrar la selección antes de regresar
          setTimeout(() => {
            navigation.goBack();
          }, 300);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.themeContent}>
          <View style={styles.themeLeft}>
            <Icon 
              name={item.icon} 
              size={28} 
              color={isSelected ? (isDark ? '#4CAF50' : '#2196F3') : (isDark ? '#fff' : '#666')} 
            />
            <View style={styles.themeTextContainer}>
              <Text style={titleStyle}>{item.title}</Text>
              <Text style={descriptionStyle}>{item.description}</Text>
            </View>
          </View>
          {isSelected && (
            <Icon 
              name="check-circle" 
              size={24} 
              color={isDark ? '#4CAF50' : '#2196F3'} 
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

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
          {t('tema')}
        </Text>
      </View>

      <FlatList
        data={themeOptions}
        renderItem={renderThemeOption}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    paddingVertical: 12,
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
  listContainer: {
    padding: 16,
  },
  themeItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  themeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  themeTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 14,
  },
});