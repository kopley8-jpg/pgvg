export type TankSeriesType = {
  id: string;
  photoURL: string | null;
  name: string;
  capacity: number[];
  compatibleCoilSerieses: CompactibleCoilSeriesesType[];
};

export type CompactibleCoilSeriesesType = {
  idFromPlatforms: string;
  name: string;
};
