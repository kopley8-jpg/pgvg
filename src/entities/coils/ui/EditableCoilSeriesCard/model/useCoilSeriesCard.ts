import { convertToNumber } from '@/shared/lib/tryConvertToNumber';
import type { ICoilSeriesCard } from './types';
import { useEffect, useState } from 'react';
import type { CoilSeriesType } from '@/shared/types/coil-series';
import { subscribeToCoilSeriesById } from '@/shared/api/firebase/coils';

export const useCoilSeriesCard = (props: ICoilSeriesCard) => {
  const {
    coilSeries: inCoilSeries,
    onPhotoAccept,
    onChange,
    onError,
    onDelete,
  } = props;

  const [coilSeries, setCoilSeries] = useState<CoilSeriesType | null>(null);
  const [loading, setLoading] = useState(typeof inCoilSeries === 'string');
  const [photoLoader, setPhotoLoader] = useState<{
    open: boolean;
    anchorEl: HTMLElement | null;
  }>({ open: false, anchorEl: null });

  useEffect(() => {
    if (typeof inCoilSeries === 'object') {
      setCoilSeries(inCoilSeries);
      return;
    }

    const unsubscribe = subscribeToCoilSeriesById(inCoilSeries, (coil) => {
      setCoilSeries(coil);
      setLoading(false);
    });

    return unsubscribe;
  }, [inCoilSeries]);

  const handleOhmsChange = (newValue: (string | number)[]) => {
    const ohmsAsNumbers = newValue.map((v) => Number(convertToNumber(v)));

    if (ohmsAsNumbers.some((val) => isNaN(val))) {
      onError?.(new Error('Все значения должны быть числами'));
      return;
    }

    if (ohmsAsNumbers.length === 0) {
      onError?.(new Error('Хотя бы одно сопротивление обязательно'));
      return;
    }

    onChange('ohms', ohmsAsNumbers);
  };

  const photoLoaderHandler = {
    onFile: onPhotoAccept,
    onURL(url: string) {
      onChange?.('photoURL', url);
      alert(url);
    },
    onClose: () => {
      setPhotoLoader({ open: false, anchorEl: null });
    },
  };

  const handleMenuItemClick = (
    item: (typeof COIL_SERIES_MENU_ACTIONS)[number]
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
          case 'delete-coil-series':
            onDelete?.();
            break;
        }
      },
    };
  };

  return {
    coilSeries,
    loading,
    handleOhmsChange,
    handleMenuItemClick,
    photoLoader,
    photoLoaderHandler,
  };
};

const COIL_SERIES_MENU_ACTIONS = [
  'load-photo',
  'delete-photo',
  'delete-coil-series',
] as const;
