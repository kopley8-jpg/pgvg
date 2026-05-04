export interface IPodSeriesesStore {
  //данные
  tankSerieses: TankSeriesType[];

  //ui состояние
  loadingTanks: boolean;
  error: string | null;

  // для управления подпиской
  unsubscribe: (() => void) | null;

  //действия
  subscribeToTanks: () => void;
  unsubscribeFromTanks: () => void;
  clearError: () => void;
}

export type TankSeriesType = {
  name: string;
  capacities: string[];
  compatibleCoilSerieses: string[];
};
