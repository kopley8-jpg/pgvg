import { Modal } from '@mui/material';
import type { ITankSeriesCardModal } from './model/types';
import { useTankSeriesModal } from './model/useTankSeriesCardModal';
import { TankSeriesCard } from '../TankSeriesCard/TankSeriesCard';
import { createStyles } from '@/shared/lib/createStyles';

export const TankSeriesCardModal = (props: ITankSeriesCardModal) => {
  const { open, onClose } = props;
  const { tankSeries } = useTankSeriesModal(props);
  const styles = useStyles();

  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      {tankSeries ? (
        <TankSeriesCard tankSeries={tankSeries} headerRightRender />
      ) : (
        <span>загрузка...</span>
      )}
    </Modal>
  );
};

const useStyles = () => {
  return createStyles({
    modal: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
