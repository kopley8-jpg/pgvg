import { IconButton, Modal } from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { createStyles } from '@/shared/lib/createStyles';
import { ObjCard } from '@/shared/ui/ObjCard/ObjCard';
import type { ICreatePodSeriesModal } from './model/types';
import { useCreatePodSeriesModal } from './model/useCreatePodSeriesModal';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import { ArrayPrimitiveValue } from '@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue';
import { useThemeStore } from '@/shared/hooks/useThemeStore';

export const CreatePodSeriesModal = (props: ICreatePodSeriesModal) => {
  const { podSeries } = useCreatePodSeriesModal(props);
  const podSeriesConfig = createRenderConfig(podSeries);
  const styles = useStyles();

  return (
    <Modal
      {...props}
      slotProps={{
        root: {
          style: styles.modal,
        },
      }}
    >
      <ObjCard
        style={{
          container: styles.objCardContainer,
          header: styles.objCardHeader,
        }}
        data={podSeries}
        translatedNamesForKeys={translate}
        renderInHeader={() => (
          <>
            <TextValue value={podSeries.name} />
            <div style={styles.objCardHeaderButtons}>
              <IconButton>
                <Cancel />
              </IconButton>
              <IconButton>
                <Save />
              </IconButton>
            </div>
          </>
        )}
        renderForKeys={[
          ...podSeriesConfig.forKeys(['capacity', 'ohms'], (key, value) => (
            <ArrayPrimitiveValue value={value} onChangesSaved={() => {}} />
          )),
        ]}
      />
    </Modal>
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
