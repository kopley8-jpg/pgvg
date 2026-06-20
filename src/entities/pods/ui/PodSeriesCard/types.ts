import type { colors } from '@/shared/constants/colors';
import type { PodSeriesType } from '@/shared/types/pod-series';

export interface IPodSeriesCard {
  podSeries: PodSeriesType | string;
  colors: typeof colors.light;
  renderInHeader?: React.ReactNode;
  onDelete: () => void;
  onChange: <K extends keyof Omit<PodSeriesType, 'id'>>(
    key: K,
    value: Omit<PodSeriesType, 'id'>[K]
  ) => void;
  onError?: (err: string) => void;
  onPhotoAccept?: (file: File) => void;
}
