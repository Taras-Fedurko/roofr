import { MoveBattleInfo, PokemonBattleInfo, PokemonStripes } from '../types';
import { withFirstUpperCase } from '../utils/withFirstUpperCase';
import styles from './PokemonView.module.css';

interface PokemonViewProps {
  pokemon: PokemonBattleInfo;
  side: PokemonStripes;
  battleInfo?: MoveBattleInfo;
}

const PokemonView = ({ pokemon, side, battleInfo }: PokemonViewProps) => {    
  return (
    <div className={`${styles.pokemonBlock} ${styles[side]}`}>
      <div className={styles.pokemonImage}>
        <img src={pokemon.sprites[side]} alt={pokemon.name} />
      </div>
      <div className={`${styles.pokemonInfo} ${styles[side]}`}>
        <p className={styles.pokemonName}>{withFirstUpperCase(pokemon.name)}</p>
        {battleInfo && (
          <div className={`${styles.pokemonAttack} ${styles[side]}`}>
            <p>{withFirstUpperCase(battleInfo.moveName)}: {battleInfo.movePower}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonView;
