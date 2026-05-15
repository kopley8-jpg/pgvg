import { updatePodSeriesEntryById } from '@/features/devices/pods/update/model/updatePodSeriesEntryById';
import type { IPodSeriesCard } from './types';

export const usePodSeriesCard = (props: IPodSeriesCard) => {
  const { podSeries } = props;

  const handleValueChange = (
    entryName: 'capacity' | 'ohms' | 'name',
    newValue: (string | number)[] | string | number
  ) => {
    updatePodSeriesEntryById({
      id: podSeries.id,
      entryName,
      newValue:
        typeof newValue === 'string' || typeof newValue === 'number'
          ? newValue.toString()
          : newValue.map((val) => Number(val)),
    });
  };

  return {
    handleValueChange,
  };
};
