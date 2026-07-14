import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const fetchPokemons = async () => {
  try {
    const response = await apiClient.get('/pokemons/');
    return response.data;
  } catch (error) {
    throw new Error("Error fetching pokemons: " + (error.response?.data?.detail || error.message));
  }
}

export const addPokemon = async (pokemonData) => {
  let pictureBase64 = "";
  if (pokemonData.picture) {
    pictureBase64 = await fileToBase64(pokemonData.picture);
  }
  const payload = { ...pokemonData, picture: pictureBase64 };
  try {
    const response = await apiClient.post('/pokemons/', payload);
    return response.data;
  } catch (error) {
    throw new Error("Error adding pokemon: " + (error.response?.data?.detail || error.message));
  }
}