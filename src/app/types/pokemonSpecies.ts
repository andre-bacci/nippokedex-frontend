export interface Language {
  name: string;
  url: URL;
}

export interface Version {
  name: string;
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
