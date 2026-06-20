import { useEffect, useState } from 'react';
import type { IPodSeriesCard } from './types';
import type { PodSeriesType } from '@/shared/types/pod-series';
import { subscribeToPodSeriesById } from '@/shared/api/firebase/pods';
import { convertToNumber } from '@/shared/lib/tryConvertToNumber';

export const usePodSeriesCard = (props: IPodSeriesCard) => {
  const {
    podSeries: inPodSeries,
    onPhotoAccept,
    onChange,
    onDelete,
    onError,
  } = props;

  const [podSeries, setPodSeries] = useState<PodSeriesType | null>(null);
  const [loading, setLoading] = useState(typeof inPodSeries === 'string');
  const [photoLoader, setPhotoLoader] = useState<{
    open: boolean;
    anchorEl: HTMLElement | null;
  }>({ open: false, anchorEl: null });

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
  }, [inPodSeries]);

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

  const handleMenuItemClick = (
    item: (typeof POD_SERIES_MENU_ACTIONS)[number]
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
          case 'delete-pod-series':
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
    capacityAndOhms: (key: 'ohms' | 'capacity') => {
      return {
        ...handleArrayPrimitChange(key),
      };
    },
    menuItem: handleMenuItemClick,
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
    podSeries,
    loading,
    uiHandler,
    photoLoader,
  };
};

const POD_SERIES_MENU_ACTIONS = [
  'load-photo',
  'delete-photo',
  'delete-pod-series',
] as const;
