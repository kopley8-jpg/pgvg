import type { PodSeriesType } from '@/entities/pods/model/types';

export interface IPodSeriesesStore {
  //данные
  podSerieses: PodSeriesType[];

  //ui состояние
  loading: boolean;
  error: string | null;

  // для управления подпиской
  unsubscribe: (() => void) | null;

  //действия
  subscribeToPods: () => void;
  unsubscribeFromPods: () => void;
  clearError: () => void;
}

export type deviceType<TPlatfomType extends ("magnetic"|"510")> = {
  id: string;
  photoURL: string;

  brand: string;
  model: string;

  battery: batteryType;
  adjustableAirflow: boolean;
  features: string[];
  modes:string[];
  screen: 'полноценный' | 'индикация' | 'нет';
  minCoilResistance: number;
  platform: Platform;

  kit: 
    
};

type batteryType =
  | { type: 'встроенный'; capacity: number }
  | { type: 'сменный'; format: '18650' | '21700' | '20700' | '18350' };

type Platform =
  | {
      platformType: 'magnetic';
      tankNames?: string[];
      podNames?: string[];
      adapters?: string[];
    }
  | { platformType: '510' | 'boro' | 'dot' | 'squonk' };

type coilType = {
  type: 'coil';
  name: string;
  resistance: number;
};

type podType = {
  type: 'pod';
  name: string;
  capacity: number;
  resistance: number;
};

type tankType = {
  type: 'tank';
  name: string;
};
