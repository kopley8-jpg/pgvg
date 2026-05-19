import database from '@/shared/api/firebase/client';
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
  await update(coilSeriesRef, { [key]: value });
};
