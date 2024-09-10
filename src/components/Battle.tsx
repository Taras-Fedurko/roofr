import { useEffect } from 'react';

import { useStartTheBattle } from '../hooks/useStartTheBattle';
import { Pokemon } from '../types';
import styles from './Battle.module.css';
import PokemonView from './PokemonView';

// Just to avoid call useEffect methods twice.
// by using react-query or smth else, it will be not nessesary
let fetchedStrict = false;

interface BattleProps {
  pokemons: Pokemon[]
}

const Battle = ({ pokemons }: BattleProps) => {
  const { startBattle, battleResult, battleInfo, loading, selectedPokemons } = useStartTheBattle(pokemons);

  // to initialize the battle for the first time.
  // if not necessary, consider removing this and the useCallback wrapper from startBattle.
  useEffect(() => {
    if (fetchedStrict) return;

    fetchedStrict = true;

    startBattle();
  }, [startBattle])
  
  return (
    <div className={styles.container}>
      <div className={styles.pokemonsBattle}>
        {selectedPokemons.map((pokemon, index) => (
          <PokemonView
              key={pokemon.name}
              pokemon={pokemon}
              side={index === 0 ? 'front' : 'back'}
              battleInfo={battleInfo?.[pokemon.name]}
            />
        ))}
      </div>

      <strong>Battle Log</strong>
      <div className={styles.battleResult}>
        <div className={styles.battleLog}>
          <p>{battleResult}</p>
        </div>
        <button disabled={loading}onClick={startBattle}>
            Start battle
          </button>
      </div>
    </div>
  )
}

export default Battle;