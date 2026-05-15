import type { CompactiblePlatType } from '@/entities/devices/model/types';

export interface ITankSeriesCardModal {
  compatiblePlat: CompactiblePlatType;
  open: boolean;
  onClose: () => void;
}
