import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FuriganaComponent } from '@app/components/furiganaText/furigana.component';
import { PokemonResponse } from '@app/types/pokemon';
import { PokemonSpeciesResponse } from '@app/types/pokemonSpecies';
import { getAvailableVersions, getDexEntry } from '@app/utils/pokemon';

@Component({
  selector: 'app-pokedex',
  imports: [MatFormFieldModule, FormsModule, MatSelectModule, FuriganaComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent {
  pokemonSpeciesResponse = input<PokemonSpeciesResponse>();
  pokemonResponse = input<PokemonResponse>();
  version = signal('');
  versions = computed(() =>
    getAvailableVersions(['ja', 'en', 'ja-Hrkt'], this.pokemonSpeciesResponse()?.flavor_text_entries),
  );
  dexEntryJp = computed(() => getDexEntry('ja', this.version(), this.pokemonSpeciesResponse()?.flavor_text_entries));
  dexEntryKana = computed(() =>
    getDexEntry('ja-Hrkt', this.version(), this.pokemonSpeciesResponse()?.flavor_text_entries),
  );
  dexEntryEn = computed(() => getDexEntry('en', this.version(), this.pokemonSpeciesResponse()?.flavor_text_entries));
}
