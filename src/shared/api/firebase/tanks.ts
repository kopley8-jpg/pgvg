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
      ([key, value]: [string, any]) => snapshotToTank(key, value)
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
    ([key, value]: [string, any]) => snapshotToTank(key, value)
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

    const tankSeries: TankSeriesType = snapshotToTank(id, data);

    onUpdate(tankSeries);
  });

  return () => off(tankRef, 'value', handler);
};

const snapshotToTank = (key: string, data: any): TankSeriesType => {
  return {
    id: key,
    name: data.name ?? 'неизвестный танк',
    capacity:
      typeof data.capacity === 'object'
        ? Object.values(data.capacity ?? {})
        : [data.capacity],
    compatibleCoilSerieses: Object.values(data.compatibleCoilSerieses ?? {}),
  };
};
