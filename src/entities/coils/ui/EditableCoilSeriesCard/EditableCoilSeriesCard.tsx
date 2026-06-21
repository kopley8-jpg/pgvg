import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { Delete, Photo } from '@mui/icons-material';
import type { ICoilSeriesCard } from './model/types';
import { useCoilSeriesCard } from './model/useCoilSeriesCard';
import { ObjCardStyles } from '@/shared/constants/styles';
import { PhotoLoader } from '@/shared/ui/photoLoader/PhotoLoader';

export const CoilSeriesCard = (props: ICoilSeriesCard) => {
  const { onChange, colors, renderInHeader } = props;
  const {
    coilSeries,
    loading,
    photoLoader,
    photoLoaderHandler,
    handleOhmsChange,
    handleMenuItemClick,
  } = useCoilSeriesCard(props);

  if (!coilSeries || loading) return <span>загрузка...</span>;

  return (
    <>
      <ObjCard
        photoURL={coilSeries.photoURL}
        styles={ObjCardStyles(colors)}
        translatedNamesForKeys={translate}
        renderInHeader={
          <>
            <TextValue
              value={coilSeries.name}
              onSaveButtonPress={(value) => {
                onChange('name', value.toString());
              }}
            />
            {renderInHeader}
          </>
        }
        menu={{
          menuItems: [
            ...(coilSeries.photoURL
              ? [
                  {
                    label: 'Заменить фото',
                    sx: { gap: 1 },
                    ...handleMenuItemClick('load-photo'),
                    renderBeforeLabel: <Photo />,
                  },
                  {
                    label: 'Удалить фото',
                    sx: { gap: 1 },
                    ...handleMenuItemClick('delete-photo'),
                    renderBeforeLabel: <Photo />,
                  },
                ]
              : [
                  {
                    label: 'Добавить фото',
                    ...handleMenuItemClick('load-photo'),
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
          ...createRenderConfig(coilSeries).forKeys(['ohms'], (_key, value) => (
            <ArrayPrimitiveValue
              value={value}
              onChangesSaved={handleOhmsChange}
            />
          )),
        ]}
      />
      <PhotoLoader {...photoLoader} {...photoLoaderHandler} />
    </>
  );
};

const translate = {
  id: '',
  name: 'Название',
  ohms: 'Сопроты',
};
