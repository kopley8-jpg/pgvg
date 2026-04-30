// entities/pods/hooks/usePodSeriesValue.ts
import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import database from '@shared/api/firebase/client';
import type { PodSeriesType } from '../model/types';

export const usePodSeriesValue = (id: string | null) => {
  const [series, setSeries] = useState<PodSeriesType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setSeries(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const seriesRef = ref(database, `/kochegar/platform/pods/${id}`);

    const handler = (snapshot: any) => {
      const data = snapshot.val();

      if (!data) {
        setSeries(null);
        setError('Серия не найдена');
        setLoading(false);
        return;
      }

      setSeries({
        id,
        name: data.name,
        capacity: data.capacity || [],
        ohms: data.ohms || [],
      });
      setLoading(false);
    };

    onValue(seriesRef, handler);

    return () => off(seriesRef, 'value', handler);
  }, [id]);

  return { series, loading, error };
};
