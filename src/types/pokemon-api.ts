export interface PokemonListAPI {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonListResultAPI[];
}

export interface PokemonListResultAPI {
  name: string;
  url: string;
}
