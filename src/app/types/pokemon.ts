export interface Sprite {
  front_default: URL;
}

export interface PokemonResponse {
  id: number;
  name: string;
  sprites: Sprite;
}
