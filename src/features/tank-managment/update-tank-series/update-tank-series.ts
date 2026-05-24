import database from '@/shared/api/firebase/client';
import type { TankSeriesType } from '@/shared/types/tank-series';
import { ref, update } from 'firebase/database';

export const updateTankSeries = async <
  K extends keyof Omit<TankSeriesType, 'id'>,
>(
  id: string,
  key: K,
  value: Omit<TankSeriesType, 'id'>[K]
) => {
  const tanksRef = ref(database, `kochegar/platform/tanks/${id}`);
  await update(tanksRef, { [key]: value });
};
