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

  platforms: MagneticPlatType | { type: '510' | 'boro' | 'dot' | 'squonk' };
  kit: {
    pods?: (PodType & { count: number })[];
    tanks?: { name: string; count: number }[];
    coils?: { name: string; resistance: number | string }[];
    somethingElse: string;
    lonyard: boolean;
  };
};

type PodType = {
  name: string;
  capacity: number;
  resistance: number;
};

type MagneticPlatType = {
  type: 'магнит';
  compatiblePlats: { type: 'pod' | 'tank'; name: string }[];
};

type BatteryType =
  | { type: 'встроенный'; capacity: number }
  | { type: 'сменный'; format: '21700' | '18650' | '20700' | '18350' };
