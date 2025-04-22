import { Component, computed, input, signal } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuriganaComponent } from '@app/components/furiganaText/furigana.component';
import { Pokemon } from '@app/types/pokemon';
import { FuriganaPart } from '@app/types/text';
import { parseFurigana } from '@app/utils/kana';

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
  currentPokemon = input<Pokemon>();

  showKana = signal<boolean>(false);

  public setShowKana(event: MatSlideToggleChange) {
    this.showKana.set(event.checked);
  }

  genus = computed(
    () => this.currentPokemon()?.details.find((detail) => detail.language === this.language())?.entry.genus,
  );
  description = computed(
    () =>
      this.currentPokemon()
        ?.details.find((detail) => detail.language === this.language())
        ?.entry.descriptions?.find((description) => description.version === this.version())?.flavor_text,
  );
  description_kana = computed(
    () =>
      this.currentPokemon()
        ?.details.find((detail) => detail.language === 'ja-Hrkt')
        ?.entry.descriptions?.find((description) => description.version === this.version())?.flavor_text,
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
}
