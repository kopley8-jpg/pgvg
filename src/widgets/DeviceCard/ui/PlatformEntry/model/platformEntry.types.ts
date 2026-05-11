import type { PlatformType } from '@/entities/devices/model/types';

export interface IPlatformEntry {
  platform: PlatformType;
  deviceId: string;
  onChange: (newValue: PlatformType) => void;
}

export const PLATFORM_TYPES = [
  '510',
  'boro',
  'dot',
  'squonk',
  'магнит',
] as const;
