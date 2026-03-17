export type DeviceType = {
  id: string;
  photo: string;
  type: string;
  brand: string;
  model: string;
  battery: string;
  airflow: string;
  screen: string;
  mods: string;
  features: string;
  platform: string[];
  coilsInContain: string;
  LonyardInContain: string;
};

export type PodType = {
  id: string;
  Name: string;
  Capacity: number[];
  Ohms: number[];
};

export type TankType = {
  id: string;
  name: string;
  capacity: number;
  coils: CoilType[];
};

export type CoilType = {
  id: string;
  Name: string;
  Ohms: number[];
};
