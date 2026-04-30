import type { BATTERY_FORMATS } from '@/entities/devices/model/types';
import type { IBatteryEntry } from './batteryEntry.types';

export const useBatteryEntry = ({ battery, onChange }: IBatteryEntry) => {
  return {
    handleDropDownPicked: (picked: 'встроенный' | 'сменный' | undefined) => {
      if (battery && picked === battery.type) return;
      else {
        onChange({ type: picked });
      }
    },
    handleFormatPicked: (
      format: (typeof BATTERY_FORMATS)[number] | undefined
    ) => {
      if (battery?.type === 'сменный' && battery.format === format) return;

      onChange({ type: 'сменный', format });
    },
    handleCapacityChanged: (newVal: number | string) => {
      onChange({ type: 'встроенный', capacity: Number(newVal) });
    },
    handleCapacityErrorTextClick: () => {
      onChange({ type: 'встроенный', capacity: 10 });
    },
  };
};
