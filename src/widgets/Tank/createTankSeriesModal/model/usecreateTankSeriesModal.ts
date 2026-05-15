import { useState } from 'react';
import type { IcreateTankSeriesModal } from './types';
import type { TankSeriesType } from '@/entities/tanks/model/types';

export const usecreateTankSeriesModal = (props: IcreateTankSeriesModal) => {
  const [tankSeries, setTankSeries] = useState<Omit<TankSeriesType, 'id'>>({
    name: 'name?',
    capacity: [1],
    compatibleCoilSerieses: [],
  });

  const handleValueChange = <K extends keyof Omit<TankSeriesType, 'id'>>(
    entryName: K,
    newValue: Omit<TankSeriesType, 'id'>[K]
  ) => {
    setTankSeries((prev) => ({ ...prev, [entryName]: newValue }));
  };

  const handler = {
    header: {
      textField: {
        onSaveButtonPress: (newValue: string | number) => {
          handleValueChange('name', newValue.toString());
        },
      },
    },
    capacity: {
      onChangesSaved: (newValue: (string | number)[]) => {
        if (!newValue.every((val) => !isNaN(Number(val)))) {
          alert('так не пойдет');
        } else {
          handleValueChange(
            'capacity',
            newValue.map((val) => Number(val))
          );
        }
      },
    },
  };

  return {
    tankSeries,
    handler,
  };
};
