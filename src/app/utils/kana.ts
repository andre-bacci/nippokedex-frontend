import { FuriganaPart } from '@app/types/text';

export function parseFurigana(
  kanjiText: string | undefined,
  kanaString: string | undefined,
  tryPreserveWhitespace: boolean,
): FuriganaPart[] {
  if (kanjiText === undefined || kanaString === undefined) return [];

  // Normalize whitespace by replacing any whitespace with single space and trim
  kanjiText = kanjiText.replace(/\s+/g, ' ').trim();
  kanaString = kanaString.replace(/\s+/g, ' ').trim();
  if (!tryPreserveWhitespace) {
    kanjiText = kanjiText.replace(/\s+/g, '').trim();
    kanaString = kanaString.replace(/\s+/g, '').trim();
  }

  let result: FuriganaPart[];
  try {
    const kanjiRegex = /[\u4e00-\u9faf\u3005]+|[^\u4e00-\u9faf\u3005]+/g;
    const tokens = kanjiText.match(kanjiRegex) || [];
    let currentKanaIndex = 0;
    result = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const isKanji = /^[\u4e00-\u9faf\u3005]+$/.test(token);

      if (isKanji) {
        let lookahead = i + 1;
        while (lookahead < tokens.length && /^[\u4e00-\u9faf\u3005]+$/.test(tokens[lookahead])) {
          lookahead++;
        }

        let kanaEnd = kanaString.length;
        if (lookahead < tokens.length) {
          const nextToken = tokens[lookahead];
          const remainingKana = kanaString.slice(currentKanaIndex);
          const matchPosition = remainingKana.indexOf(nextToken);

          if (matchPosition !== -1) {
            kanaEnd = currentKanaIndex + matchPosition;
          }
        }

        const kanaSegment = kanaString.substring(currentKanaIndex, kanaEnd);
        result.push({ kanji: token, kana: kanaSegment });
        currentKanaIndex = kanaEnd;
      } else {
        // Check available characters before processing
        const availableChars = kanaString.length - currentKanaIndex;
        if (availableChars < token.length) {
          throw new Error(
            `Kana string too short at position ${currentKanaIndex}. Needed ${token.length} chars for "${token}"`,
          );
        }

        const kanaSegment = kanaString.substring(currentKanaIndex, currentKanaIndex + token.length);
        result.push({ kanji: token, kana: kanaSegment });
        currentKanaIndex += token.length;
      }
    }

    // Add final verification with better error reporting
    if (currentKanaIndex !== kanaString.length) {
      const remaining = kanaString.slice(currentKanaIndex);
      const parsed = kanaString.slice(0, currentKanaIndex);
      throw new Error(
        `Kana mismatch: ${kanaString.length - currentKanaIndex} characters remaining\n` +
          `Parsed: "${parsed}"\nRemaining: "${remaining}"\n` +
          `Total characters parsed: ${currentKanaIndex}/${kanaString.length}`,
      );
    }
  } catch (e) {
    if (!tryPreserveWhitespace) throw e;
    result = parseFurigana(kanjiText, kanaString, false);
  }

  return result;
}
