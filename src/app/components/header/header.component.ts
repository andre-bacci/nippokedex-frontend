import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NippokedexBackendService } from '@app/services/nippokedexBackend';
import { Pokemon } from '@app/types/pokemon';
import { formatSpeciesNameToQuery } from '@app/utils/pokemon';

@Component({
  selector: 'app-header',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  template: `
    <header>
      <div class="flex w-full flex-row justify-between p-2 items-center bg-red-200 mb-4 border-b-1 border-red-300">
        <h1 class="text-3xl">NipPokéDex!</h1>
        <div class="flex flex-row gap-2 items-center">
          <mat-form-field class="w-80" subscriptSizing="dynamic">
            <mat-label>Search a Pokémon by index or name</mat-label>
            <input type="text" matInput [(ngModel)]="pokemon" (keyup.enter)="searchPokemon(pokemon())" />
          </mat-form-field>
          <button mat-button (click)="searchPokemon(pokemon())">Search</button>
        </div>
        <div>Logo here</div>
      </div>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  service = new NippokedexBackendService();
  pokemon = signal('');
  version = signal('');
  @Output() currentPokemon = new EventEmitter<Pokemon>();
  @Output() error = new EventEmitter<string>();
  @Output() loading = new EventEmitter<boolean>();
  searchPokemon(pokemon: string) {
    this.loading.emit(true);
    this.service.getPokemon(formatSpeciesNameToQuery(pokemon)).subscribe({
      next: (pokemon) => {
        this.currentPokemon.emit(pokemon);
        this.error.emit('');
        this.loading.emit(false);
      },
      error: (err) => {
        this.error.emit(`Error finding pokémon with name/index ${pokemon}`);
        this.loading.emit(false);
      },
    });
  }
}
