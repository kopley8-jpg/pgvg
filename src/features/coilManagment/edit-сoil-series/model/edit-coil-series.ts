import { updateTankSeries } from '@/features/tank-managment/update-tank-series/update-tank-series';
import database from '@/shared/api/firebase/client';
import { getTanks } from '@/shared/api/firebase/tanks';
import type { CoilSeriesType } from '@/shared/types/coil-series';
import { ref, update } from 'firebase/database';

export const updateCoilSeries = async <
  K extends keyof Omit<CoilSeriesType, 'id'>,
>(
  id: string,
  key: K,
  value: Omit<CoilSeriesType, 'id'>[K]
) => {
  const coilSeriesRef = ref(database, `kochegar/platform/coils/${id}`);

  if (key === 'name') {
    const tanks = await getTanks();
    const filtered = tanks.filter((tank) =>
      tank.compatibleCoilSerieses.some((coil) => coil.idFromPlatforms === id)
    );

    await Promise.all(
      filtered.map((tank) => {
        return updateTankSeries(
          tank.id,
          'compatibleCoilSerieses',
          tank.compatibleCoilSerieses.map((coil) =>
            coil.idFromPlatforms === id
              ? { ...coil, name: value.toString() }
              : coil
          )
        );
      })
    );
  }

  await update(coilSeriesRef, { [key]: value });
};
