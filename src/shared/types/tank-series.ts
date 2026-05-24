export type TankSeriesType = {
  id: string;
  name: string;
  capacity: number[];
  compatibleCoilSerieses: CompactibleCoilSeriesesType[];
};

export type CompactibleCoilSeriesesType = {
  idFromPlatforms: string;
  name: string;
};
