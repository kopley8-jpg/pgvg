import database from '@/shared/api/firebase/client';
import { ref, update } from 'firebase/database';

export const updatePodSeriesEntryById = async (
  podSeriesId: string,
  key: string,
  newValue: any
) => {
  const podSeriesRef = ref(database, `kochegar/platform/pods/${podSeriesId}`);
  await update(podSeriesRef, { [key]: newValue });
};
