import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { createStyles } from '@/shared/lib/createStyles';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { Cancel, Save } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type { ISeriesCard } from './model/types';
import { useSeriesCard } from './model/useSeriesCard';

export const SeriesCard = (props: ISeriesCard) => {
  const { podSeries } = props;

  const styles = useStyles();

  const { handler } = useSeriesCard(props);

  const podSeriesConfig = createRenderConfig(podSeries);

  return (
    <ObjCard
      style={{
        container: styles.objCardContainer,
        header: styles.objCardHeader,
      }}
      data={podSeries}
      translatedNamesForKeys={translate}
      renderInHeader={() => (
        <>
          <TextValue value={podSeries.name} {...handler.header.textField} />
          <div style={styles.objCardHeaderButtons}>
            <IconButton {...handler.header.exitButton}>
              <Cancel />
            </IconButton>
            <IconButton {...handler.header.saveButton}>
              <Save />
            </IconButton>
          </div>
        </>
      )}
      renderForKeys={[
        ...podSeriesConfig.forKeys(['capacity', 'ohms'], (key, value) => (
          <ArrayPrimitiveValue
            value={value}
            onChangesSaved={(p) =>
              handler.arrayPrimitiveValue.onSaveButtonPress(key, p)
            }
          />
        )),
      ]}
    />
  );
};

const translate = {
  name: 'Название',
  capacity: 'Емкости',
  ohms: 'Сопроты',
};

const useStyles = () => {
  const { colors } = useThemeStore();
  return createStyles({
    modal: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    objCardContainer: {
      width: '50vw',
      height: '25vh',
      backgroundColor: colors.background,
    },
    objCardHeader: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: '4%',
      justifyContent: 'space-between',
    },
    objCardHeaderButtons: {
      display: 'flex',
      flexDirection: 'row',
    },
  });
};
