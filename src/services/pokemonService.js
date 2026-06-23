import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPokemons = async () => {
    const response = await apiClient.get ('/pokemons/');
    return response.data;
}