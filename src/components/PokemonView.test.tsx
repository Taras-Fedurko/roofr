import { render, screen } from '@testing-library/react';

import { PokemonBattleInfo, MoveBattleInfo } from '../types';
import PokemonView from './PokemonView';

describe('PokemonView Component', () => {
  const pokemon: PokemonBattleInfo = {
    name: 'pikachu',
    primaryType: 'Electric',
    moves: ['thunderbolt', 'quick-attack', 'iron-tail'],
    baseStat: 90,
    sprites: {
      front: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      back: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
    },
  };

  const battleInfo: MoveBattleInfo = {
    moveName: 'Thunderbolt',
    movePower: 90,
  };

  test('renders PokemonView with pokemon name and image', () => {
    render(<PokemonView pokemon={pokemon} side="front" battleInfo={battleInfo} />);

    expect(screen.getByText("Pikachu")).toBeInTheDocument();

    const pokemonImage = screen.getByAltText(/pikachu/i);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', pokemon.sprites.front);

    expect(screen.getByText("Thunderbolt: 90")).toBeInTheDocument();

    expect(screen.queryByText("Quick-attack: 90")).not.toBeInTheDocument();
    expect(screen.queryByText("Iron-tail: 90")).not.toBeInTheDocument();
  });
});
