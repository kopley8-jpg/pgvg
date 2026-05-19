import { convertToNumber } from '@/shared/lib/convertToNumber';
import type { ICoilSeriesCard } from './types';
import { useEffect, useState } from 'react';
import type { CoilSeriesType } from '@/shared/types/coil-series';
import { subscribeToCoilSeriesById } from '@/shared/api/firebase/coils';

export const useCoilSeriesCard = (props: ICoilSeriesCard) => {
  const { coilSeries: inCoilSeries, onChange, onError } = props;

  const [coilSeries, setCoilSeries] = useState<CoilSeriesType | null>(null);
  const [loading, setLoading] = useState(typeof inCoilSeries === 'string');

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
  });

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

  return {
    coilSeries,
    loading,
    handleOhmsChange,
  };
};
