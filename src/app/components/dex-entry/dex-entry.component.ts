import { Component, computed, input, signal } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuriganaComponent } from '@app/components/furiganaText/furigana.component';
import { DexEntry } from '@app/types/dexEntry';
import { PokemonResponse } from '@app/types/pokemon';
import { PokemonSpeciesResponse } from '@app/types/pokemonSpecies';
import { FuriganaPart } from '@app/types/text';
import { parseFurigana } from '@app/utils/kana';
import { getDexEntry, getGenus, getName } from '@app/utils/pokemon';

interface FuriganaProcess {
  furigana_text: FuriganaPart[];
  error: string;
}

@Component({
  selector: 'app-dex-entry',
  imports: [FuriganaComponent, MatSlideToggleModule],
  templateUrl: './dex-entry.component.html',
  styleUrl: './dex-entry.component.css',
})
export class DexEntryComponent {
  language = input<string>();
  version = input<string>();
  pokemonSpeciesResponse = input<PokemonSpeciesResponse>();
  pokemonResponse = input<PokemonResponse>();

  showKana = signal<boolean>(false);

  public setShowKana(event: MatSlideToggleChange) {
    this.showKana.set(event.checked);
  }

  description = computed(() =>
    getDexEntry(this.language(), this.version(), this.pokemonSpeciesResponse()?.flavor_text_entries),
  );
  description_kana = computed(() =>
    this.language() === 'ja'
      ? getDexEntry('ja-Hrkt', this.version(), this.pokemonSpeciesResponse()?.flavor_text_entries)
      : undefined,
  );
  furigana_process = computed<FuriganaProcess>(() => {
    if (this.language() === 'ja') {
      try {
        const furigana_text = parseFurigana(this.description(), this.description_kana());
        return {
          furigana_text: furigana_text,
          error: '',
        };
      } catch (e) {
        return {
          furigana_text: [],
          error: e as string,
        };
      }
    }
    return {
      furigana_text: [],
      error: '',
    };
  });

  dexEntry = computed<DexEntry>(() => {
    return {
      name: getName(this.language(), this.pokemonSpeciesResponse()?.names),
      genus: getGenus(this.language(), this.pokemonSpeciesResponse()?.genera),
      description: this.description(),
      description_kana: this.description_kana(),
      furigana_text: this.furigana_process().furigana_text,
      types: this.pokemonResponse()?.types,
    };
  });
}
