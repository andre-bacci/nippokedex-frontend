import { PokemonDetailResponse } from '@app/types/response/pokemon';
import { PokemonSpeciesDetailResponse } from '@app/types/response/pokemonSpecies';

export interface PokemonDetailsByLanguage {
  name?: string;
  genus?: string;
  descriptions?: {
    version: string;
    flavor_text: string;
  }[];
}

const LANGUAGES = ['ja', 'ja-Hrkt', 'en'];

export class Pokemon {
  id: number;
  name: string;
  details: {
    language: string;
    entry: PokemonDetailsByLanguage;
  }[];
  types: string[];
  sprite: URL;

  constructor(pokemonResponse: PokemonDetailResponse, pokemonSpeciesResponse: PokemonSpeciesDetailResponse) {
    this.id = pokemonResponse.id;
    this.name = pokemonResponse.name;
    this.details = LANGUAGES.map((language) => {
      return {
        language: language,
        entry: {
          name: pokemonSpeciesResponse.names.find((name) => name.language.name === language)?.name,
          genus: pokemonSpeciesResponse.genera.find((name) => name.language.name === language)?.genus,
          descriptions: pokemonSpeciesResponse.flavor_text_entries
            .filter((name) => name.language.name === language)
            .map((entry) => {
              return { version: entry.version.name, flavor_text: entry.flavor_text };
            }),
        },
      };
    });
    this.types = pokemonResponse.types.map((type) => type.type.name);
    this.sprite = pokemonResponse.sprites.front_default;
  }
}
