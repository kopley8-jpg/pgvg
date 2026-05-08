import { useState } from 'react';
import type { ICreatePodSeriesModal } from './types';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';

export const useCreatePodSeriesModal = (props: ICreatePodSeriesModal) => {
  const [podSeries, setPodSeries] = useState({
    name: 'Название?',
    capacity: [1],
    ohms: [1],
  });

  return {
    podSeries,
  };
};
