import type { TankSeriesType } from '@/entities/tanks/model/types';
import { useEffect, useState } from 'react';
import type { ITankSeriesCardModal } from './types';
import { subscribeToTankSeriesById } from '@/shared/api/firebase/tanks';

export const useTankSeriesModal = (props: ITankSeriesCardModal) => {
  const { open, onClose, compatiblePlat } = props;
  const [tankSeries, setTankSeries] = useState<TankSeriesType | null>(null);

  useEffect(() => {
    const handler = (res: TankSeriesType | null) => {
      if (!res) {
        alert(`танк с таким ид не найден`);
        return;
      } else {
        setTankSeries(res);
      }
    };

    let unsubscribe = () => {};

    if (open) {
      unsubscribe = subscribeToTankSeriesById(
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
    tankSeries,
  };
};
