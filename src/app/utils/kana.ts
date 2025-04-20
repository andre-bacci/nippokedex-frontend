import { FuriganaPart } from '@app/types/text';

export function parseFurigana(kanjiText: string | undefined, kanaString: string | undefined): FuriganaPart[] {
  if (kanjiText === undefined || kanaString === undefined) return [];
  kanjiText = kanjiText.replace(/\s+/g, ' ').trim();
  kanaString = kanaString.replace(/\s+/g, ' ').trim();

  // Split the kanji text into tokens of consecutive kanji or non-kanji characters
  const kanjiRegex = /[\u4e00-\u9faf\u3005]+|[^\u4e00-\u9faf\u3005]+/g;
  const tokens = kanjiText.match(kanjiRegex) || [];
  let currentKanaIndex = 0;
  const result: FuriganaPart[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    // Check if the token consists of kanji characters
    const isKanji = /^[\u4e00-\u9faf\u3005]+$/.test(token);

    if (isKanji) {
      // Find the next non-kanji token to determine kana bounds
      let nextNonKanjiIndex = i + 1;
      while (nextNonKanjiIndex < tokens.length && /^[\u4e00-\u9faf]+$/.test(tokens[nextNonKanjiIndex])) {
        nextNonKanjiIndex++;
      }

      let kanaEndIndex = kanaString.length;
      if (nextNonKanjiIndex < tokens.length) {
        const nextToken = tokens[nextNonKanjiIndex];
        kanaEndIndex = kanaString.indexOf(nextToken, currentKanaIndex);
        if (kanaEndIndex === -1) {
          throw new Error(`Kana mismatch: Could not find "${nextToken}" after position ${currentKanaIndex}`);
        }
      }

      const kana = kanaString.substring(currentKanaIndex, kanaEndIndex);
      result.push({ kanji: token, kana });
      currentKanaIndex = kanaEndIndex;
    } else {
      // Verify non-kanji token matches kana string exactly
      const kanaSlice = kanaString.substr(currentKanaIndex, token.length);
      if (kanaSlice !== token) {
        throw new Error(`Kana mismatch: Expected "${token}" but found "${kanaSlice}"`);
      }
      result.push({ kanji: token, kana: token });
      currentKanaIndex += token.length;
    }
  }

  // Verify entire kana string was consumed
  if (currentKanaIndex !== kanaString.length) {
    throw new Error(`Kana string was not fully parsed. Remaining: "${kanaString.slice(currentKanaIndex)}"`);
  }

  return result;
}
