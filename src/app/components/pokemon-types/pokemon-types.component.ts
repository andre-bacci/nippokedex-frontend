import { Component, computed, input } from '@angular/core';
import { Type } from '@app/types/pokemon';

@Component({
  selector: 'app-pokemon-types',
  imports: [],
  templateUrl: './pokemon-types.component.html',
  styleUrl: './pokemon-types.component.css',
})
export class PokemonTypesComponent {
  types = input<Type[]>();
  language = input<string>();

  firstType = computed(() => {
    return this.types()
      ?.find((type) => type.slot === 1)
      ?.type.name.toLocaleUpperCase();
  });

  secondType = computed(() => {
    return this.types()
      ?.find((type) => type.slot === 2)
      ?.type.name.toLocaleUpperCase();
  });
}
