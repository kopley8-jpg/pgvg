import type { TankSeriesType } from '@/entities/tanks/model/types';
import type React from 'react';

export interface ITankSeriesCard {
  tankSeries: TankSeriesType;
  headerRightRender: (() => React.ReactNode) | React.ReactNode;
}
