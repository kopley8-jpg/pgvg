import database from '@/shared/api/firebase/client';
import type { TankSeriesType } from '@/shared/types/tank-series';
import { push, ref } from 'firebase/database';

export const pushTankSeries = async (tank?: Omit<TankSeriesType, 'id'>) => {
  const tanksRef = ref(database, 'kochegar/platform/tanks');
  const newId = await push(tanksRef, tank ? tank : NEW_TANK_SERIES);
  return newId.key;
};

export const NEW_TANK_SERIES: Omit<TankSeriesType, 'id'> = {
  name: 'Новая серия танков',
  capacity: [1],
  compatibleCoilSerieses: [],
  photoURL: null,
};
