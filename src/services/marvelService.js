import md5 from 'md5';
import { MARVEL_API } from '../api/marvel';


class MarvelService {
  // Genera los parámetros de autenticación requeridos por la API de Marvel
  generateAuthParams() {
    const timestamp = new Date().getTime(); // Obtiene el timestamp actual
    // Crea el hash usando timestamp + private key + public key
    const hash = md5(timestamp + MARVEL_API.PRIVATE_KEY + MARVEL_API.PUBLIC_KEY);
    return `ts=${timestamp}&apikey=${MARVEL_API.PUBLIC_KEY}&hash=${hash}`;
  }

  // Obtiene la lista de personajes
  async getCharacters(offset = 0, limit = 20) {
    try {
      const auth = this.generateAuthParams();
      const response = await fetch(
        `${MARVEL_API.BASE_URL}/characters?${auth}&offset=${offset}&limit=${limit}`
      );
      const data = await response.json();
      return data.data.results;
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  }

  // Obtiene la lista de comics
  async getComics(offset = 0, limit = 20) {
    try {
      const auth = this.generateAuthParams();
      const response = await fetch(
        `${MARVEL_API.BASE_URL}/comics?${auth}&offset=${offset}&limit=${limit}`
      );
      const data = await response.json();
      return data.data.results;
    } catch (error) {
      console.error('Error fetching comics:', error);
      throw error;
    }
  }

  // Obtiene los detalles de un personaje específico
  async getCharacterDetails(characterId) {
    try {
      const auth = this.generateAuthParams();
      const response = await fetch(
        `${MARVEL_API.BASE_URL}/characters/${characterId}?${auth}`
      );
      const data = await response.json();
      return data.data.results[0];
    } catch (error) {
      console.error('Error fetching character details:', error);
      throw error;
    }
  }

  // Obtiene los comics de un personaje específico
  async getCharacterComics(characterId, offset = 0, limit = 20) {
    try {
      const auth = this.generateAuthParams();
      const response = await fetch(
        `${MARVEL_API.BASE_URL}/characters/${characterId}/comics?${auth}&offset=${offset}&limit=${limit}`
      );
      const data = await response.json();
      return data.data.results;
    } catch (error) {
      console.error('Error fetching character comics:', error);
      throw error;
    }
  }
}

// Exportamos una única instancia del servicio
export default new MarvelService();