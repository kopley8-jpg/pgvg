import { off, onValue, push, ref } from 'firebase/database';
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
          name: value.name ?? 'Неизвестный испарик',
          ohms: Object.values(value.ohms ?? {}),
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
  onUpdate: (coils: CoilSeriesType) => void
) => {
  const coilRef = ref(database, `kochegar/platform/coils/${id}`);

  const handler = onValue(coilRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      return;
    }

    const { id: _, ...cleanData } = data;

    const coilSeries: CoilSeriesType = { ...cleanData, id: id };

    onUpdate(coilSeries);
  });

  return () => off(coilRef, 'value', handler);
};

export const pushCoilSeries = async (
  coilSeries?: Omit<CoilSeriesType, 'id'>
) => {
  const coilsRef = ref(database, 'kochegar/platform/coils');

  const newRef = await push(
    coilsRef,
    coilSeries ? coilSeries : NEW_COIL_SERIES
  );
  return newRef.key;
};

export const NEW_COIL_SERIES: Omit<CoilSeriesType, 'id'> = {
  name: 'Новая серия испариков',
  ohms: [1],
};
