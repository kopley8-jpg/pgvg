import type { PodSeriesType } from '@/entities/pods/model/types';
import database from '@/shared/api/firebase/client';
import { push, ref } from 'firebase/database';

export const addPodSeries = async (podSeries: Omit<PodSeriesType, 'id'>) => {
  const podSeriesesRef = ref(database, 'kochegar/platform/pods');
  await push(podSeriesesRef, podSeries);
};
