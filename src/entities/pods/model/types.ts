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

export type PodSeriesType = {
  id: string;
  name: string;
  capacity: number[];
  ohms: number[];
};
