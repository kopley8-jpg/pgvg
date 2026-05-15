import type { ICoilSeriesCard } from './types';
import type { CoilSeriesType } from '@/entities/coils/model/types';
import { ref, update } from 'firebase/database';
import database from '@/shared/api/firebase/client';

export const useCoilSeriesCard = (props: ICoilSeriesCard) => {
  const { coilSeries } = props;

  const handleValueChange = async <K extends keyof CoilSeriesType>(
    entryName: K,
    newValue: CoilSeriesType[K]
  ) => {
    const coilSeriesRef = ref(
      database,
      `kochegar/platform/coils/${coilSeries.id}`
    );
    await update(coilSeriesRef, { [entryName]: newValue });
  };

  const handleResistancesChange = (newValue: (string | number)[]) => {
    if (!newValue.every((val) => !isNaN(Number(val)))) {
      alert('так не пойдет');
      return;
    } else {
      return handleValueChange(
        'ohms',
        newValue.map((val) => Number(val))
      );
    }
  };

  const handler = {
    header: {
      textField: {
        onSaveButtonPress: (newValue: string | number) => {
          handleValueChange('name', newValue.toString());
        },
      },
    },
    resistances: {
      onChangesSaved: (newValue: (string | number)[]) =>
        handleResistancesChange(newValue),
    },
  };

  return {
    handler,
  };
};
