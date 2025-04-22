import { Name } from '@app/types/response/name';
import { VersionGroupResponse } from '@app/types/response/versionGroup';

export interface VersionResponse {
  name: string;
  url: URL;
}

export interface VersionDetailResponse {
  id: number;
  name: string;
  names: Name[];
  version_group: VersionGroupResponse;
}
