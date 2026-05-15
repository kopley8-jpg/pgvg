import type { CompatibleCoilSeriesesType } from '@/entities/tanks/model/types';

export interface ICoilSeriesCardModal {
  clickedCoilSeriesId: string | null;
  compatibleCoilSeries: CompatibleCoilSeriesesType;
  onClose: () => void;
}
