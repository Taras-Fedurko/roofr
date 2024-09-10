import axios from 'axios';
import { Pokemon } from '../types';

export const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 3000,
});

export const fetchMovePower = async (moveName: string): Promise<number> => {
  const response = await apiClient.get(`move/${moveName.toLowerCase()}`);
  return response.data.power ?? 0;
};

export interface PokemonBasicInfo {
  name: string;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
  }>;
}

export const fetchPokemonInfo = async (name: string): Promise<PokemonBasicInfo> => {
  const response = await apiClient.get<PokemonBasicInfo>(`pokemon/${name.toLowerCase()}`);
  
  return response.data;
};

interface PokemonAPIResponse {
  results: Pokemon[];
}

// We could use a limit of 1500. In the current case, it takes less than 50ms to fetch.
// But it's notthe best idea
export const fetchPokemons = async () => {
  const response = await apiClient.get<PokemonAPIResponse>('pokemon?limit=1500&offset=0');

  return response.data.results;
}