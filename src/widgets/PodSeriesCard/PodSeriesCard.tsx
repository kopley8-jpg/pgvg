import type { PodSeriesType } from '@/entities/pods/model/types';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import type { ObjCardStyles } from '@/shared/ui/ObjCard/types';
import type { IPodSeriesCard } from './model/types';
import { usePodSeriesCard } from './model/usePodSeriesCard';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';

export const PodSeriesCard = ({ platform }: IPodSeriesCard) => {
  const styles = useStyles();

  const { handleValueChange } = usePodSeriesCard({ platform });

  return (
    <ObjCard
      style={styles}
      translatedNamesForKeys={translate}
      data={platform}
      renderInHeader={() => <TextValue value={platform.name} />}
      renderForKeys={[
        ...createRenderConfig(platform).forKeys(
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
      backgroundColor: colors.background,
      width: '50vw',
      height: '50vh',
    },
    content: {},
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
