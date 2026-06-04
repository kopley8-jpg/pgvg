import type { TankSeriesType } from '@/shared/types/tank-series';

export interface ITankSeriesesStore {
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
