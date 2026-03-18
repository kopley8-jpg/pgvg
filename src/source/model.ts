export type DeviceType = {
  id: string;
  photo: string;
  type: string;
  brand: string;
  model: string;
  battery: string;
  airflow: 'есть' | 'нет';
  screen: string;
  mods: string;
  features: string;
  platforms: PlatformType[];
  coilsInContain: CoilInContainType[];
  lonyardInContain: 'есть' | 'нет';
};

export type PlatformType =
  | (PodType & { type: 'pod' })
  | (TankType & { type: 'tank' });

export type CoilInContainType = {
  name: string;
  capacity: number;
  ohms: number;
  count: number;
};

export type PodType = {
  id: string;
  name: string;
  capacity: number[];
  ohms: number[];
};

export type TankType = {
  id: string;
  name: string;
  capacity: number;
  coils: CoilType[];
};

export type CoilType = {
  id: string;
  name: string;
  ohms: number[];
};
