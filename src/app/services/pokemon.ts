import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokedexDetailResponse } from '@app/types/response/pokedex';
import { PokemonDetailResponse } from '@app/types/response/pokemon';
import { VersionDetailResponse } from '@app/types/response/version';
import { VersionGroupDetailResponse } from '@app/types/response/versionGroup';
import { Observable } from 'rxjs';
import { PokemonSpeciesDetailResponse } from '../types/response/pokemonSpecies';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  // inject httpClient to read restful methods
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2';

  // create a method that read API URL using GET method
  getPokemonSpecies(query: string | number): Observable<PokemonSpeciesDetailResponse> {
    const url = `${this.baseUrl}/pokemon-species/${query}`;

    return this.http.get<PokemonSpeciesDetailResponse>(url);
  }

  getPokedex(query: string | number): Observable<PokedexDetailResponse> {
    const url = `${this.baseUrl}/pokedex/${query}`;

    return this.http.get<PokedexDetailResponse>(url);
  }

  getPokemon(query: string | number): Observable<PokemonDetailResponse> {
    const url = `${this.baseUrl}/pokemon/${query}`;

    return this.http.get<PokemonDetailResponse>(url);
  }

  getVersion(query: string | number): Observable<VersionDetailResponse> {
    const url = `${this.baseUrl}/version/${query}`;

    return this.http.get<VersionDetailResponse>(url);
  }

  getVersionGroup(query: string | number): Observable<VersionGroupDetailResponse> {
    const url = `${this.baseUrl}/version-group/${query}`;

    return this.http.get<VersionGroupDetailResponse>(url);
  }
}
