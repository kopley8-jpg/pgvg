import type { CoilSeriesType } from '@/entities/coils/model/types';

export interface IAddCompatibleCoilMenu {
  open: boolean;
  anchorEl: Element | undefined;
  onClose: () => void;
  onPick: (newCoil: CoilSeriesType) => void;
}
