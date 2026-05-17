import { useEffect, useState } from 'react';
import type { IAddCompatibleCoilMenu } from './types';
import type { CoilSeriesType } from '@/entities/coils/model/types';
import { subscribeToCoils } from '@/shared/api/firebase/coils';

export const useAddCompatibleCoilMenu = (props: IAddCompatibleCoilMenu) => {
  const { open, onPick, onClose } = props;

  const [coilSerieses, setCoilSerieses] = useState<CoilSeriesType[]>([]);

  useEffect(() => {
    const handler = (res: CoilSeriesType[]) => {
      if (!res) {
        alert(`танк с таким ид не найден`);
        return;
      } else {
        setCoilSerieses(res);
      }
    };

    let unsubscribe = () => {};

    if (open) {
      unsubscribe = subscribeToCoils(handler);
    } else {
      return;
    }

    return () => {
      unsubscribe();
    };
  }, [open]);

  const handler = {
    coilItem: {
      onPick: (coilSeries: CoilSeriesType) => {
        onPick({ name: coilSeries.name, idFromPlatforms: coilSeries.id });
        onClose();
      },
    },
  };

  return {
    coilSerieses,
    handler,
  };
};
