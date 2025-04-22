import { VersionResponse } from '@app/types/response/version';

export interface VersionGroupResponse {
  name: string;
  url: URL;
}

export interface VersionGroupDetailResponse {
  id: number;
  name: string;
  versions: VersionResponse[];
}
