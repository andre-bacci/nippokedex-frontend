import { Component, signal } from '@angular/core';
import { HeaderComponent } from '@app/components/header/header.component';
import { PokedexComponent } from '@app/components/pokedex/pokedex.component';
import { PokemonResponse } from '@app/types/pokemon';
import { PokemonSpeciesResponse } from '@app/types/pokemonSpecies';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, PokedexComponent],
  template: `
    <main>
      <div class="container">
        <app-header (pokedexData)="setPokedexData($event)" (pokemonData)="setPokemonData($event)" />
        <section class="content">
          <app-pokedex [pokemonSpeciesResponse]="pokedexData()" [pokemonResponse]="pokemonData()"></app-pokedex>
        </section>
      </div>
    </main>
  `,
  styles: ``,
})
export class HomeComponent {
  pokedexData = signal<PokemonSpeciesResponse | undefined>(undefined);
  pokemonData = signal<PokemonResponse | undefined>(undefined);
  version = signal<string>('');

  setPokedexData(pokemon: PokemonSpeciesResponse) {
    this.pokedexData.set(pokemon);
  }

  setPokemonData(pokemon: PokemonResponse) {
    this.pokemonData.set(pokemon);
  }
}
