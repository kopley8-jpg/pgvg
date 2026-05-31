import type { CoilSeriesType } from '@/shared/types/coil-series';
import type { PodSeriesType } from '@/shared/types/pod-series';
import type { TankSeriesType } from '@/shared/types/tank-series';
import type { PopoverProps } from '@mui/material';

type DisplayedItems =
  | ['pods']
  | ['tanks']
  | ['coils']
  | ['pods', 'tanks']
  | ['pods', 'coils']
  | ['tanks', 'coils']
  | ['pods', 'tanks', 'coils'];

export interface IPlatformPicker {
  open: boolean;
  onClose?: () => void;
  anchorEl: HTMLElement | null;
  showedPlatforms: DisplayedItems;
  onPick?: (item: SeriesItem) => void;
}

export type SeriesItem =
  | (PodSeriesType & { type: 'pod' })
  | (TankSeriesType & { type: 'tank' })
  | (CoilSeriesType & { type: 'coil' });
