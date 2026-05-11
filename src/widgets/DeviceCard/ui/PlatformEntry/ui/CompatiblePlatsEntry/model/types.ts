import type { DeviceType } from '@/entities/devices/model/types';

export interface ICompactiblePlatsEntry {
  deviceId: string;
  compactiblePlats: compactiblePlat[] | null;
  onChange: (plats: compactiblePlat[]) => void;
}

export type compactiblePlat = {
  type: 'pod' | 'tank';
  name: string;
  idFromPlatforms: string;
};
