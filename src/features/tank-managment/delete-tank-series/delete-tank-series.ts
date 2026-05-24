import database from '@/shared/api/firebase/client';
import { ref, remove } from 'firebase/database';

export const deleteTankSeries = async (id: string) => {
  const tankRef = ref(database, `kochegar/platform/tanks/${id}`);
  await remove(tankRef);
};
