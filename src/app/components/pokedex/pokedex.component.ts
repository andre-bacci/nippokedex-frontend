import { Component, computed, effect, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DexEntryComponent } from '@app/components/dex-entry/dex-entry.component';
import { PokemonService } from '@app/services/pokemon';
import { DexEntry } from '@app/types/dexEntry';
import { Pokemon } from '@app/types/pokemon';
import { PokemonTypesComponent } from '../pokemon-types/pokemon-types.component';

@Component({
  selector: 'app-pokedex',
  imports: [MatFormFieldModule, FormsModule, MatSelectModule, DexEntryComponent, PokemonTypesComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent implements OnChanges {
  service = new PokemonService();

  currentPokemon = input<Pokemon>();
  error = input<string>('');
  loading = input<boolean>(false);

  version = signal<string>('');
  pokedexIndex = signal<string>('');

  // versions that have japanese dex entries
  availableVersions = computed(() => {
    return (
      this.currentPokemon()
        ?.details.find((detail) => detail.language === 'ja')
        ?.entry.descriptions?.map((description) => description.version) ?? []
    );
  });

  getDexEntryByLanguage = (language: string): DexEntry => {
    const details = this.currentPokemon()?.details.find((detail) => detail.language === language)?.entry;
    const kana_details = this.currentPokemon()?.details.find((detail) => detail.language === 'ja-Hrkt')?.entry;
    return {
      description:
        details?.descriptions?.find((description) => description.version === this.version())?.flavor_text ?? '',
      name: details?.name ?? '',
      index: this.pokedexIndex(),
      genus: details?.genus ?? '',
      description_kana:
        language === 'ja'
          ? kana_details?.descriptions?.find((description) => description.version === this.version())?.flavor_text
          : undefined,
    };
  };

  constructor() {
    effect(
      () => {
        this.getPokedexIndex();
      },
      { allowSignalWrites: true },
    );
  }

  getPokedexIndex() {
    this.pokedexIndex.set('');
    console.log('aaa');
    if (!this.version() || !this.currentPokemon()) return;
    this.service.getVersion(this.version()).subscribe({
      next: (versionResponse) => {
        const versionGroup = versionResponse.version_group;
        if (!versionGroup.name) return;
        this.service.getVersionGroup(versionGroup.name).subscribe({
          next: (versionGroupResponse) => {
            const pokedexes = versionGroupResponse.pokedexes;
            pokedexes.map((pokedex) => {
              this.service.getPokedex(pokedex.name).subscribe({
                next: (pokedexResponse) => {
                  const currentPokemonEntry = pokedexResponse.pokemon_entries.find(
                    (entry) => entry.pokemon_species.name === this.currentPokemon()?.name,
                  );
                  if (currentPokemonEntry) {
                    const pokedexName = pokedexResponse.name;
                    const pokedexIndex = currentPokemonEntry.entry_number;
                    this.pokedexIndex.set(`${pokedexName} #${pokedexIndex}`);
                    return;
                  }
                },
              });
            });
            this.pokedexIndex.set(`national #${this.currentPokemon()?.id}`);
          },
          error: (err) => {},
        });
      },
      error: (err) => {},
    });
  }

  englishDexEntry = computed(() => {
    return this.getDexEntryByLanguage('en');
  });

  japaneseDexEntry = computed(() => {
    return this.getDexEntryByLanguage('ja');
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentPokemon']) {
      this.version.set('');
      this.pokedexIndex.set('');
    }
  }
}
