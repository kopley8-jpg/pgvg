import { updatePodSeriesEntryById } from '@/features/devices/pods/update/model/updatePodSeriesEntryById';
import type { IPodSeriesCard } from './types';

export const usePodSeriesCard = ({ platform }: IPodSeriesCard) => {
  const handleValueChange = (
    entryName: 'capacity' | 'ohms',
    newValue: (string | number)[]
  ) => {
    updatePodSeriesEntryById({
      id: platform.plat.id,
      entryName,
      newValue: newValue.map((val) => Number(val)),
    });
  };

  return {
    handleValueChange,
  };
};
