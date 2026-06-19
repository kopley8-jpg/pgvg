import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCardStyles, ObjEntryStyles } from '@/shared/constants/styles';
import type { ITankSeriesCard } from './types';
import { useTankSeriesCard } from './useTankSeriesCard';
import type { TankSeriesType } from '@/shared/types/tank-series';
import { CompactibleCoilsEntry } from './CompatibleCoilsEntry/CompatibleCoilsEntry';
import { CardMenu } from '@/shared/ui/CardMenu/CardMenu';

export const TankSeriesCard = (props: ITankSeriesCard) => {
  const { tankSeries, loading, uiHandler } = useTankSeriesCard(props);

  if (!tankSeries || loading) return <span>загрузка...</span>;
  return (
    <ObjCard
      styles={{
        ...ObjCardStyles(props.colors),
        container: {
          ...ObjCardStyles(props.colors).container,
          backgroundColor: props.colors.background,
          minHeight: '20vh',
        },
      }}
      translatedNamesForKeys={translate}
      renderInHeader={
        <>
          <TextValue value={tankSeries.name} {...uiHandler.name} />
          <CardMenu {...uiHandler.menu} />
          {props.headerRender}
        </>
      }
      renderForKeys={[
        ...createRenderConfig(tankSeries).forKeys(
          ['capacity'],
          (_key, value) => (
            <ArrayPrimitiveValue
              value={Array.isArray(value) ? value : [value]}
              {...uiHandler.capacity}
            />
          )
        ),
        <CompactibleCoilsEntry
          compactibleCoils={tankSeries.compatibleCoilSerieses}
          objEntryStyles={ObjEntryStyles(props.colors)}
          {...uiHandler.coils}
        />,
      ]}
    />
  );
};

const translate: Record<keyof TankSeriesType, string> = {
  id: '',
  name: 'Название',
  capacity: 'Емкость',
  compatibleCoilSerieses: '',
};
