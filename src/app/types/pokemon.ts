export interface PokemonDetailsByLanguage {
  name?: string;
  genus?: string;
  descriptions?: {
    version: string;
    flavor_text: string;
  }[];
}

export interface Pokemon {
  _id: number;
  name: string;
  details: {
    language: string;
    entry: PokemonDetailsByLanguage;
  }[];
  types: string[];
  sprite: URL;
}
