import { LanguageResponse } from '@app/types/response/language';
import { Name } from '@app/types/response/name';
import { VersionResponse } from '@app/types/response/version';

export interface FlavorTextEntry {
  flavor_text: string;
  language: LanguageResponse;
  version: VersionResponse;
}

export interface Genera {
  genus: string;
  language: LanguageResponse;
}

export interface PokemonSpeciesResponse {
  name: string;
  url: URL;
}

export interface PokemonSpeciesDetailResponse {
  id: number;
  flavor_text_entries: FlavorTextEntry[];
  genera: Genera[];
  name: string;
  names: Name[];
}
