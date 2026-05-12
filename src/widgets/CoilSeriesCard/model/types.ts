import type { CoilSeriesType } from '@/entities/coils/model/types';
import type React from 'react';

export interface ICoilSeriesCard {
  coilSeries: CoilSeriesType;
  headerRightRender: (() => React.ReactNode) | React.ReactNode;
}
