import { Type } from '@app/types/pokemon';
import { FuriganaPart } from '@app/types/text';

export interface DexEntry {
  name?: string;
  genus?: string;
  description?: string;
  description_kana?: string;
  furigana_text?: FuriganaPart[];
  types?: Type[];
}
