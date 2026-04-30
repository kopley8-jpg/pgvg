import type { PodSeriesType } from '@/entities/pods/model/types';

export interface IPodSeriesCard {
  platform: { plat: PodSeriesType; type: 'pod' };
}
