import { Component, input } from '@angular/core';
import { FuriganaPart } from '@app/types/text';

@Component({
  selector: 'app-furigana',
  imports: [],
  template: `
    <div class="leading-12">
      <ruby>
        @for (token of furiganaText(); track token) {
          <rb> {{ token.kanji }}</rb>
          @if (token.kana !== token.kanji) {
            <rt class="pb-0.5">{{ token.kana }}</rt>
          } @else {
            <rt></rt>
          }
        }
      </ruby>
    </div>
  `,
  styles: ``,
})
export class FuriganaComponent {
  furiganaText = input<FuriganaPart[]>();
}
