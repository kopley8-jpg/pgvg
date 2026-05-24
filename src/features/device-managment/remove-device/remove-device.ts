import database from '@/shared/api/firebase/client';
import { ref, remove } from 'firebase/database';

export const removeDevice = async (id: string) => {
  const deviceRef = ref(database, `kochegar/devices/${id}`);
  await remove(deviceRef);
};
