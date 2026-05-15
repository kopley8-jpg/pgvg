import type { CompactiblePlatType } from '@/entities/devices/model/types';

export interface IPodSeriesCardModal {
  open: boolean;
  onClose: () => void;
  compatiblePlat: CompactiblePlatType;
}
