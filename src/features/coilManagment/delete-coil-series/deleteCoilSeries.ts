import { updateTankSeries } from '@/features/tank-managment/update-tank-series/update-tank-series';
import database from '@/shared/api/firebase/client';
import { getTanks } from '@/shared/api/firebase/tanks';
import { ref, remove } from 'firebase/database';

export const deleteCoilSeries = async (id: string) => {
  const coilSeriesRef = ref(database, `kochegar/platform/coils/${id}`);

  const tanks = await getTanks();
  const filtered = tanks.filter((tank) =>
    tank.compatibleCoilSerieses.some((coil) => coil.idFromPlatforms === id)
  );

  await Promise.all(
    filtered.map((tank) => {
      return updateTankSeries(
        tank.id,
        'compatibleCoilSerieses',
        tank.compatibleCoilSerieses.filter(
          (coil) => coil.idFromPlatforms !== id
        )
      );
    })
  );

  await remove(coilSeriesRef);
};
