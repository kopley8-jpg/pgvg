import type { CoilSeriesType } from '@/entities/coils/model/types';
import type { ICoilSeriesCardModal } from './types';
import { useEffect, useState } from 'react';
import { subscribeToCoilSeriesById } from '@/shared/api/firebase/coils';

export const useCoilSeriesCardModal = (props: ICoilSeriesCardModal) => {
  const { compatibleCoilSeries, clickedCoilSeriesId } = props;
  const [coilSeries, setCoilSeries] = useState<CoilSeriesType | null>(null);

  useEffect(() => {
    if (clickedCoilSeriesId != compatibleCoilSeries.idFromPlatforms) return;
    const unsubscribe = subscribeToCoilSeriesById(
      compatibleCoilSeries.idFromPlatforms,
      (searchedCoilSeries) => {
        if (!searchedCoilSeries) {
          alert(
            'чето не нашел я такого испарика: ' +
              compatibleCoilSeries.idFromPlatforms
          );
          return;
        } else {
          setCoilSeries(searchedCoilSeries);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [clickedCoilSeriesId]);

  return {
    coilSeries,
  };
};
