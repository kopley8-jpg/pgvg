import type { CoilSeriesType } from '@/entities/coils/model/types';
import type { CompatibleCoilSeriesesType } from '@/entities/tanks/model/types';

export interface IAddCompatibleCoilMenu {
  open: boolean;
  anchorEl: Element | undefined;
  onClose: () => void;
  onPick: (newCoil: CompatibleCoilSeriesesType) => void;
}
