import {
  Box,
  IconButton,
  MenuItem,
  Modal,
  Popover,
  Tab,
  Tabs,
  TextField,
  type MenuProps,
  type ModalProps,
} from '@mui/material';
import type { ICompatiblePlatPicker } from './model/types';
import { useCompatiblePlatPicker } from './model/useCompatiblePlatPicker';
import { createStyles } from '@/shared/lib/createStyles';
import { Add, Search } from '@mui/icons-material';
import type { PodSeriesType } from '@/shared/types/pod-series';
import type { TankSeriesType } from '@/shared/types/tank-series';
import { PodManagmentCard } from '@/widgets/PodManagmentCard/PodManagmentCard';
import { TankManagmentCard } from '@/widgets/TankManagmentCard/TankManagmentCard';

export const CompatiblePlatPicker = (props: ICompatiblePlatPicker) => {
  const { plats, currentTab, platToShow, uiHandler } =
    useCompatiblePlatPicker(props);
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
      <Tabs value={currentTab} {...uiHandler.tabs}>
        <Tab label={'Поды'} id="pods" />
        <Tab label={'Танки'} id="tanks" />
      </Tabs>
      <Box sx={styles.box}>
        <MenuItem {...uiHandler.createSeriesButton}>+ Создать серию</MenuItem>
        {plats.map((plat) => (
          <>
            <MenuItem {...uiHandler.platItem(plat)}>{plat.name}</MenuItem>
            <SeriesCardDialog
              series={plat}
              menuProps={{
                open: platToShow ? platToShow.id === plat.id : false,
                ...uiHandler.seriesCardDialog.menuProps,
              }}
              onAdd={() => uiHandler.seriesCardDialog.onAdd(plat)}
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
  series:
  | ({ type: 'pod' } & PodSeriesType)
  | ({ type: 'tank' } & TankSeriesType);
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
      {series.type === 'pod' ? (
        <PodManagmentCard
          podSeries={series}
          renderInHeader={
            <IconButton size="small" onClick={() => {
              menuProps.onClose?.({}, "backdropClick")
              onAdd()
            }}>
              <Add fontSize="small" />
            </IconButton>
          }
        />
      ) : (
        <TankManagmentCard
          headerRender={(
            <IconButton size="small" onClick={() => {
              menuProps.onClose?.({}, "backdropClick")
              onAdd()
            }}>
              <Add fontSize="small" />
            </IconButton>
          )}
          tankSeries={series}
        />
      )}
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
