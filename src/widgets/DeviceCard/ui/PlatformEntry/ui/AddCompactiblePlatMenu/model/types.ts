import type { PodSeriesType } from '@/entities/pods/model/types';
import type { TankSeriesType } from '@/entities/tanks/model/types';

export interface IAddCompactiblePlatMenu {
  onPick: (value: PodSeriesType | TankSeriesType) => void;
}
