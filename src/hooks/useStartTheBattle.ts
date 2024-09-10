import { useCallback, useState } from 'react';

import { fetchMovePower, fetchPokemonInfo } from '../utils/api';
import { PokemonBattleInfo, MoveBattleInfo, Pokemon } from '../types';
import { withFirstUpperCase } from '../utils/withFirstUpperCase';
import { randomExcluded } from '../utils/randomExcluded';

  // fetch selected pokemon Info
  const fetchSelectedPokemonInfo = async (name: string): Promise<PokemonBattleInfo> => {
    const pokemonData = await fetchPokemonInfo(name);
      
    const battleInfo: PokemonBattleInfo = {
      name: pokemonData.name,
      baseStat: pokemonData.stats[0].base_stat,
      primaryType: pokemonData.types[0].type.name,
      moves: pokemonData.moves.map(({ move }) => move.name),
      sprites: {
        front: pokemonData.sprites.front_default,
        back: pokemonData.sprites.back_default,
      },
    };

    return battleInfo;
  };

// Start battle hook
// Get Power of random selected attack and compare results
export const useStartTheBattle = (pokemons: Pokemon[]) => {
  const [selectedPokemons, setSelectedPokemons] = useState<PokemonBattleInfo[]>([]);
  const [battleResult, setBattleResult] = useState<string>('');
  const [battleInfo, setBattleInfo] = useState<Record<string, MoveBattleInfo> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Use useCallback only if we need to call it in useEffect for the first battle.
  // Otherwise, it's redundant.
  const startBattle = useCallback(async () => {
    setLoading(true);

    const firstPokemonIndex = randomExcluded(0, pokemons.length - 1);
    const secondPokemonIndex = randomExcluded(0, pokemons.length - 1, firstPokemonIndex);

    const firstPokemonName = pokemons[firstPokemonIndex].name;
    const secondPokemonName = pokemons[secondPokemonIndex].name;

    try {
      const [firstPokemon, secondPokemon] = await Promise.all([
        fetchSelectedPokemonInfo(firstPokemonName),
        fetchSelectedPokemonInfo(secondPokemonName),
      ]);

      setSelectedPokemons([firstPokemon, secondPokemon])

      const firstPokemonMove = firstPokemon.moves[Math.floor(Math.random() * firstPokemon.moves.length)];
      const secondPokemonMove = secondPokemon.moves[Math.floor(Math.random() * secondPokemon.moves.length)];
  
      const [firstPokemonPower, secondPokemonPower] = await Promise.all([
        fetchMovePower(firstPokemonMove),
        fetchMovePower(secondPokemonMove),
      ]);
  
      const battleInfo = {
        [firstPokemon.name]: {
          moveName: firstPokemonMove,
          movePower: firstPokemonPower,
        },
        [secondPokemon.name]: {
          moveName: secondPokemonMove,
          movePower: secondPokemonPower,
        },
      };
  
      setBattleInfo(battleInfo);
  
      if (firstPokemonPower > secondPokemonPower) {
        setBattleResult(`
          ${withFirstUpperCase(firstPokemon.name)} lands a decisive blow with ${firstPokemonMove}, knocking out ${withFirstUpperCase(secondPokemon.name)}!
          `);
      } else if (secondPokemonPower > firstPokemonPower) {
        setBattleResult(`${withFirstUpperCase(secondPokemon.name)} lands a decisive blow with ${secondPokemonMove}, knocking out ${withFirstUpperCase(firstPokemon.name)}!`);
      } else {
        setBattleResult("Draw!");
      }
  
    } catch (error) {
      // TODO some notification
      console.error('Error fetching move power, unable to start the battle.');
    } finally {
      setLoading(false);
    }
  }, [pokemons]);

  return { battleResult, battleInfo, loading, startBattle, selectedPokemons };
};
