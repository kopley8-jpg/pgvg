import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCardStyles, ObjEntryStyles } from '@/shared/constants/styles';
import type { ITankSeriesCard } from './types';
import { useTankSeriesCard } from './useTankSeriesCard';
import type { TankSeriesType } from '@/shared/types/tank-series';
import { CompactibleCoilsEntry } from './CompatibleCoilsEntry/CompatibleCoilsEntry';
import { Delete, Photo } from '@mui/icons-material';
import { PhotoLoader } from '@/shared/ui/photoLoader/PhotoLoader';

export const TankSeriesCard = (props: ITankSeriesCard) => {
  const { tankSeries, loading, uiHandler, photoLoader } =
    useTankSeriesCard(props);

  if (!tankSeries || loading) return <span>загрузка...</span>;
  return (
    <>
      <ObjCard
        styles={ObjCardStyles(props.colors)}
        photoURL={tankSeries.photoURL}
        translatedNamesForKeys={translate}
        renderInHeader={
          <>
            <TextValue value={tankSeries.name} {...uiHandler.name} />
            {props.headerRender}
          </>
        }
        menu={{
          menuItems: [
            ...(tankSeries.photoURL
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
      <PhotoLoader {...photoLoader} {...uiHandler.photoLoader} />
    </>
  );
};

const translate: Record<keyof TankSeriesType, string> = {
  id: '',
  name: 'Название',
  capacity: 'Емкость',
  compatibleCoilSerieses: '',
  photoURL: '',
};
