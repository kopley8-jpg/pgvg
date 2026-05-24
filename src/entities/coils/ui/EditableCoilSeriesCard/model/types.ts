import type { colors } from '@/shared/constants/colors';
import type { CoilSeriesType } from '@/shared/types/coil-series';

export interface ICoilSeriesCard {
  coilSeries: CoilSeriesType | string;
  renderInHeader?: React.ReactNode;
  onChange: <K extends keyof Omit<CoilSeriesType, 'id'>>(
    entryName: K,
    value: CoilSeriesType[K]
  ) => void;
  onMenuItemClick: (item: 'delete') => void;
  onError?: (error: Error) => void;
  colors: typeof colors.light;
}
