import type { BatteryType } from '@/entities/devices/model/types';

export interface IBatteryEntry {
  battery: BatteryType | null;
  onChange: (newValue: BatteryType) => void;
}
