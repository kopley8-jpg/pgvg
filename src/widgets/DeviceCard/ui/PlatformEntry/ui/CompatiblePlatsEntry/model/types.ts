export interface ICompactiblePlatsEntry {
  compactiblePlats: compactiblePlat[] | null;
  onChange: (plats: compactiblePlat[]) => void;
}

type compactiblePlat = {
  type: 'pod' | 'tank';
  name: string;
  idFromPlatforms: number;
};
