export interface Sprite {
  front_default: URL;
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: URL;
  };
}

export interface PokemonResponse {
  id: number;
  name: string;
  sprites: Sprite;
  types: Type[];
}
