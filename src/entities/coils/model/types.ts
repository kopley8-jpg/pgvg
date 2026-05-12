export type CoilSeriesType = {
  id: string;
  name: string;
  resistances: number[];
};

export interface ICoilSeriesesStore {
  //данные
  coilSerieses: CoilSeriesType[];

  //ui состояние
  loadingCoils: boolean;
  error: string | null;

  // для управления подпиской
  unsubscribe: (() => void) | null;

  //действия
  subscribeToCoils: () => void;
  unsubscribeFromCoils: () => void;
  clearError: () => void;
}
