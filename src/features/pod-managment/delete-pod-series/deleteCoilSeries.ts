import database from '@/shared/api/firebase/client';
import { ref, remove } from 'firebase/database';

export const deletePodSeries = async (id: string) => {
  const podSeriesRef = ref(database, `kochegar/platform/pods/${id}`);
  await remove(podSeriesRef);
};
