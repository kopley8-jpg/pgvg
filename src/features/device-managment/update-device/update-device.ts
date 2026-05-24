import database from '@/shared/api/firebase/client';
import type { DeviceType } from '@/shared/types/device';
import { ref, update } from 'firebase/database';

export const updateDevice = async <K extends keyof Omit<DeviceType, 'id'>>(
  id: string,
  key: K,
  value: Omit<DeviceType, 'id'>[K]
) => {
  const deviceRef = ref(database, `kochegar/devices/${id}`);
  await update(deviceRef, { [key]: value });
};
