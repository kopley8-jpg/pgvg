import { updateDevice } from '@/features/device-managment/update-device/update-device';
import database from '@/shared/api/firebase/client';
import { getDevices } from '@/shared/api/firebase/devices';
import type { PlatformType } from '@/shared/types/device';
import type { PodSeriesType } from '@/shared/types/pod-series';
import { ref, update } from 'firebase/database';

export const updatePodSeries = async <
  K extends keyof Omit<PodSeriesType, 'id'>,
>(
  id: string,
  key: K,
  value: Omit<PodSeriesType, 'id'>[K]
) => {
  const podRef = ref(database, `kochegar/platform/pods/${id}`);

  if (key === 'name') {
    const devices = await getDevices();
    const filtered = devices.filter(
      (device) =>
        device.platforms.type === 'магнит' &&
        device.platforms.compatiblePlats.some(
          (plat) => plat.idFromPlatforms === id
        )
    );
    Promise.all(
      filtered.map((device) => {
        const platforms = device.platforms as Extract<
          PlatformType,
          { type: 'магнит' }
        >;
        return updateDevice(device.id, 'platforms', {
          ...platforms,
          compatiblePlats: platforms.compatiblePlats.map((plat) =>
            plat.idFromPlatforms === id && plat.type === 'pod'
              ? { ...plat, name: (value as string).toString() }
              : plat
          ),
        });
      })
    );
  }

  await update(podRef, { [key]: value });
};
