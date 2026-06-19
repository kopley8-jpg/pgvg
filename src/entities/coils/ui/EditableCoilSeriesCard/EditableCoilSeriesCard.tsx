import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { Delete } from '@mui/icons-material';
import type { ICoilSeriesCard } from './model/types';
import { useCoilSeriesCard } from './model/useCoilSeriesCard';
import { ObjCardStyles } from '@/shared/constants/styles';

export const CoilSeriesCard = (props: ICoilSeriesCard) => {
  const { onChange, colors, renderInHeader } = props;
  const { coilSeries, loading, handleOhmsChange } = useCoilSeriesCard(props);

  if (!coilSeries || loading) return <span>загрузка...</span>;

  return (
    <ObjCard
      styles={{
        ...ObjCardStyles(colors),
        container: {
          ...ObjCardStyles(colors).container,
          height: '20vh',
        },
      }}
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
          {
            label: 'Удалить серию',
            sx: { color: 'red', gap: 1 },
            renderBeforeLabel: <Delete />,
            onClick: () => props.onMenuItemClick('delete'),
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
  );
};

const translate = {
  id: '',
  name: 'Название',
  ohms: 'Сопроты',
};
