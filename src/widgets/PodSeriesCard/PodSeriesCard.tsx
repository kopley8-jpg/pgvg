import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import type { ObjCardStyles } from '@/shared/ui/ObjCard/types';
import type { IPodSeriesCard } from './model/types';
import { usePodSeriesCard } from './model/usePodSeriesCard';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { createStyles } from '@/shared/lib/createStyles';

export const PodSeriesCard = (props: IPodSeriesCard) => {
  const styles = useStyles();
  const { podSeries, headerRightRender } = props
  const { handleValueChange } = usePodSeriesCard(props);

  return (
    <ObjCard
      style={{ ...styles }}
      translatedNamesForKeys={translate}
      data={podSeries}
      renderInHeader={() => (
        <>
          <TextValue value={podSeries.name} />
          {typeof headerRightRender === "function" ? headerRightRender() : headerRightRender}
        </>
      )}
      renderForKeys={[
        ...createRenderConfig(podSeries).forKeys(
          ['capacity', 'ohms'],
          (key, value) => (
            <ArrayPrimitiveValue
              value={value}
              onChangesSaved={(newValue) => handleValueChange(key, newValue)}
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
      backgroundColor: colors.background,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: '4%',
      justifyContent: 'space-between',
      fontSize: "4vw"
    },
    content: {
      fontSize: "4vw"
    }
  };
};

const translate = {
  id: '',
  name: 'Название',
  capacities: 'Емкости',
  compatibleCoilSerieses: 'Поддерживает',
  capacity: 'Емкость',
  ohms: 'Сопроты',
};
