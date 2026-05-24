import database from '@/shared/api/firebase/client';
import type { PodSeriesType } from '@/shared/types/pod-series';
import { ref, update } from 'firebase/database';

export const updatePodSeries = async <
  K extends keyof Omit<PodSeriesType, 'id'>,
>(
  id: string,
  key: K,
  value: Omit<PodSeriesType, 'id'>[K]
) => {
  const podRef = ref(database, `kochegar/platform/pods/${id}`);
  await update(podRef, { [key]: value });
  alert(id + key + value);
};
