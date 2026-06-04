import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import type { IPodSeriesCard } from './types';
import { usePodSeriesCard } from './usePodSeriesCard';
import type { PodSeriesType } from '@/shared/types/pod-series';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCardStyles } from '@/shared/constants/styles';
import { CardMenu } from '@/shared/ui/CardMenu/CardMenu';

export const PodSeriesCard = (props: IPodSeriesCard) => {
  const { podSeries, loading, uiHandler } = usePodSeriesCard(props);

  if (!podSeries || loading) return <span>загрузка...</span>;
  return (
    <ObjCard
      styles={{
        ...ObjCardStyles(props.colors),
        container: {
          ...ObjCardStyles(props.colors).container,
          backgroundColor: props.colors.background,
          height: '20vh',
        },
      }}
      translatedNamesForKeys={translate}
      data={podSeries}
      renderInHeader={() => (
        <>
          <TextValue value={podSeries.name} {...uiHandler.name} />
          <CardMenu {...uiHandler.menu} />
          {props.renderInHeader}
        </>
      )}
      renderForKeys={[
        ...createRenderConfig(podSeries).forKeys(
          ['capacity', 'ohms'],
          (key, value) => (
            <ArrayPrimitiveValue
              value={value}
              {...uiHandler.capacityAndOhms(key)}
            />
          )
        ),
      ]}
    />
  );
};

const translate: Record<keyof PodSeriesType, string> = {
  id: '',
  name: 'Название',
  capacity: 'Емкость',
  ohms: 'Сопроты',
};
