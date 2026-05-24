import {
  Box,
  IconButton,
  MenuItem,
  Modal,
  Popover,
  TextField,
  type MenuProps,
} from '@mui/material';
import type { ICompatiblePlatPicker } from './model/types';
import { useCompatibleCoilPicker } from './model/useCompatibleCoilPicker';
import { createStyles } from '@/shared/lib/createStyles';
import { Add, Search } from '@mui/icons-material';
import type { CoilSeriesType } from '@/shared/types/coil-series';
import { CoilManagmentCard } from '@/widgets/CoilManagnmentCard/CoilManagmentCard';

export const CompatibleCoilPicker = (props: ICompatiblePlatPicker) => {
  const { coils, coilToShow, uiHandler } =
    useCompatibleCoilPicker(props);
  const styles = useStyles();
  return (
    <Popover
      {...props}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{
        paper: {
          style: styles.popover,
        },
      }}
    >
      <TextField
        size="small"
        slotProps={{
          input: {
            endAdornment: <Search />,
          },
        }}
      />
      <Box sx={styles.box}>
        <MenuItem {...uiHandler.createCoilButton}>+ Создать серию</MenuItem>
        {coils.map((coil) => (
          <>
            <MenuItem {...uiHandler.coilItem(coil)}>{coil.name}</MenuItem>
            <SeriesCardDialog
              series={coil}
              menuProps={{
                open: coilToShow ? coilToShow.id === coil.id : false,
                ...uiHandler.seriesCardDialog.menuProps,
              }}
              onAdd={() => uiHandler.seriesCardDialog.onAdd(coil)}
            />
          </>
        ))}
      </Box>
    </Popover>
  );
};

const SeriesCardDialog = ({
  series,
  menuProps,
  onAdd
}: {
  series: CoilSeriesType
  menuProps: MenuProps;
  onAdd: () => void
}) => {
  return (
    <Modal
      open={menuProps.open}
      onClose={menuProps.onClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CoilManagmentCard
        coilSeries={series.id}
        renderInHeader={(
          <IconButton size='small' onClick={onAdd}>
            <Add fontSize='small' />
          </IconButton>
        )} />
    </Modal>
  );
};

const useStyles = () => {
  return createStyles({
    popover: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '50vh',
    },
    box: {
      overflowY: 'auto',
    },
  });
};
