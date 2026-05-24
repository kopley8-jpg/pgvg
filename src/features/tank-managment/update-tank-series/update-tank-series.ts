import database from '@/shared/api/firebase/client';
import type {
  CompactibleCoilSeriesesType,
  TankSeriesType,
} from '@/shared/types/tank-series';
import { get, push, ref, update } from 'firebase/database';

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
