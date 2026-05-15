import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import type { ObjCardStyles } from '@/shared/ui/ObjCard/types';
import type { ICoilSeriesCard } from './model/types';
import { useCoilSeriesCard } from './model/useCoilSeriesCard';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';

export const CoilSeriesCard = (props: ICoilSeriesCard) => {
  const styles = useStyles();
  const { coilSeries, headerRightRender } = props;
  const { handler } = useCoilSeriesCard(props);

  return (
    <ObjCard
      style={{ ...styles }}
      translatedNamesForKeys={translate}
      data={coilSeries}
      renderInHeader={() => (
        <>
          <TextValue
            value={coilSeries.name}
            {...handler.header.textField}
          />
          {typeof headerRightRender === 'function'
            ? headerRightRender()
            : headerRightRender}
        </>
      )}
      renderForKeys={[
        ...createRenderConfig(coilSeries).forKeys(
          ['ohms'],
          (key, value) => (
            <ArrayPrimitiveValue
              value={value}
              {...handler.resistances}
            />
          )
        ),
      ]}
    />
  );
};

const useStyles = (): ObjCardStyles => {
  const { colors } = useThemeStore();
  return {
    container: {
      height: '25vh',
      width: '60vw',
      backgroundColor: colors.background,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: '4%',
      justifyContent: 'space-between',
      fontSize: '4vw',
    },
    content: {
      fontSize: '4vw',
    },
  };
};

const translate = {
  id: '',
  name: 'Название',
  ohms: "Сопроты"
};
