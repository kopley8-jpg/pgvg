import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import type { IPodSeriesCard } from './types';
import { usePodSeriesCard } from './usePodSeriesCard';
import type { PodSeriesType } from '@/shared/types/pod-series';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCardStyles } from '@/shared/constants/styles';
import { Delete, Photo } from '@mui/icons-material';
import { PhotoLoader } from '@/shared/ui/photoLoader/PhotoLoader';

export const PodSeriesCard = (props: IPodSeriesCard) => {
  const { podSeries, loading, uiHandler, photoLoader } =
    usePodSeriesCard(props);

  if (!podSeries || loading) return <span>загрузка...</span>;
  return (
    <>
      <ObjCard
        photoURL={podSeries.photoURL}
        styles={ObjCardStyles(props.colors)}
        translatedNamesForKeys={translate}
        menu={{
          menuItems: [
            ...(podSeries.photoURL
              ? [
                  {
                    label: 'Заменить фото',
                    sx: { gap: 1 },
                    ...uiHandler.menuItem('load-photo'),
                    renderBeforeLabel: <Photo />,
                  },
                  {
                    label: 'Удалить фото',
                    sx: { gap: 1 },
                    ...uiHandler.menuItem('delete-photo'),
                    renderBeforeLabel: <Photo />,
                  },
                ]
              : [
                  {
                    label: 'Добавить фото',
                    ...uiHandler.menuItem('load-photo'),
                    sx: { gap: 1 },
                    renderBeforeLabel: <Photo />,
                  },
                ]),
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
      <PhotoLoader {...photoLoader} {...uiHandler.photoLoader} />
    </>
  );
};

const translate: Record<keyof PodSeriesType, string> = {
  id: '',
  name: 'Название',
  capacity: 'Емкости',
  ohms: 'Сопроты',
  photoURL: '',
};
