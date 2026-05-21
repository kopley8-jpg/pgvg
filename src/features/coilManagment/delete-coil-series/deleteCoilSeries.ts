import database from '@/shared/api/firebase/client';
import { ref, remove } from 'firebase/database';

export const deleteCoilSeries = async (id: string) => {
  const coilSeriesRef = ref(database, `kochegar/platform/coils/${id}`);
  await remove(coilSeriesRef);
};
