import { useEffect, useState } from 'react';
import type { ICompatiblePlatPicker } from './types';
import type { CoilSeriesType } from '@/shared/types/coil-series';
import { pushCoilSeries, subscribeToCoils } from '@/shared/api/firebase/coils';
import type { CompactibleCoilSeriesesType } from '@/shared/types/tank-series';

export const useCompatibleCoilPicker = (props: ICompatiblePlatPicker) => {
  const { onClose, onPick } = props;
  const [loading, setLoading] = useState(false);
  const [coils, setCoils] = useState<CoilSeriesType[]>([]);
  const [coilToShow, setCoilToShow] = useState<CoilSeriesType | null>(null);
  const [newCoilId, setNewCoilId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    let unsubscribe = () => {};

    unsubscribe = subscribeToCoils((coils) => {
      setCoils(coils);
    });

    if (newCoilId) {
      const newCoil = coils.find((coil) => coil.id === newCoilId);
      setCoilToShow(newCoil ? newCoil : null);
    }

    return () => {
      unsubscribe();
    };
  }, [newCoilId]);

  const uiHandler = {
    createCoilButton: {
      onClick: async () => {
        let newId = await pushCoilSeries();
        setNewCoilId(newId);
      },
    },
    coilItem: (coil: CoilSeriesType) => {
      return {
        onClick: () => {
          setCoilToShow(coil);
        },
      };
    },
    seriesCardDialog: {
      menuProps: {
        onClose: () => {
          setCoilToShow(null);
        },
      },
      onAdd: (coil: CoilSeriesType) => {
        onPick({ name: coil.name, idFromPlatforms: coil.id });
        setCoilToShow(null);
        onClose();
      },
    },
  };

  return {
    coils,
    uiHandler,
    coilToShow,
    newCoilId,
  };
};
