import type { PodSeriesType } from '@/entities/pods/model/types';

export interface IUpdatePodSeriesEntryById<K extends keyof PodSeriesType> {
  id: number | string;
  entryName: K;
  newValue: PodSeriesType[K];
}
