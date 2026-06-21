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
    onPhotoAccept,
  } = props;

  const [tankSeries, setTankSeries] = useState<TankSeriesType | null>(null);
  const [loading, setLoading] = useState(typeof inTankSeries === 'string');
  const [photoLoader, setPhotoLoader] = useState<{
    open: boolean;
    anchorEl: HTMLElement | null;
  }>({ open: false, anchorEl: null });

  useEffect(() => {
    if (typeof inTankSeries === 'object') {
      setTankSeries(inTankSeries);
      return;
    }

    const unsubscribe = subscribeToTankSeriesById(inTankSeries, (tank) => {
      setTankSeries(tank);
      setLoading(false);
    });

    return unsubscribe;
  }, [inTankSeries]);

  const handleMenuItemClick = (
    item: (typeof TANK_SERIES_MENU_ACTIONS)[number]
  ) => {
    return {
      onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        switch (item) {
          case 'load-photo':
            setPhotoLoader({ open: true, anchorEl: e.currentTarget });
            break;
          case 'delete-photo':
            onChange?.('photoURL', null);
            break;
          case 'delete-tank-series':
            onDelete?.();
            break;
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
    menuItem: handleMenuItemClick,
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
    photoLoader: {
      onFile: onPhotoAccept,
      onURL(url: string) {
        onChange?.('photoURL', url);
        alert(url);
      },
      onClose: () => {
        setPhotoLoader({ open: false, anchorEl: null });
      },
    },
  };

  return {
    tankSeries,
    loading,
    uiHandler,
    photoLoader,
  };
};

const TANK_SERIES_MENU_ACTIONS = [
  'load-photo',
  'delete-photo',
  'delete-tank-series',
] as const;
