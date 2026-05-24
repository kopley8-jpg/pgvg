import type { CompactiblePlatType } from '@/shared/types/device';

export interface ICompatiblePlatPicker {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onPick: (plat: CompactiblePlatType) => void;
}
