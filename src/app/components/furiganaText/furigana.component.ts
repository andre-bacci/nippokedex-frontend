import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { FuriganaPart } from '@app/types/text';
import { parseFurigana } from '@app/utils/kana';

@Component({
  selector: 'app-furigana',
  imports: [],
  template: `
    <div class="leading-12">
      @for (token of furiganaText(); track token) {
        <ruby>
          {{ token.kanji }}
          @if (token.kana !== token.kanji) {
            <rt class="pb-0.5">{{ token.kana }}</rt>
          }
        </ruby>
      }
    </div>
  `,
  styles: ``,
})
export class FuriganaComponent {
  kanjiText = input<string | undefined>('');
  kanaText = input<string | undefined>('');
  @Output() parseError = new EventEmitter<string>();
  furiganaText = computed(() => {
    try {
      this.parseError.emit('');
      return parseFurigana(this.kanjiText(), this.kanaText());
    } catch (e) {
      this.parseError.emit(e as string);
      return [
        {
          kanji: this.kanjiText(),
          kana: this.kanjiText(),
        },
      ] as FuriganaPart[];
    }
  });
}
