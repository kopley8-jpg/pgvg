import type { PodSeriesType } from '@/shared/types/pod-series';
import database from './client';
import { off, onValue, ref } from 'firebase/database';

export const subscribeToPodSeriesById = (
  id: string,
  onUpdate: (podSeries: PodSeriesType) => void
) => {
  const podsRef = ref(database, `kochegar/platform/pods/${id}`);

  const handler = onValue(podsRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      return;
    }

    const podSeries = snapshotToPod(data, id);

    onUpdate(podSeries);
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
        ([key, value]: [string, any]) => snapshotToPod(value, key)
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

const snapshotToPod = (value: any, key: string): PodSeriesType => {
  return {
    id: key,
    name: value.name ?? 'неизвестный под',
    photoURL: value.photoURL ?? null,
    capacity:
      typeof value.capacity === 'object'
        ? Object.values(value.capacity ?? {})
        : typeof value.capacity === 'number'
          ? [value.capacity]
          : [],
    ohms:
      typeof value.ohms === 'object'
        ? Object.values(value.ohms ?? {})
        : typeof value.ohms === 'number'
          ? [value.ohms]
          : [],
  };
};
