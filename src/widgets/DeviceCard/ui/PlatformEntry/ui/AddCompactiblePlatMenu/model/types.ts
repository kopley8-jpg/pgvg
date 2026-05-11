import type { PodSeriesType } from '@/entities/pods/model/types';
import type { TankSeriesType } from '@/entities/tanks/model/types';

export interface IAddCompactiblePlatMenu {
  onPick: (
    series:
      | { type: 'pod'; series: PodSeriesType }
      | { type: 'tank'; series: TankSeriesType }
  ) => void;
}
