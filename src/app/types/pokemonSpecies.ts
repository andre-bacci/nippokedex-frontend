export enum VersionName {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  SWORD = 'sword',
}

export enum LanguageName {
  JAPANESE = 'ja',
  JAPANESE_KANA = 'ja-Hkrt',
  ENGLISH = 'en',
}

export interface Language {
  name: LanguageName;
  url: URL;
}

export interface Version {
  name: VersionName;
  url: URL;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
  version: Version;
}

export interface Genera {
  genus: string;
  language: Language;
}

export interface Name {
  name: string;
  language: Language;
}

export interface PokemonSpeciesResponse {
  id: number;
  flavor_text_entries: FlavorTextEntry[];
  genera: Genera[];
  name: string;
  names: Name[];
}
