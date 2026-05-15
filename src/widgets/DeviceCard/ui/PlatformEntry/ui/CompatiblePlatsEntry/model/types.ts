import type {
  CompactiblePlatType,
  DeviceType,
} from '@/entities/devices/model/types';

export interface ICompactiblePlatsEntry {
  deviceId: string;
  compactiblePlats: CompactiblePlatType[] | null;
  onChange: (plats: CompactiblePlatType[]) => void;
}
