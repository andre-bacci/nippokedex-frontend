import { Component, computed, effect, input, signal } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuriganaComponent } from '@app/components/furiganaText/furigana.component';
import { DexEntry } from '@app/types/dexEntry';
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
  dexEntry = input<DexEntry>();

  showKana = signal<boolean>(false);

  canShowKana = computed(() => {
    return this.dexEntry()?.description_kana !== undefined;
  });

  public setShowKana(event: MatSlideToggleChange) {
    this.showKana.set(event.checked);
  }

  furigana_process = computed<FuriganaProcess>(() => {
    if (this.canShowKana()) {
      try {
        const furigana_text = parseFurigana(this.dexEntry()?.description, this.dexEntry()?.description_kana, true);
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

  constructor() {
    effect(() => {
      if (this.furigana_process().error) console.error(this.furigana_process().error);
    });
  }
}
