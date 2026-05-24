import {
  Box,
  Divider,
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
import { useCompatiblePlatPicker } from './model/useCompatibleCoilPicker';
import { createStyles } from '@/shared/lib/createStyles';
import { Add, Search } from '@mui/icons-material';
import type { PodSeriesType } from '@/shared/types/pod-series';
import type { TankSeriesType } from '@/shared/types/tank-series';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { PodManagmentCard } from '@/widgets/PodManagmentCard/PodManagmentCard';
import { pushPodSeries } from '@/features/pod-managment/push-pod-series/push-pod-series';
import { pushTankSeries } from '@/features/tank-managment/push-tank-series/push-tank-series';
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
}: {
  series:
    | ({ type: 'pod' } & PodSeriesType)
    | ({ type: 'tank' } & TankSeriesType);
  menuProps: MenuProps;
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
            <IconButton size="small">
              <Add fontSize="small" />
            </IconButton>
          }
        />
      ) : (
        <TankManagmentCard tankSeries={series} />
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
