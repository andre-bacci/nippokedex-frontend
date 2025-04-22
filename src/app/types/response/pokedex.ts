import { PokemonSpeciesResponse } from '@app/types/response/pokemonSpecies';

export interface PokedexResponse {
  name: string;
  url: URL;
}

export interface PokedexEntry {
  entry_number: number;
  pokemon_species: PokemonSpeciesResponse;
}

export interface PokedexDetailResponse {
  id: number;
  name: string;
  pokemon_entries: any[];
}
