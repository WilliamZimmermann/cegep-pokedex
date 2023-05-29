export interface PokemonListAPI {
  count?: number;
  next?: string;
  previous?: string;
  results: PokemonListResult[];
}

export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonApi {
  id: number;
  name: string;
  imageUrl: string;
}
