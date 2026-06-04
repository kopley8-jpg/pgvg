import { useEffect, useState } from 'react';
import type { ITankSeriesCard } from './types';
import type {
  CompactibleCoilSeriesesType,
  TankSeriesType,
} from '@/shared/types/tank-series';
import { subscribeToTankSeriesById } from '@/shared/api/firebase/tanks';

export const useTankSeriesCard = (props: ITankSeriesCard) => {
  const {
    tankSeries: inTankSeries,
    onChange,
    onError,
    onCoilAdd,
    onCoilItemClick,
    onDelete,
  } = props;

  const [tankSeries, setTankSeries] = useState<TankSeriesType | null>(null);
  const [loading, setLoading] = useState(typeof inTankSeries === 'string');

  useEffect(() => {
    if (typeof inTankSeries === 'object') {
      alert('обновляем');
      setTankSeries(inTankSeries);
      return;
    }

    const unsubscribe = subscribeToTankSeriesById(inTankSeries, (tank) => {
      setTankSeries(tank);
      setLoading(false);
    });

    return unsubscribe;
  }, [inTankSeries]);

  const uiHandler = {
    name: {
      onSaveButtonPress: (newValue: string | number) => {
        onChange('name', newValue.toString());
      },
    },
    menu: {
      onClick: () => onDelete(),
    },
    capacity: {
      onChangesSaved: (newValue: (string | number)[]) => {
        const normalize = newValue.map((val) => Number(val));
        if (!normalize.every((val) => !isNaN(val))) {
          onError?.('все значения должны быть числами');
        } else {
          onChange('capacity', normalize);
        }
      },
    },
    coils: {
      onDelete: (compatiblePlats: CompactibleCoilSeriesesType[]) => {
        onChange('compatibleCoilSerieses', compatiblePlats);
      },
      onCoilItemClick: onCoilItemClick,
      onCoilAdd: onCoilAdd,
    },
  };

  return {
    tankSeries,
    loading,
    uiHandler,
  };
};
