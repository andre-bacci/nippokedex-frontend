import { Component, signal } from '@angular/core';
import { HomeComponent } from '@app/components/home/home.component';
import { PokemonSpeciesDetailResponse } from './types/response/pokemonSpecies';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  template: `
    <main>
      <div class="container">
        <app-home />
      </div>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pokemon = signal<PokemonSpeciesDetailResponse | undefined>(undefined);

  setPokemon(pokemon: PokemonSpeciesDetailResponse) {
    this.pokemon.set(pokemon);
  }
}
