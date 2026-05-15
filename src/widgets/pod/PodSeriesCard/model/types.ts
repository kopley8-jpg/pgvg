import type { PodSeriesType } from '@/entities/pods/model/types';
import type React from 'react';

export interface IPodSeriesCard {
  podSeries: PodSeriesType;
  headerRightRender: (() => React.ReactNode) | React.ReactNode;
}
