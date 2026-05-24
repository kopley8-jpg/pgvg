import { off, onValue, ref } from 'firebase/database';
import database from './client';
import type { TankSeriesType } from '@/shared/types/tank-series';

export const subscribeToTanks = (
  onUpdate: (tanks: TankSeriesType[]) => void
): (() => void) => {
  const tanksRef = ref(database, 'kochegar/platform/tanks');

  const handler = onValue(tanksRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      onUpdate([]);
      return;
    }

    const tankSerieses: TankSeriesType[] = Object.entries(data).map(
      ([key, value]: [string, any]) => ({
        id: key,
        ...(value as Omit<TankSeriesType, 'id'>),
      })
    );

    onUpdate(tankSerieses);
  });

  return () => off(tanksRef, 'value', handler);
};

export const subscribeToTankSeriesById = (
  id: string,
  onUpdate: (tank: TankSeriesType | null) => void
) => {
  const tankRef = ref(database, `kochegar/platform/tanks/${id}`);

  const handler = onValue(tankRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      onUpdate(null);
      return;
    }

    const { id: _, ...cleanData } = data;

    const tankSeries: TankSeriesType = {
      ...cleanData,
      id: id,
      capacity: Array.isArray(data.capacity) ? data.capacity : [data.capacity],
    };

    onUpdate(tankSeries);
  });

  return () => off(tankRef, 'value', handler);
};
