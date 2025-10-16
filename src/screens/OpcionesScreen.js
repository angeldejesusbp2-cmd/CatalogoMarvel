import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function OpcionesScreen({ navigation }) {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#121212' : '#fff' }
  ];

  const menuItemStyle = [
    styles.menuItem,
    { 
      backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8',
      borderBottomColor: isDark ? '#333' : '#e0e0e0'
    }
  ];

  const textStyle = [
    styles.menuText,
    { color: isDark ? '#fff' : '#333' }
  ];

  const menuItems = [
    {
      title: t('ajustes'),
      icon: 'settings',
      onPress: () => navigation.navigate('Ajustes')
    },
    {
      title: t('ayuda'),
      icon: 'help',
      onPress: () => navigation.navigate('Ayuda')
    }
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
          {t('opciones')}
        </Text>
      </View>

      <View style={styles.content}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={menuItemStyle}
            onPress={item.onPress}
            activeOpacity={0.6}
          >
            <Icon name={item.icon} size={24} color={isDark ? '#fff' : '#666'} />
            <Text style={textStyle}>{item.title}</Text>
            <Icon name="chevron-right" size={24} color={isDark ? '#666' : '#ccc'} />
          </TouchableOpacity>
        ))}
      </View>
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
    paddingHorizontal: 14,
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
  content: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 16,
  },
});