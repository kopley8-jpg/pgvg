import type { colors } from '@/shared/constants/colors';
import type {
  CompactibleCoilSeriesesType,
  TankSeriesType,
} from '@/shared/types/tank-series';

export interface ITankSeriesCard {
  tankSeries: TankSeriesType | string;
  colors: typeof colors.light;
  onChange: <K extends keyof Omit<TankSeriesType, 'id'>>(
    key: K,
    value: Omit<TankSeriesType, 'id'>[K]
  ) => void;
  onCoilItemClick: (plat: CompactibleCoilSeriesesType) => void;
  onCoilAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onError?: (error: string) => void;
  onDelete: () => void;
}
