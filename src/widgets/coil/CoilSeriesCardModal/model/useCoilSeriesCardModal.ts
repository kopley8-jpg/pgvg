import type { CoilSeriesType } from '@/entities/coils/model/types';
import type { ICoilSeriesCardModal } from './types';
import { useEffect, useState } from 'react';
import { subscribeToCoilSeriesById } from '@/shared/api/firebase/coils';

export const useCoilSeriesCardModal = (props: ICoilSeriesCardModal) => {
  const { open, coilSeriesId } = props;
  const [coilSeries, setCoilSeries] = useState<CoilSeriesType | null>(null);

  useEffect(() => {
    if (!open || !coilSeriesId) return;
    const unsubscribe = subscribeToCoilSeriesById(
      coilSeriesId!,
      (searchedCoilSeries) => {
        if (!searchedCoilSeries) {
          alert('чето не нашел я такого испарика: ' + coilSeriesId);
          return;
        } else {
          setCoilSeries(searchedCoilSeries);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [open]);

  return {
    coilSeries,
  };
};
