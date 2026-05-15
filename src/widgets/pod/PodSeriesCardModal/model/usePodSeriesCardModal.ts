import { useEffect, useState } from 'react';
import type { IPodSeriesCardModal } from './types';
import type { PodSeriesType } from '@/entities/pods/model/types';
import { subscribeToPodSeriesById } from '@/shared/api/firebase/pods';

export const usePodSeriesCardModal = (props: IPodSeriesCardModal) => {
  const { compatiblePlat, open } = props;

  const [podSeries, setPodSeries] = useState<PodSeriesType | null>(null);

  useEffect(() => {
    const handler = (res: PodSeriesType | null) => {
      if (!res) {
        alert(`танк с таким ид не найден`);
        return;
      } else {
        setPodSeries(res);
      }
    };

    let unsubscribe = () => {};

    if (open) {
      unsubscribe = subscribeToPodSeriesById(
        compatiblePlat.idFromPlatforms,
        handler
      );
    } else {
      return;
    }

    return () => {
      unsubscribe();
    };
  }, [open]);

  return {
    podSeries,
  };
};
