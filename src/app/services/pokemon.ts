import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokemonResponse } from '@app/types/pokemon';
import { PokemonSpeciesResponse } from '../types/pokemonSpecies';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  // inject httpClient to read restful methods
  private http = inject(HttpClient);

  // create a method that read API URL using GET method
  getPokemonSpecies(query: string) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${query}`;

    // return API response
    return this.http.get<PokemonSpeciesResponse>(url);
  }

  getPokemonById(id: number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    // return API response
    return this.http.get<PokemonResponse>(url);
  }
}
