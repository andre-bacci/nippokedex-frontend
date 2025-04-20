import { Component, computed, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DexEntryComponent } from '@app/components/dex-entry/dex-entry.component';
import { PokemonResponse } from '@app/types/pokemon';
import { PokemonSpeciesResponse } from '@app/types/pokemonSpecies';
import { getAvailableVersions, getName } from '@app/utils/pokemon';

@Component({
  selector: 'app-pokedex',
  imports: [MatFormFieldModule, FormsModule, MatSelectModule, DexEntryComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent implements OnChanges {
  pokemonSpeciesResponse = input<PokemonSpeciesResponse>();
  pokemonResponse = input<PokemonResponse>();

  version = signal('');

  availableVersions = computed(() =>
    getAvailableVersions(['en', 'ja'], this.pokemonSpeciesResponse()?.flavor_text_entries),
  );

  nameJp = computed(() => getName('ja', this.pokemonSpeciesResponse()?.names));
  nameEn = computed(() => getName('en', this.pokemonSpeciesResponse()?.names));

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonSpeciesResponse']) {
      this.version.set('');
    }
  }
}
