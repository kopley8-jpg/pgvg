import type { BatteryType } from '@/entities/devices/model/types';

export interface IBatteryEntry {
  battery?: BatteryType;
  onChange: (newValue: BatteryType) => void;
}
