import type { PodSeriesType } from '@/entities/pods/model/types';

export interface ISeriesCard {
  podSeries: Omit<PodSeriesType, 'id'>;
  onChange: (newValue: Omit<PodSeriesType, 'id'>) => void;
  onSave?: () => void;
  onExit?: () => void;
}
