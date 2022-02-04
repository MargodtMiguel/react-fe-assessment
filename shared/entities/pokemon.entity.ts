export interface PokemonList {
  count: number;
  next: string;
  previous: null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: string;
  name: string;
  height: number;
  weight: number;
  moves: Move[];
  sprites: {
    front_default: string;
    back_default: string;
  };
}

export interface Move {
  move: {
    name: string;
    url: string;
  };
}
