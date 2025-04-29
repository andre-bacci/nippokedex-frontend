import { Component, computed, effect, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DexEntryComponent } from '@app/components/dex-entry/dex-entry.component';
import { PokemonService } from '@app/services/nippokedexBackend';
import { DexEntry } from '@app/types/dexEntry';
import { PokedexIndex } from '@app/types/pokedexIndex';
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
  pokedexIndex = signal<PokedexIndex | null>(null);

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
    this.pokedexIndex.set(null);
    const version = this.version();
    const currentPokemon = this.currentPokemon();
    const pokemonId = currentPokemon?._id;
    if (!pokemonId) return;
    try {
      const pokedexIndex = await firstValueFrom(this.service.getPokedexIndexByVersion(pokemonId, version));
      this.pokedexIndex.set(pokedexIndex);
    } catch (e) {
      console.error(e);
    }
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
