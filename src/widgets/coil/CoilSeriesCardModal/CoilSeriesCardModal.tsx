import { Modal } from '@mui/material';
import type { ICoilSeriesCardModal } from './model/types';
import { useCoilSeriesCardModal } from './model/useCoilSeriesCardModal';
import { createStyles } from '@/shared/lib/createStyles';
import { CoilSeriesCard } from '../CoilSeriesCard/CoilSeriesCard';

export const CoilSeriesCardModal = (props: ICoilSeriesCardModal) => {
  const { coilSeries } = useCoilSeriesCardModal(props);
  const { open } = props;
  const styles = useStyles();

  return (
    <Modal {...props} open={open} sx={styles.modal}>
      {coilSeries ? (
        <CoilSeriesCard coilSeries={coilSeries} headerRightRender />
      ) : (
        <span>Загрузка...</span>
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
