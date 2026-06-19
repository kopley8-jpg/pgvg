import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import type { IPodSeriesCard } from './types';
import { usePodSeriesCard } from './usePodSeriesCard';
import type { PodSeriesType } from '@/shared/types/pod-series';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCardStyles } from '@/shared/constants/styles';
import { Delete } from '@mui/icons-material';

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
      menu={{
        menuItems: [
          {
            label: 'Удалить серию',
            sx: { color: 'red', gap: 1 },
            renderBeforeLabel: <Delete />,
            onClick: props.onDelete,
          },
        ],
      }}
      renderInHeader={
        <>
          <TextValue value={podSeries.name} {...uiHandler.name} />
          {props.renderInHeader}
        </>
      }
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
