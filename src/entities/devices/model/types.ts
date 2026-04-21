export interface IDevicesStore {
  //данные
  devices: DeviceType[];

  //ui состояние
  loading: boolean;
  error: string | null;

  // для управления подпиской
  unsubscribe: (() => void) | null;

  //действия
  subscribeToDevices: () => void;
  unsubscribeFromDevices: () => void;
  clearError: () => void;
}

export type DeviceType = {
  id: string;

  photoURL: string | null;
  brand: string;
  model: string;

  adjustmentAirflow: boolean;
  modes: string[];
  features: string[];
  screen: 'индикация' | 'полноценный' | 'нет';
  battery: BatteryType;
  minCoilResistance: number;

  platforms: PlatformType;
  kit: {
    pods?: (PodType & { count: number })[];
    tanks?: { name: string; count: number }[];
    coils?: { name: string; resistance: number | string }[];
    somethingElse: string;
    lonyard: boolean;
  };
};

export const BATTERY_FORMATS = ['18350', '18650', '20700', '21700'] as const;

export type PlatformType =
  | {
      type: 'магнит';
      compatiblePlats: { type: 'pod' | 'tank'; name: string }[];
    }
  | { type: '510' }
  | { type: 'boro' }
  | { type: 'dot' }
  | { type: 'squonk' };

type PodType = {
  name: string;
  capacity: number;
  resistance: number;
};

export type MagneticPlatType = {
  type: 'магнит';
  compatiblePlats: { type: 'pod' | 'tank'; name: string }[];
};

export type BatteryType =
  | { type: 'встроенный'; capacity: number }
  | { type: 'сменный'; format: (typeof BATTERY_FORMATS)[number] };
