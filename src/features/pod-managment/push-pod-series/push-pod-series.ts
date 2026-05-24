import database from '@/shared/api/firebase/client';
import type { PodSeriesType } from '@/shared/types/pod-series';
import { push, ref } from 'firebase/database';

export const pushPodSeries = async (pod?: Omit<PodSeriesType, 'id'>) => {
  const podsRef = ref(database, 'kochegar/platform/pods');
  const newId = await push(podsRef, pod ? pod : NEW_POD_SERIES);
  return newId.key;
};

export const NEW_POD_SERIES: Omit<PodSeriesType, 'id'> = {
  name: 'Новая серия картриджей',
  capacity: [1],
  ohms: [1],
};
