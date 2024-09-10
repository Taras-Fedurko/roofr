import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fetchMovePower, fetchPokemonInfo } from '../utils/api';
import { Pokemon } from '../types';
import Battle from './Battle';

jest.mock('../utils/api', () => ({
  fetchMovePower: jest.fn(),
  fetchPokemonInfo: jest.fn(),
}));

describe('Battle Component', () => {
  const mockPokemons: Pokemon[] = [
    {
      name: 'Pikachu',
      url: '/pikachu',
    },
    {
      name: 'Charizard',
      url: '/charizard',
    }
  ];

  const mockPikachuData = {
    name: 'Pikachu',
    stats: [{ base_stat: 90, stat: { name: 'hp' } }],
    sprites: { front_default: 'pikachu_front.png', back_default: 'pikachu_back.png' },
    types: [{ type: { name: 'Electric' } }],
    moves: [{ move: { name: 'thunderbolt' } }],
  };

  const mockCharizardData = {
    name: 'Charizard',
    stats: [{ base_stat: 110, stat: { name: 'hp' } }],
    sprites: { front_default: 'charizard_front.png', back_default: 'charizard_back.png' },
    types: [{ type: { name: 'Fire' } }],
    moves: [{ move: { name: 'flamethrower' } }],
  };

  const mockMoveData = {
    thunderbolt: 90,
    flamethrower: 85,
  };

  beforeEach(() => {
    (fetchPokemonInfo as jest.Mock).mockImplementation((name: string) => {
      if (name === 'Pikachu') {
        return Promise.resolve(mockPikachuData);
      } else if (name === 'Charizard') {
        return Promise.resolve(mockCharizardData);
      }
      return Promise.reject(new Error('Unknown Pokémon'));
    });

    (fetchMovePower as jest.Mock).mockImplementation((moveName: string) => {
      if (moveName === 'thunderbolt') {
        return Promise.resolve(mockMoveData.thunderbolt);
      } else if (moveName === 'flamethrower') {
        return Promise.resolve(mockMoveData.flamethrower);
      }
      return Promise.reject(new Error('Unknown move'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the battle and starts correctly', async () => {
    render(<Battle pokemons={mockPokemons} />);

    expect(screen.queryByText('Press "Start Battle" to get opponents.')).not.toBeInTheDocument();

    expect(await screen.findByText('Pikachu')).toBeInTheDocument();
    expect(await screen.findByText('Charizard')).toBeInTheDocument();

    expect(screen.getByAltText('Pikachu')).toHaveAttribute('src', 'pikachu_front.png');
    expect(screen.getByAltText('Charizard')).toHaveAttribute('src', 'charizard_back.png');

    expect(await screen.findByText('Pikachu lands a decisive blow with thunderbolt, knocking out Charizard!')).toBeInTheDocument();

    expect(await screen.findByText('Thunderbolt: 90')).toBeInTheDocument();
    expect(await screen.findByText('Flamethrower: 85')).toBeInTheDocument();

    const startBattleButton = screen.getByText('Start battle');
    await userEvent.click(startBattleButton);
  });
});
