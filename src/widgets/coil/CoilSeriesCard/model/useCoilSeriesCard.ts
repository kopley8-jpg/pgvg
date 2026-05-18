import type { ICoilSeriesCard } from './types';
import { ref, remove, update } from 'firebase/database';
import database from '@/shared/api/firebase/client';
import type { CoilSeriesType } from '@/shared/types/coil-series';

export const useCoilSeriesCard = (props: ICoilSeriesCard) => {
  const { coilSeries, onDelete } = props;

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

  const deleteSeries = async () => {
    const coilSeriesRef = ref(
      database,
      `kochegar/platform/coils/${coilSeries.id}`
    );
    remove(coilSeriesRef);
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
    delete: {
      onClick: () => {
        deleteSeries();
        onDelete?.();
      },
    },
  };

  return {
    handler,
  };
};
