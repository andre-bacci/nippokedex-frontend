import { Component, computed, effect, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DexEntryComponent } from '@app/components/dex-entry/dex-entry.component';
import { PokemonService } from '@app/services/pokemon';
import { DexEntry } from '@app/types/dexEntry';
import { Pokemon } from '@app/types/pokemon';
import { firstValueFrom } from 'rxjs';
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
  pokedexIndex = signal<number>(-1);
  pokedexName = signal<string>('');

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
      genus: details?.genus ?? '',
      description_kana:
        language === 'ja'
          ? kana_details?.descriptions?.find((description) => description.version === this.version())?.flavor_text
          : undefined,
    };
  };

  constructor() {
    effect(() => {
      this.getPokedexIndexAndName();
    });
  }

  async getPokedexIndexAndName() {
    let pokedexIndex = -1;
    let pokedexName = '';
    const version = this.version();
    const currentPokemon = this.currentPokemon();
    if (!version || !currentPokemon) return;

    try {
      const versionResponse = await firstValueFrom(this.service.getVersion(this.version()));
      const versionGroup = versionResponse.version_group;
      if (!versionGroup.name) return;

      const versionGroupResponse = await firstValueFrom(this.service.getVersionGroup(versionGroup.name));
      const pokedexes = versionGroupResponse.pokedexes;
      for (const pokedex of pokedexes) {
        // assumes default pokedex for version group is the first of array
        const pokedexResponse = await firstValueFrom(this.service.getPokedex(pokedex.name));
        const currentPokemonEntry = pokedexResponse.pokemon_entries.find(
          (entry) => entry.pokemon_species.name === currentPokemon.name,
        );
        if (currentPokemonEntry) {
          this.pokedexIndex.set(currentPokemonEntry.entry_number);
          const name = pokedexResponse.names.find((name) => name.language.name === 'en')?.name;
          if (name) pokedexName = name;
          else pokedexName = pokedexResponse.name;
          this.pokedexName.set(pokedexName);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
    this.pokedexName.set(pokedexName);
    this.pokedexIndex.set(pokedexIndex);
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
    }
  }
}
