import type { CoilSeriesType } from '@/entities/coils/model/types';
import { off, onValue, ref } from 'firebase/database';
import database from './client';
import type { TankSeriesType } from '@/entities/tanks/model/types';

// export const subscribeToTanks = (
//   onUpdate: (coils: CoilSeriesType[]) => void
// ): (() => void) => {
//   const coilsRef = ref(database, 'kochegar/platform/coils');

//   const handler = onValue(coilsRef, (snapshot) => {
//     const data = snapshot.val();
//     if (!data) {
//       onUpdate([]);
//       return;
//     }

//     const coilSerieses: CoilSeriesType[] = Object.entries(data).map(
//       ([key, value]: [string, any]) => ({
//         id: key,
//         ...(value as Omit<CoilSeriesType, 'id'>),
//       })
//     );

//     onUpdate(coilSerieses);
//   });

//   return () => off(coilsRef, 'value', handler);
// };

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
