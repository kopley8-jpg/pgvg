import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import type { ObjCardStyles } from '@/shared/ui/ObjCard/types';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import type { ITankSeriesCard } from './model/types';
import { useTankSeriesCard } from './model/useTankSeriesCard';
import { ObjEntryTwo } from '@/shared/ui/ObjEntry/ObjEntry';
import { CompactibleCoilSeriesesEntry } from './CompactibleCoilSeriesEntry/CompactibleCoilSeriesEntry';

export const TankSeriesCard = (props: ITankSeriesCard) => {
  const styles = useStyles();
  const { tankSeries, headerRightRender } = props;
  const { } = useTankSeriesCard(props);

  return (
    <ObjCard
      style={{ ...styles }}
      translatedNamesForKeys={translate}
      data={tankSeries}
      renderInHeader={() => (
        <>
          <TextValue
            value={tankSeries.name}
            onSaveButtonPress={(p) => { }}
          />
          {typeof headerRightRender === 'function'
            ? headerRightRender()
            : headerRightRender}
        </>
      )}
      renderForKeys={[
        ...createRenderConfig(tankSeries).forKeys(
          ['capacity'],
          (key, value) => (
            <ArrayPrimitiveValue
              value={value}
              onChangesSaved={(newValue) => { }}
            />
          )
        ),
        ...createRenderConfig(tankSeries).forKeys(["compatibleCoilSerieses"], (key, compatibleCoilSerieses) => (
          <CompactibleCoilSeriesesEntry compatibleCoilSerieses={compatibleCoilSerieses} />
        ), { hideKeyName: true })
      ]}
    />
  );
};

const useStyles = (): ObjCardStyles => {
  const { colors } = useThemeStore();
  return {
    container: {
      height: '25vh',
      width: '53vw',
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
  compatibleCoilSerieses: 'Поддерживает',
  capacity: 'Емкость',
  ohms: 'Сопроты',
};
