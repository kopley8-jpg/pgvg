import {
  off,
  onValue,
  push,
  ref,
  update,
  type DatabaseReference,
} from 'firebase/database';
import database from './client';
import type { CoilSeriesType } from '@/shared/types/coil-series';

export const subscribeToCoils = (
  onUpdate: (coils: CoilSeriesType[]) => void,
  onError?: (error: string) => void
): (() => void) => {
  const coilsRef = ref(database, 'kochegar/platform/coils');

  const handler = onValue(coilsRef, (snapshot) => {
    try {
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
    } catch (error) {
      onError?.('не удалось загрузить испарики');
    }
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

export const pushCoilSeries = async (
  coilSeries: Omit<CoilSeriesType, 'id'>
): Promise<string | null> => {
  const coilsRef = ref(database, 'kochegar/platform/coils');

  try {
    const newRef = await push(coilsRef, coilSeries);
    if (!newRef.key) {
      throw new Error(`Failed to generate unique key for coil series`);
    }
    return newRef.key;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
