export function formatSpeciesNameToQuery(pokemon: string): string {
  return pokemon.replace(' ', '-').replace('.', '');
}
