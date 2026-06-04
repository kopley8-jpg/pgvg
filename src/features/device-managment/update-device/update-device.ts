import database from '@/shared/api/firebase/client';
import { snapshotToDevice } from '@/shared/api/firebase/devices';
import type { CompactiblePlatType, DeviceType } from '@/shared/types/device';
import { get, push, ref, update } from 'firebase/database';

export const updateDevice = async <K extends keyof Omit<DeviceType, 'id'>>(
  id: string,
  key: K,
  value:
    | ((prev: DeviceType) => Omit<DeviceType, 'id'>[K])
    | Omit<DeviceType, 'id'>[K]
) => {
  const deviceRef = ref(database, `kochegar/devices/${id}`);

  if (typeof value === 'function') {
    const deviceSnapshot = await get(deviceRef);
    const deviceData = deviceSnapshot.val();
    const device = snapshotToDevice(id, deviceData);

    console.log('kit before update:', device.kit);
    console.log('newItem:', value(device));

    await update(deviceRef, { [key]: value(device) });
  } else {
    await update(deviceRef, { [key]: value });
  }
};

export const pushCompactiblePlat = async (
  deviceId: string,
  plat: CompactiblePlatType
) => {
  const platRef = ref(
    database,
    `kochegar/devices/${deviceId}/platforms/compatiblePlats`
  );

  alert(`kochegar/devices/${deviceId}/platforms/compatiblePlats`);

  await push(platRef, plat);
};
