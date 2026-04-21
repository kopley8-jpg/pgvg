import type { DeviceType } from '@/entities/devices/model/types';
import database from '@/shared/api/firebase/client';
import { ref, update } from 'firebase/database';

export const updateDeviceById = async (
  id: string,
  entryName: keyof DeviceType,
  value: any
) => {
  const deviceRef = ref(database, `/kochegar/devices/${id}`);
  await update(deviceRef, {
    [entryName]: value,
  });
};
