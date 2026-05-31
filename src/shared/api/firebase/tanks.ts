import { get, off, onValue, ref } from 'firebase/database';
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
        name: value.name,
        capacity:
          typeof value.capacity === 'object'
            ? Object.values(value.capacity ?? {})
            : [value.capacity],
        compatibleCoilSerieses: Object.values(
          value.compatibleCoilSerieses ?? {}
        ),
      })
    );
    console.log(tankSerieses);
    onUpdate(tankSerieses);
  });

  return () => off(tanksRef, 'value', handler);
};

export const getTanks = async () => {
  const tanksRef = ref(database, 'kochegar/platform/tanks');

  const snapshot = await get(tanksRef);
  const data = snapshot.val();
  if (!data) return [];

  const tanks: TankSeriesType[] = Object.entries(data).map(
    ([key, value]: [string, any]) => ({
      id: key,
      name: value.name,
      capacity:
        typeof value.capacity === 'object'
          ? Object.values(value.capacity ?? [])
          : [value.capacity],
      compatibleCoilSerieses: Object.values(value.compatibleCoilSerieses ?? []),
    })
  );

  return tanks;
};

export const subscribeToTankSeriesById = (
  id: string,
  onUpdate: (tank: TankSeriesType) => void
) => {
  const tankRef = ref(database, `kochegar/platform/tanks/${id}`);

  const handler = onValue(tankRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
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

const rtdbToArray = <T extends object>(data: T) => {
  return Object(data).entries.map(([_key, value]: [string, any]) => value);
};
