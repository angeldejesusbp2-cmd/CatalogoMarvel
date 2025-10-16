import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Text } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function IdiomaScreen({ navigation }) {
  const { t, language, setLanguage } = useLanguage();
  const { isDark } = useTheme();

  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#121212' : '#fff' }
  ];

  const languageOptions = [
    {
      key: 'es',
      title: 'Español',
      subtitle: 'Spanish',
      flag: '🇪🇸'
    },
    {
      key: 'en',
      title: 'English',
      subtitle: 'Inglés',
      flag: '🇺🇸'
    }
  ];

  const renderLanguageOption = ({ item }) => {
    const isSelected = language === item.key;
    
    const itemStyle = [
      styles.languageItem,
      { 
        backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8',
        borderColor: isSelected ? (isDark ? '#4CAF50' : '#2196F3') : (isDark ? '#333' : '#e0e0e0'),
        borderWidth: isSelected ? 2 : 1
      }
    ];

    const titleStyle = [
      styles.languageTitle,
      { color: isDark ? '#fff' : '#333' }
    ];

    const subtitleStyle = [
      styles.languageSubtitle,
      { color: isDark ? '#ccc' : '#666' }
    ];

    return (
      <TouchableOpacity
        style={itemStyle}
        onPress={() => {
          setLanguage(item.key);
          // Pequeño delay para mostrar la selección antes de regresar
          setTimeout(() => {
            navigation.goBack();
          }, 300);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.languageContent}>
          <View style={styles.languageLeft}>
            <Text style={styles.flag}>{item.flag}</Text>
            <View style={styles.languageTextContainer}>
              <Text style={titleStyle}>{item.title}</Text>
              <Text style={subtitleStyle}>{item.subtitle}</Text>
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
          {t('idioma')}
        </Text>
      </View>

      <FlatList
        data={languageOptions}
        renderItem={renderLanguageOption}
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
  listContainer: {
    padding: 16,
  },
  languageItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 32,
    marginRight: 16,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  languageSubtitle: {
    fontSize: 14,
  },
});