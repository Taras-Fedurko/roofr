import { useState, useEffect } from 'react';
import { Pokemon } from '../types';
import { fetchPokemons } from '../utils/api';

// Just to avoid call useEffect methods twice.
// by using react-query or smth else, it will be not nessesary
let fetchedStrict = false;

// Without pagination or fetching all data.
// Lets assume we work only with first 20 pokemons. I could implement pagination later without 1h limitation.

// NOTE To aviod request woterflow:
// If we have ONLY 1302, we could store it on a constant in code just to avoud fatching all request at the beginning.
// It will not work if we will have a big numbers of pokemons. (1302 is a small).
// I will fetch it from the start but we could avoid this api call. 

// The best way - is to create API endpoint "/pokemons/battle" - that will return 2 random pokemons with stats.
// To prevent fetch all list if it could have thousands of entities
export const useFetchPokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fetchedStrict) return;

    fetchedStrict = true;

    const init = async () => {
      setLoading(true);

      try {
        const pokemonsList = await fetchPokemons();

        setPokemons(pokemonsList)
      } catch (err) {
        console.error(err);
        setError('Failed to fetch Pokémon for battle.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return { pokemons, loading, error };
};