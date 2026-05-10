import { useState } from 'react';
import type { ICreatePodSeriesModal } from './types';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import type { PodSeriesType } from '@/entities/pods/model/types';
import { addPodSeries } from '@/features/devices/pods/add/model/addPodSeries';

export const useCreatePodSeriesModal = (props: ICreatePodSeriesModal) => {
  const [podSeries, setPodSeries] = useState({
    name: 'Название?',
    capacity: [1],
    ohms: [1],
  });

  const handler = {
    seriesCard: {
      onChange: (newValue: Omit<PodSeriesType, 'id'>) => {
        setPodSeries(newValue);
      },
      onSave: () => {
        addPodSeries(podSeries);
        props.onClose();
      },
    },
  };

  return {
    podSeries,
    handler,
  };
};
