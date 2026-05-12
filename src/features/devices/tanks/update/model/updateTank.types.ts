import type { TankSeriesType } from '@/entities/tanks/model/types';

export interface IUpdateTankSeriesEntryById<K extends keyof TankSeriesType> {
  id: number | string;
  entryName: K;
  newValue: TankSeriesType[K];
}
