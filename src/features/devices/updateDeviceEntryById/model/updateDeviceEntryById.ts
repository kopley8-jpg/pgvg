import type { DeviceType, PlatformType } from '@/entities/devices/model/types';
import database from '@/shared/api/firebase/client';
import { ref, update } from 'firebase/database';

export const updateDeviceById = async <K extends keyof DeviceType>(
  id: string,
  entryName: K,
  value: DeviceType[K]
) => {
  const deviceRef = ref(database, `/kochegar/devices/${id}`);
  await update(deviceRef, {
    [entryName]: value,
  });
};
