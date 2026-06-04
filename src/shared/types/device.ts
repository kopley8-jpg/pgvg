export type DeviceType = {
  id: string;

  photoURL: string | null;
  brand: string;
  model: string;

  modes: string[];
  features: string[];
  screen: 'индикация' | 'полноценный' | 'нет';
  battery: BatteryType;
  minCoilResistance: number;

  platforms: PlatformType;
  kit: DeviceKitType[];
};

export type DeviceKitType =
  | PodInKitType
  | TankInKitType
  | CoilInKitType
  | SomethingElseInKitType;

export type PodInKitType = {
  type: 'pod';
  idFromPlatforms: string;
  name: string;
  capacity: number;
  resistance: number;
  count: number;
};

export type TankInKitType = {
  type: 'tank';
  name: string;
  capacity: number;
  idFromPlatforms: string;
  count: number;
};

export type CoilInKitType = {
  type: 'coil';
  name: string;
  resistance: number;
  idFromPlatforms: string;
  count: number;
};

export type SomethingElseInKitType = {
  type: 'something-else';
  name: string;
  count: number;
};

export const BATTERY_FORMATS = ['18350', '18650', '20700', '21700'];
export const PLATFORM_FORMATS = ['510', 'boro', 'dot', 'squonk', 'магнит'];

export type PlatformType =
  | {
      type: 'магнит';
      adjustmentAirflow: boolean;
      compatiblePlats: CompactiblePlatType[];
    }
  | { type: '510' | 'boro' | 'dot' | 'squonk' };

export type CompactiblePlatType = {
  type: 'pod' | 'tank';
  name: string;
  idFromPlatforms: string;
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
  | { type: 'встроенный'; capacity: number }
  | {
      type: 'сменный';
      format: (typeof BATTERY_FORMATS)[number] | null;
    }
  | { type: null };
