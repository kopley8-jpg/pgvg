import type { CoilSeriesType } from '@/entities/coils/model/types';
import { off, onValue, ref } from 'firebase/database';
import database from './client';

export const subscribeToCoils = (
  onUpdate: (coils: CoilSeriesType[]) => void
): (() => void) => {
  const coilsRef = ref(database, 'kochegar/platform/coils');

  const handler = onValue(coilsRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      onUpdate([]);
      return;
    }

    const coilSerieses: CoilSeriesType[] = Object.entries(data).map(
      ([key, value]: [string, any]) => ({
        id: key,
        ...(value as Omit<CoilSeriesType, 'id'>),
      })
    );

    onUpdate(coilSerieses);
  });

  return () => off(coilsRef, 'value', handler);
};

export const subscribeToCoilSeriesById = (
  id: string,
  onUpdate: (coils: CoilSeriesType | null) => void
) => {
  const coilRef = ref(database, `kochegar/platform/coils/${id}`);

  const handler = onValue(coilRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      onUpdate(null);
      return;
    }

    const { id: _, ...cleanData } = data;

    const coilSeries: CoilSeriesType = { ...cleanData, id: id };

    onUpdate(coilSeries);
  });

  return () => off(coilRef, 'value', handler);
};
