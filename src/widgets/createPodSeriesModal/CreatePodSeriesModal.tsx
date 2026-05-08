import { createStyles } from '@/shared/lib/createStyles';
import type { ICreatePodSeriesModal } from './model/types';
import { useCreatePodSeriesModal } from './model/useCreatePodSeriesModal';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { SeriesCard } from './SeriesCard/SeriesCard';
import { Modal } from '@mui/material';

export const CreatePodSeriesModal = (props: ICreatePodSeriesModal) => {
  const { podSeries } = useCreatePodSeriesModal(props);
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
      <SeriesCard podSeries={podSeries} />
    </Modal>
  );
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
  });
};
