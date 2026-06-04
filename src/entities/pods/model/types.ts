import type { PodSeriesType } from '@/shared/types/pod-series';

export interface IPodSeriesesStore {
  //данные
  podSerieses: PodSeriesType[];

  //ui состояние
  loadingPods: boolean;
  error: string | null;

  // для управления подпиской
  unsubscribe: (() => void) | null;

  //действия
  subscribeToPods: () => void;
  unsubscribeFromPods: () => void;
  clearError: () => void;
}
