import { Component, computed, input } from '@angular/core';
import { parseFurigana } from '@app/utils/kana';

@Component({
  selector: 'app-furigana',
  imports: [],
  template: `
    <div>
      @for (token of furiganaText(); track token) {
        <ruby
          >{{ token.kanji }}
          @if (token.kana !== token.kanji) {
            <rt>{{ token.kana }}</rt>
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
  furiganaText = computed(() => parseFurigana(this.kanjiText(), this.kanaText()));
}
