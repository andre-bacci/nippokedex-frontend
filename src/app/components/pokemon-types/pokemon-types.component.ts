import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-pokemon-types',
  imports: [],
  templateUrl: './pokemon-types.component.html',
  styleUrl: './pokemon-types.component.css',
})
export class PokemonTypesComponent {
  types = input<string[]>();
  language = input<string>();

  firstType = computed(() => {
    const types = this.types();
    if (types && types.length) return types[0];
    return null;
  });

  secondType = computed(() => {
    const types = this.types();
    if (types && types.length > 1) return types[1];
    return null;
  });
}
