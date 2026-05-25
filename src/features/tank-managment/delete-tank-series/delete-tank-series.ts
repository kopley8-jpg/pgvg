import { updateDevice } from '@/features/device-managment/update-device/update-device';
import database from '@/shared/api/firebase/client';
import { getDevices } from '@/shared/api/firebase/devices';
import type { PlatformType } from '@/shared/types/device';
import { ref, remove } from 'firebase/database';

export const deleteTankSeries = async (id: string) => {
  const tankSeriesRef = ref(database, `kochegar/platform/tanks/${id}`);

  const devices = await getDevices();
  alert(devices.length);

  await Promise.all(
    devices
      .filter(
        (device) =>
          device.platforms.type === 'магнит' &&
          device.platforms.compatiblePlats?.some(
            (plat) => plat.idFromPlatforms === id
          )
      )
      .map((device) => {
        const platforms = device.platforms as Extract<
          PlatformType,
          { type: 'магнит' }
        >;
        return updateDevice(id, 'platforms', {
          ...platforms,
          compatiblePlats: platforms.compatiblePlats?.filter(
            (plat) => plat.idFromPlatforms !== id
          ),
        });
      })
  );

  await remove(tankSeriesRef);
};
