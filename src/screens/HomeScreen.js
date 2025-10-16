import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  FlatList,
  Image,
  ActivityIndicator,
  Text,
  TextInput
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import marvelService from '../services/marvelService';


export default function HomeScreen({ navigation }) {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const loadCharacters = async (reset = false) => {
    try {
      const newOffset = reset ? 0 : offset;
      const newCharacters = await marvelService.getCharacters(newOffset);
      
      if (reset) {
        setCharacters(newCharacters);
      } else {
        // Evitar duplicados verificando si el personaje ya existe
        setCharacters(prevCharacters => {
          const existingIds = new Set(prevCharacters.map(char => char.id));
          const uniqueNewCharacters = newCharacters.filter(char => !existingIds.has(char.id));
          return [...prevCharacters, ...uniqueNewCharacters];
        });
      }
      
      setOffset(newOffset + 20);
    } catch (error) {
      console.error('Error loading characters:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setOffset(0);
    loadCharacters(true);
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredCharacters(characters);
    } else {
      const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  }, [searchText, characters]);

  const renderCharacter = ({ item }) => {
    const imageUrl = `${item.thumbnail.path}.${item.thumbnail.extension}`;
    
    return (
      <TouchableOpacity 
        style={[
          styles.characterCard, 
          { backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8' }
        ]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}
      >
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.characterImage} 
        />
        <Text style={[
          styles.characterName,
          { color: isDark ? '#fff' : '#333' }
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color={isDark ? '#fff' : '#333'} style={styles.searchIcon} />
        <TextInput
          style={[
            styles.searchInput,
            { 
              backgroundColor: isDark ? '#333' : '#f0f0f0',
              color: isDark ? '#fff' : '#333'
            }
          ]}
          placeholder="Buscar personajes..."
          placeholderTextColor={isDark ? '#999' : '#666'}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={filteredCharacters}
        renderItem={renderCharacter}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        onEndReached={() => !loading && loadCharacters()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => loading && <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      
      <TouchableOpacity
        style={[styles.optionsButton, { backgroundColor: isDark ? '#333' : '#f0f0f0' }]}
        onPress={() => navigation.navigate('Opciones')}
        activeOpacity={0.7}
      >
        <Icon name="more-vert" size={24} color={isDark ? '#fff' : '#333'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  characterCard: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  characterImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  characterName: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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