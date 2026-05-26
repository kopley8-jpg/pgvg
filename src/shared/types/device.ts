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
  kit: {
    pods: (PodType & { count: number })[] | null;
    tanks: { idFromPlatforms: string; name: string; count: number }[] | null;
    coils:
      | { idFromPlatforms: string; name: string; resistance: number | string }[]
      | null;
    somethingElse: string | null;
  };
};

export const BATTERY_FORMATS = ['18350', '18650', '20700', '21700'] as const;
export const PLATFORM_FORMATS = [
  '510',
  'boro',
  'dot',
  'squonk',
  'магнит',
] as const;

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

type PodType = {
  idFromPlatforms: string;
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
  | { type: 'встроенный'; capacity: number }
  | {
      type: 'сменный';
      format: (typeof BATTERY_FORMATS)[number] | null;
    }
  | { type: null };
