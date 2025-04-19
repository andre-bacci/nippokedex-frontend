import { FlavorTextEntry } from '../types/pokemonSpecies';

export function getDexEntry(
  language: string | undefined,
  version: string | undefined,
  dexEntries: FlavorTextEntry[] | undefined,
): string | undefined {
  if (!dexEntries || !version || !language) return undefined;
  return dexEntries
    .find((dexEntry) => dexEntry.language.name == language && dexEntry.version.name == version)
    ?.flavor_text.replace('\f', '');
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
