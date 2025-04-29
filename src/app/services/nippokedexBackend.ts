import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokedexIndex } from '@app/types/pokedexIndex';
import { Pokemon } from '@app/types/pokemon';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  // inject httpClient to read restful methods
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  getPokemon(query: string | number): Observable<Pokemon> {
    const url = `${this.baseUrl}/pokemon/${query}`;

    return this.http.get<Pokemon>(url);
  }

  getPokedexIndexByVersion(id: number, version: string): Observable<PokedexIndex> {
    const url = `${this.baseUrl}/pokemon/${id}/pokedex/${version}`;

    return this.http.get<PokedexIndex>(url);
  }
}
