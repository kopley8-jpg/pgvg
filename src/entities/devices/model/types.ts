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
  brand: string | null;
  model: string | null;

  adjustmentAirflow: boolean | null;
  modes: string[] | null;
  features: string[] | null;
  screen: ('индикация' | 'полноценный' | 'нет') | null;
  battery: BatteryType | null;
  minCoilResistance: number | null;

  platforms: PlatformType | null;
  kit: {
    pods: (PodType & { count: number })[] | null;
    tanks: { name: string; count: number }[] | null;
    coils: { name: string; resistance: number | string }[] | null;
    somethingElse: string | null;
    lonyard: boolean | null;
  };
};

export const BATTERY_FORMATS = ['18350', '18650', '20700', '21700'] as const;
export const PLATFORM_FORMATS = ['510', 'boro', 'dot', 'squonk', 'магнит'];

export type PlatformType =
  | {
      type: 'магнит';
      compatiblePlats:
        | { type: 'pod' | 'tank'; name: string; idFromPlatforms: string }[]
        | null;
    }
  | { type: '510' | 'boro' | 'dot' | 'squonk' }
  | { type: null };

type PodType = {
  name: string;
  capacity: number;
  resistance: number;
};

export type MagneticPlatType = {
  type: 'магнит';
  compatiblePlats: {
    type: 'pod' | 'tank';
    name: string;
    idFromPlatforms: string;
  }[];
};

export type BatteryType =
  | { type: 'встроенный'; capacity: number | null }
  | {
      type: 'сменный';
      format: (typeof BATTERY_FORMATS)[number] | null;
    }
  | { type: null };
