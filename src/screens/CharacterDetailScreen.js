import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import marvelService from '../services/marvelService';

export default function CharacterDetailScreen({ route, navigation }) {
  const { characterId } = route.params;
  const { isDark } = useTheme();
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacterDetails();
  }, []);

  const loadCharacterDetails = async () => {
    try {
      const characterData = await marvelService.getCharacterDetails(characterId);
      const comicsData = await marvelService.getCharacterComics(characterId);
      setCharacter(characterData);
      setComics(comicsData);
    } catch (error) {
      console.error('Error loading character details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
        <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />
      </View>
    );
  }

  if (!character) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
        <Text style={{ color: isDark ? '#fff' : '#000' }}>No se encontró el personaje</Text>
      </View>
    );
  }

  const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color={isDark ? '#fff' : '#000'} />
      </TouchableOpacity>

      <ScrollView>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.characterImage}
        />
        
        <View style={styles.infoContainer}>
          <Text style={[styles.name, { color: isDark ? '#fff' : '#000' }]}>
            {character.name}
          </Text>
          
          <Text style={[styles.description, { color: isDark ? '#ddd' : '#333' }]}>
            {character.description || 'No hay descripción disponible.'}
          </Text>

          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Comics
          </Text>

          <FlatList
            data={comics}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.comicCard, { backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8' }]}>
                <Image 
                  source={{ 
                    uri: `${item.thumbnail.path}.${item.thumbnail.extension}`
                  }} 
                  style={styles.comicImage}
                />
                <Text 
                  style={[styles.comicTitle, { color: isDark ? '#fff' : '#000' }]}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  characterImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comicCard: {
    width: 140,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  comicImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  comicTitle: {
    padding: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
});