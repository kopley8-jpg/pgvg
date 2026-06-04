import type { PodSeriesType } from '@/shared/types/pod-series';
import database from './client';
import { off, onValue, ref } from 'firebase/database';

export const subscribeToPodSeriesById = (
  id: string,
  onUpdate: (coils: PodSeriesType) => void
) => {
  const podsRef = ref(database, `kochegar/platform/pods/${id}`);

  const handler = onValue(podsRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      return;
    }

    const { id: _, ...cleanData } = data;

    const coilSeries: PodSeriesType = { ...cleanData, id: id };

    onUpdate(coilSeries);
  });

  return () => off(podsRef, 'value', handler);
};

export const subscribeToPods = (
  onUpdate: (pods: PodSeriesType[]) => void,
  onError?: (error: string) => void
): (() => void) => {
  const podsRef = ref(database, 'kochegar/platform/pods');

  const handler = onValue(podsRef, (snapshot) => {
    try {
      const data = snapshot.val();
      if (!data) {
        onUpdate([]);
        return;
      }

      const pods: PodSeriesType[] = Object.entries(data).map(
        ([key, value]: [string, any]) => ({
          id: key,
          ...(value as Omit<PodSeriesType, 'id'>),
        })
      );

      onUpdate(pods);
    } catch (error) {
      onError?.('не удалось загрузить картриджи');
    }
  });

  return () => {
    off(podsRef, 'value', handler);
  };
};
