import { off, onValue, push, ref } from 'firebase/database';
import database from './client';
import type { DeviceType } from '@/shared/types/device';

const devicePath = 'kochegar/devices';
const devicePathId = (id: string) => `kochegar/devices/${id}`;

export const subscribeToDevices = (
  onUpdate: (devices: DeviceType[]) => void,
  onError?: (error: string) => void
): (() => void) => {
  const devicesRef = ref(database, devicePath);

  const handler = onValue(devicesRef, (snapshot) => {
    try {
      const data = snapshot.val();
      if (!data) {
        onUpdate([]);
        return;
      }

      const devices: DeviceType[] = Object.entries(data).map(
        ([key, value]: [string, any]) => ({
          id: key,
          ...(value as Omit<DeviceType, 'id'>),
        })
      );

      onUpdate(devices);
    } catch (error) {
      onError?.('не удалось загрузить девайсы');
    }
  });

  return () => off(devicesRef, 'value', handler);
};

export const subscribeToDeviceById = (
  id: string,
  onUpdate: (coils: DeviceType | null) => void
) => {
  const deviceRef = ref(database, devicePathId(id));

  const handler = onValue(deviceRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      onUpdate(null);
      return;
    }

    const { id: _, ...cleanData } = data;

    const device: DeviceType = { ...cleanData, id: id };

    onUpdate(device);
  });

  return () => off(deviceRef, 'value', handler);
};

export const pushDevice = async (
  device: Omit<DeviceType, 'id'>
): Promise<string | null> => {
  const devicesRef = ref(database, 'kochegar/devices');

  return await push(devicesRef, device).key;
};
