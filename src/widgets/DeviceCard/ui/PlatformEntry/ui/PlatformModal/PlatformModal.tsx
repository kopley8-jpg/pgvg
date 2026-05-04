import { Modal } from '@mui/material';
import type { IPlatformModal } from './model/types';
import { useEffect, useState } from 'react';
import type { PodSeriesType } from '@/entities/pods/model/types';
import type { TankSeriesType } from '@/entities/tanks/model/types';
import { off, onValue, ref } from 'firebase/database';
import database from '@/shared/api/firebase/client';
import { createStyles } from '@/shared/lib/createStyles';
import { PodSeriesCard } from '@/widgets/PodSeriesCard/PodSeriesCard';

export const PlatformModal = ({
  plat,
  isOpen,
  onBackdropClick,
}: IPlatformModal) => {
  const { platform } = usePlatform(plat);

  if (!platform) return <span>Загрузка...</span>;

  const styles = useStyles();

  return (
    <Modal sx={styles.modal} open={isOpen} onClose={onBackdropClick}>
      {platform.type === 'pod' ? (
        <PodSeriesCard platform={platform.plat} />
      ) : (
        <></>
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

const usePlatform = (plat: { type: 'pod' | 'tank'; id: number }) => {
  const [platform, setPlatform] = useState<
    | { plat: PodSeriesType; type: 'pod' }
    | { plat: TankSeriesType; type: 'tank' }
    | null
  >(null);
  const platRef = ref(
    database,
    `/kochegar/platform/${plat.type === 'pod' ? 'pods' : 'tanks'}/${plat.id}`
  );

  useEffect(() => {
    onValue(platRef, (snapshot) => {
      const data = snapshot.val();

      setPlatform(
        plat.type === 'pod'
          ? {
              plat: {
                id: plat.id.toString(),
                name: data.name || '',
                capacity: data.capacity || [],
                ohms: data.ohms || [],
              },
              type: 'pod',
            }
          : {
              plat: {
                name: data.name || '',
                capacities: data.capacities || '0',
                compatibleCoilSerieses: data.compatibleCoilSerieses || [],
              },
              type: 'tank',
            }
      );
    });

    return () => {
      off(platRef, 'value', () => {});
    };
  }, []);

  return { platform };
};
