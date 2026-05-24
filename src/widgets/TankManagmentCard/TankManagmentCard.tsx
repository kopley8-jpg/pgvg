import { TankSeriesCard } from '@/entities/tanks/ui/TankSeriesCard/EditableTankSeriesCard';
import { deleteTankSeries } from '@/features/tank-managment/delete-tank-series/delete-tank-series';
import { updateTankSeries } from '@/features/tank-managment/update-tank-series/update-tank-series';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import type { TankSeriesType } from '@/shared/types/tank-series';

export const TankManagmentCard = ({
  tankSeries,
}: {
  tankSeries: TankSeriesType | string;
}) => {
  const { colors } = useThemeStore();
  const id = typeof tankSeries === 'object' ? tankSeries.id : tankSeries;
  return (
    <TankSeriesCard
      tankSeries={tankSeries}
      colors={colors}
      onChange={(key, value) => updateTankSeries(id, key, value)}
      onDelete={() => {
        deleteTankSeries(id);
      }}
      onCoilAdd={() => {}}
      onCoilItemClick={() => {}}
      onError={() => {}}
    />
  );
};
