import type { PodSeriesType } from '@/entities/pods/model/types';
import database from '@/shared/api/firebase/client';
import { ref, update } from 'firebase/database';
import type { IUpdatePodSeriesEntryById } from './updatePods.types';

export const updatePodSeriesEntryById = async <K extends keyof PodSeriesType>({
  id,
  entryName,
  newValue,
}: IUpdatePodSeriesEntryById<K>) => {
  const podSeriesRef = ref(database, `/kochegar/platform/pods/${id}`);

  alert(`id:${id}, entryName:${entryName}, newValue:${newValue}`);

  await update(podSeriesRef, {
    [entryName]: newValue,
  });
};
