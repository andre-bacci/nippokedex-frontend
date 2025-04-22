import { Name } from '@app/types/response/name';
import { FlavorTextEntry, Genera } from '@app/types/response/pokemonSpecies';

export function getDexEntry(
  language: string | undefined,
  version: string | undefined,
  dexEntries: FlavorTextEntry[] | undefined,
): string | undefined {
  if (!dexEntries || !version || !language) return undefined;
  const entry = dexEntries
    .find((dexEntry) => dexEntry.language.name == language && dexEntry.version.name == version)
    ?.flavor_text.replace('\f', ' ')
    .replace('\n', ' ');
  return entry ?? 'Unavailable in this language';
}

export function getName(language: string | undefined, names: Name[] | undefined): string | undefined {
  if (!names || !language) return undefined;
  return names.find((name) => name.language.name == language)?.name;
}

export function getGenus(language: string | undefined, genera: Genera[] | undefined): string | undefined {
  if (!genera || !language) return undefined;
  return genera.find((genera) => genera.language.name == language)?.genus;
}

export function getAvailableVersions(languages: string[], dexEntries: FlavorTextEntry[] | undefined): string[] {
  if (!dexEntries || languages.length == 0) return [];
  let versionsByLanguage: { [language: string]: string[] } = {};
  for (let language of languages) {
    if (!dexEntries.find((entry) => entry.language.name === language)) return [];
    const versions = dexEntries.filter((entry) => entry.language.name === language).map((entry) => entry.version.name);
    versionsByLanguage[language] = versions;
  }
  const availableVersions = versionsByLanguage[languages[0]].slice();
  for (let version of versionsByLanguage[languages[0]]) {
    for (let language of languages) {
      if (!versionsByLanguage[language].includes(version)) {
        const index = availableVersions.indexOf(version);
        if (index > -1) {
          availableVersions.splice(index, 1);
        }
        break;
      }
    }
  }
  return availableVersions;
}

export function formatSpeciesNameToQuery(pokemon: string): string {
  return pokemon.replace(' ', '-');
}
