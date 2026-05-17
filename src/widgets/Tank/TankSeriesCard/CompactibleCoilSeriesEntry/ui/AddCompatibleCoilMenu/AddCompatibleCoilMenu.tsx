import { Add, Search } from '@mui/icons-material';
import {
  Box,
  IconButton,
  MenuItem,
  Modal,
  Popover,
  TextField,
} from '@mui/material';
import type { IAddCompatibleCoilMenu } from './model/types';
import { createStyles } from '@/shared/lib/createStyles';
import { useAddCompatibleCoilMenu } from './model/useAddCompatibleCoilMenu';
import { useState } from 'react';
import type { CoilSeriesType } from '@/entities/coils/model/types';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { CoilSeriesCard } from '@/widgets/coil/CoilSeriesCard/CoilSeriesCard';
import type { CompactiblePlatType } from '@/entities/devices/model/types';
import type { CompatibleCoilSeriesesType } from '@/entities/tanks/model/types';
import { CoilSeriesCardModal } from '@/widgets/coil/CoilSeriesCardModal/CoilSeriesCardModal';
import { push, ref, type DatabaseReference } from 'firebase/database';
import database from '@/shared/api/firebase/client';

export const AddCompatibleCoilMenu = (props: IAddCompatibleCoilMenu) => {
  const { coilSerieses, handler } = useAddCompatibleCoilMenu(props);

  const styles = useStyles();

  const [searchedText, setSearchedText] = useState('');

  const filteredSerieses = coilSerieses.filter((series) =>
    series.name.toLowerCase().includes(searchedText.toLowerCase())
  );

  return (
    <Popover
      {...props}
      slotProps={{
        paper: {
          style: styles.container,
        },
      }}
    >
      <TextField
        sx={{ width: '100%' }}
        size="small"
        slotProps={{
          input: {
            endAdornment: <Search />,
          },
        }}
        onChange={(p) => setSearchedText(p.target.value)}
      />
      <Box sx={styles.coilsListContainer}>
        <CreateCoilSeries />
        {filteredSerieses.map((coilSeries) => (
          <CoilItem coilSeries={coilSeries} {...handler.coilItem} />
        ))}
      </Box>
    </Popover>
  );
};

const useStyles = () => {
  return createStyles({
    container: {},
    coilsListContainer: {
      maxHeight: '33vh',
      overflowY: 'auto',
    },
  });
};

const CreateCoilSeries = () => {
  const [newCoilId, setNewCoilId] = useState<string | null>(null);

  const pushCoilSeries = async (
    newCoilSeries: Omit<CoilSeriesType, 'id'>,
    onFinish?: (res: DatabaseReference) => void
  ) => {
    const coilsRef = ref(database, 'kochegar/platform/coils');
    await push(coilsRef, newCoilSeries).then((res) => {
      onFinish?.(res);
    });
  };

  const handleClick = () => {
    pushCoilSeries({ name: 'Новая серия испариков', ohms: [1] }, (res) => {
      alert(res.key);
      setNewCoilId(res.key);
    });
  };

  return (
    <PopupState variant="popover">
      {(state) => (
        <>
          <MenuItem
            {...bindTrigger(state)}
            onClick={() => {
              handleClick();
              state.open();
            }}
          >
            + Создать серию испариков
          </MenuItem>
          <CoilSeriesCardModal
            {...bindMenu(state)}
            open={state.isOpen}
            coilSeriesId={newCoilId}
          />
        </>
      )}
    </PopupState>
  );
};

const CoilItem = (props: {
  coilSeries: CoilSeriesType;
  onPick: (coilSeries: CoilSeriesType) => void;
}) => {
  const { coilSeries, onPick } = props;

  return (
    <PopupState variant="popover">
      {(state) => (
        <>
          <MenuItem {...bindTrigger(state)}>{coilSeries.name}</MenuItem>
          <CoilSeriesDialog
            {...bindMenu(state)}
            series={coilSeries}
            onPick={() => onPick(coilSeries)}
          />
        </>
      )}
    </PopupState>
  );
};

const CoilSeriesDialog = (props: {
  series: CoilSeriesType;
  open: boolean;
  onClose: () => void;
  onPick: () => void;
}) => {
  const { series, onPick } = props;

  return (
    <Modal
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CoilSeriesCard
        coilSeries={series}
        headerRightRender={
          <IconButton onClick={onPick}>
            <Add />
          </IconButton>
        }
      />
    </Modal>
  );
};
