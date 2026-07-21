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
 
function getErrorMessage(error) {
    const data = error.response?.data;
    if (data) {
        if (typeof data === 'string') return data;
        return JSON.stringify(data);
    }
    return error.message;
}
 
export const fetchPokemons = async () => {
    try {
        const response = await apiClient.get('/pokemons/');
        return response.data;
    } catch (error) {
        throw new Error("Error fetching pokemons: " + getErrorMessage(error));
    }
}
 
export const fetchPokemonById = async (id) => {
    try {
        const response = await apiClient.get(`/pokemons/${id}/`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching pokemon: " + getErrorMessage(error));
    }
}
 
export const addPokemon = async (pokemonData) => {
    const payload = {
        ...pokemonData,
        weight: pokemonData.weight ? parseFloat(pokemonData.weight) : null,
        height: pokemonData.height ? parseFloat(pokemonData.height) : null,
        trainer: pokemonData.trainer ? parseInt(pokemonData.trainer) : null,
    };
    if (pokemonData.picture instanceof File) {
        payload.picture = await fileToBase64(pokemonData.picture);
    } else {
        delete payload.picture; 
    }
    try {
        const response = await apiClient.post('/pokemons/', payload);
        return response.data;
    } catch (error) {
        throw new Error("Error adding pokemon: " + getErrorMessage(error));
    }
}
 
export const updatePokemon = async (id, pokemonData) => {
    const payload = {
        ...pokemonData,
        weight: pokemonData.weight ? parseFloat(pokemonData.weight) : null,
        height: pokemonData.height ? parseFloat(pokemonData.height) : null,
        trainer: pokemonData.trainer ? parseInt(pokemonData.trainer) : null,
    };
    if (pokemonData.picture instanceof File) {
        payload.picture = await fileToBase64(pokemonData.picture);
    } else {
        delete payload.picture;
    }
    try {
        const response = await apiClient.patch(`/pokemons/${id}/`, payload);
        return response.data;
    } catch (error) {
        throw new Error("Error updating pokemon: " + getErrorMessage(error));
    }
}
 
export const deletePokemon = async (id) => {
    try {
        const response = await apiClient.delete(`/pokemons/${id}/`);
        return response.data;
    } catch (error) {
        throw new Error("Error deleting pokemon: " + getErrorMessage(error));
    }
}