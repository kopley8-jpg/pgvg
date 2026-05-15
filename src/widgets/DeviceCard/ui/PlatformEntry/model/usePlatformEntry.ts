import type { BATTERY_FORMATS } from '@/entities/devices/model/types';
import type { IPlatformEntry, PLATFORM_TYPES } from './platformEntry.types';

export const usePlatformEntry = ({ platform, onChange }: IPlatformEntry) => {
  return {
    handlePlatformTypeChanged: (
      picked: (typeof PLATFORM_TYPES)[number] | undefined
    ) => {
      if (picked === platform.type) return;
      onChange(
        picked === 'магнит'
          ? { type: 'магнит', compatiblePlats: [] }
          : { type: picked ? picked : null }
      );
    },
  };
};
