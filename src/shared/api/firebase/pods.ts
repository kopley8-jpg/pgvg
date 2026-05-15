import type { PodSeriesType } from '@/entities/pods/model/types';
import database from './client';
import { off, onValue, ref } from 'firebase/database';

export const subscribeToPodSeriesById = (
  id: string,
  onUpdate: (coils: PodSeriesType | null) => void
) => {
  const podsRef = ref(database, `kochegar/platform/pods/${id}`);

  const handler = onValue(podsRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      onUpdate(null);
      return;
    }

    const { id: _, ...cleanData } = data;

    const coilSeries: PodSeriesType = { ...cleanData, id: id };

    onUpdate(coilSeries);
  });

  return () => off(podsRef, 'value', handler);
};
