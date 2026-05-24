import type { CompactibleCoilSeriesesType } from '@/shared/types/tank-series';

export interface ICompatiblePlatPicker {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onPick: (coil: CompactibleCoilSeriesesType) => void;
}
