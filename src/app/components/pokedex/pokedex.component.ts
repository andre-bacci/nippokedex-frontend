import { Component, computed, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DexEntryComponent } from '@app/components/dex-entry/dex-entry.component';
import { Pokemon } from '@app/types/pokemon';
import { PokemonTypesComponent } from '../pokemon-types/pokemon-types.component';

@Component({
  selector: 'app-pokedex',
  imports: [MatFormFieldModule, FormsModule, MatSelectModule, DexEntryComponent, PokemonTypesComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent implements OnChanges {
  currentPokemon = input<Pokemon>();
  error = input<string>('');
  loading = input<boolean>(false);

  version = signal<string>('');

  // versions that have japanese dex entries
  availableVersions = computed(() => {
    return (
      this.currentPokemon()
        ?.details.find((detail) => detail.language === 'ja')
        ?.entry.descriptions?.map((description) => description.version) ?? []
    );
  });

  englishName = computed(() => {
    return this.currentPokemon()?.details.find((detail) => detail.language === 'en')?.entry.name;
  });

  japaneseName = computed(() => {
    return this.currentPokemon()?.details.find((detail) => detail.language === 'ja')?.entry.name;
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentPokemon']) {
      this.version.set('');
    }
  }
}
