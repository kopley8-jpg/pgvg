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
