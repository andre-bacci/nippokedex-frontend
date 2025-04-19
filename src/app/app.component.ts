import { Component, signal } from '@angular/core';
import { HomeComponent } from '@app/components/home/home.component';
import { PokemonSpeciesResponse } from './types/pokemonSpecies';

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
  pokemon = signal<PokemonSpeciesResponse | undefined>(undefined);

  setPokemon(pokemon: PokemonSpeciesResponse) {
    this.pokemon.set(pokemon);
  }
}
