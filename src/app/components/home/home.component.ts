import { Component, signal } from '@angular/core';
import { HeaderComponent } from '@app/components/header/header.component';
import { PokedexComponent } from '@app/components/pokedex/pokedex.component';
import { Pokemon } from '@app/types/pokemon';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, PokedexComponent],
  template: `
    <main>
      <div class="container">
        <app-header
          (currentPokemon)="setPokemon($event)"
          (error)="setApiError($event)"
          (loading)="setApiLoading($event)"
        />
        <section class="content">
          <app-pokedex [currentPokemon]="pokemon()" [error]="apiError()" [loading]="apiLoading()" />
        </section>
      </div>
    </main>
  `,
  styles: ``,
})
export class HomeComponent {
  pokemon = signal<Pokemon | undefined>(undefined);
  version = signal<string>('');
  apiError = signal<string>('');
  apiLoading = signal<boolean>(false);

  setPokemon(pokemon: Pokemon) {
    this.pokemon.set(pokemon);
  }

  setApiError(error: string) {
    this.apiError.set(error);
  }

  setApiLoading(loading: boolean) {
    this.apiLoading.set(loading);
  }
}
