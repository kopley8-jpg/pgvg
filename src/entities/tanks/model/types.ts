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
  id: string;
  name: string;
  capacity: number[];
  compatibleCoilSerieses: CompatibleCoilSeriesesType[];
};

export type CompatibleCoilSeriesesType = {
  idFromPlatforms: string;
  name: string;
};
