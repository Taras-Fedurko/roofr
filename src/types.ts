export interface Pokemon {
  name: string;
  url: string;
}

export type PokemonStripes = 'front' | 'back';

export interface MoveBattleInfo {
  moveName: string;
  movePower: number;
}

export interface PokemonBattleInfo {
  name: string;
  primaryType: string;
  moves: string[];
  baseStat: number;
  sprites: Record<PokemonStripes, string>;
}

