import type { CompatibleCoilSeriesesType } from '@/entities/tanks/model/types';

export interface ICoilSeriesCardModal {
  open: boolean;
  coilSeriesId: string | null;
  onClose: () => void;
}
