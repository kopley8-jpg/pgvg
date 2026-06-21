import { updateDevice } from '@/features/device-managment/update-device/update-device';
import database from '@/shared/api/firebase/client';
import { getDevices } from '@/shared/api/firebase/devices';
import type { PlatformType } from '@/shared/types/device';
import type {
  CompactibleCoilSeriesesType,
  TankSeriesType,
} from '@/shared/types/tank-series';
import { push, ref, update } from 'firebase/database';

export const updateTankSeries = async <
  K extends keyof Omit<TankSeriesType, 'id'>,
>(
  id: string,
  key: K,
  value:
    | Omit<TankSeriesType, 'id'>[K]
    | ((tank: TankSeriesType) => Omit<TankSeriesType, 'id'>[K])
) => {
  const tankRef = ref(database, `kochegar/platform/tanks/${id}`);

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
            plat.idFromPlatforms === id && plat.type === 'tank'
              ? { ...plat, name: (value as string).toString() }
              : plat
          ),
        });
      })
    );
  }

  await update(tankRef, { [key]: value });
};

export const pushCompactibleCoilSeries = async (
  tankId: string,
  coil: CompactibleCoilSeriesesType
) => {
  const tankRef = ref(
    database,
    `kochegar/platform/tanks/${tankId}/compatibleCoilSerieses`
  );

  await push(tankRef, coil);
};
