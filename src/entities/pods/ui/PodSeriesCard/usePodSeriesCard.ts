import { useEffect, useState } from 'react';
import type { IPodSeriesCard } from './types';
import type { PodSeriesType } from '@/shared/types/pod-series';
import { subscribeToPodSeriesById } from '@/shared/api/firebase/pods';
import { convertToNumber } from '@/shared/lib/convertToNumber';

export const usePodSeriesCard = (props: IPodSeriesCard) => {
  const { podSeries: inPodSeries, onChange, onDelete, onError } = props;

  const [podSeries, setPodSeries] = useState<PodSeriesType | null>(null);
  const [loading, setLoading] = useState(typeof inPodSeries === 'string');

  useEffect(() => {
    if (typeof inPodSeries === 'object') {
      setPodSeries(inPodSeries);
      return;
    }

    const unsubscribe = subscribeToPodSeriesById(inPodSeries, (coil) => {
      setPodSeries(coil);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleArrayPrimitChange = (key: 'capacity' | 'ohms') => {
    return {
      onChangesSaved: (newValue: (string | number)[]) => {
        const normalize = newValue.map((val) => Number(convertToNumber(val)));
        if (!normalize.every((val) => !isNaN(val))) {
          onError?.('все значения должны быть числами');
          return;
        } else {
          onChange(key, normalize);
        }
      },
    };
  };

  const uiHandler = {
    name: {
      onSaveButtonPress: (newValue: string | number) => {
        onChange('name', newValue.toString());
      },
    },
    capacityAndOhms: (key: 'ohms' | 'capacity') => {
      return {
        ...handleArrayPrimitChange(key),
      };
    },
    menu: {
      onClick: () => onDelete(),
    },
  };

  return {
    podSeries,
    loading,
    uiHandler,
  };
};
