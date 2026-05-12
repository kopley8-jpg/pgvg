import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, {
  bindMenu,
  bindPopover,
  bindTrigger,
} from 'material-ui-popup-state';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  Popover,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add,
  Close,
  Delete,
  MenuBook,
  MoreVert,
  Search,
} from '@mui/icons-material';
import type { IAddCompactiblePlatMenu } from './model/types';
import { useAddCompatiblePlats } from './model/useAddCompactiblePlats';
import { useState } from 'react';
import { CreatePodSeriesModal } from '@/widgets/createPodSeriesModal/CreatePodSeriesModal';
import type { PopupState as PopupStateType } from 'material-ui-popup-state/hooks';
import type { PodSeriesType } from '@/entities/pods/model/types';
import type { TankSeriesType } from '@/entities/tanks/model/types';
import { PodSeriesCard } from '@/widgets/PodSeriesCard/PodSeriesCard';
import { TankSeriesCard } from '@/widgets/TankSeriesCard/TankSeriesCard';

export const AddCompactiblePlatMenu = ({ onPick }: IAddCompactiblePlatMenu) => {
  const {
    pickedTab,
    podSerieses,
    loadingPods,
    tankSerieses,
    loadingTanks,
    handlePick,
    popupState,
    handleTabsChange,
  } = useAddCompatiblePlats({
    onPick,
  });

  const [searchedText, setSearchedText] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const filteredSerieses = <T extends TankSeriesType | PodSeriesType>(
    series: T[]
  ) => {
    return series.filter((s) =>
      s.name.toLocaleLowerCase().includes(searchedText.toLowerCase())
    );
  };

  return (
    <React.Fragment>
      <IconButton onClick={popupState.open} sx={{ width: "100%" }}>
        <Add />
      </IconButton>
      <Popover
        slotProps={{
          paper: {
            style: {
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        {...bindMenu(popupState)}
      >
        <>
          <TextField
            size="small"
            slotProps={{
              input: {
                endAdornment: <Search />,
              },
            }}
            onChange={(p) => setSearchedText(p.target.value)}
          />
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={pickedTab === 'pods' ? 0 : 1}
              onChange={handleTabsChange}
            >
              <Tab label="Картриджи" />
              <Tab label="Танки" />
            </Tabs>
          </Box>
          <Box sx={{ overflowY: 'auto' }}>
            {pickedTab === 'pods' ? (
              <Box>
                <CreateSeriesButton type="pod" />
                {filteredSerieses(podSerieses).map((podSeries) => (
                  <SeriesMenuItem
                    onPick={() =>
                      handlePick({ type: 'pod', series: podSeries })
                    }
                    series={{ type: 'pod', series: podSeries }}
                    popupState={popupState}
                  />
                ))}
              </Box>
            ) : (
              <Box>
                <CreateSeriesButton type="tank" />
                {filteredSerieses(tankSerieses).map((tankSeries) => (
                  <SeriesMenuItem
                    onPick={() =>
                      handlePick({ type: 'tank', series: tankSeries })
                    }
                    series={{ type: 'tank', series: tankSeries }}
                    popupState={popupState}
                  />
                ))}
              </Box>
            )}
          </Box>
        </>
      </Popover>
    </React.Fragment>
  );
};

const SeriesMenuItem = (props: {
  series:
  | { type: 'pod'; series: PodSeriesType }
  | { type: 'tank'; series: TankSeriesType };
  popupState: PopupStateType;
  onPick: () => void;
}) => {
  const { series, popupState, onPick } = props;
  return (
    <PopupState variant="popover">
      {(state) => (
        <>
          <MenuItem key={series.series.name} onClick={() => state.open()}>
            {series.series.name}
          </MenuItem>
          {series.type === 'pod' ? (
            <PodSeriesDialog
              onPick={onPick}
              series={series.series}
              open={state.isOpen}
              onClose={() => state.close()}
            />
          ) : (
            <TankSeriesDialog
              onPick={onPick}
              series={series.series}
              open={state.isOpen}
              onClose={() => state.close()} />
          )}
        </>
      )}
    </PopupState>
  );
};

const TankSeriesDialog = (props: {
  series: TankSeriesType;
  open: boolean;
  onClose: () => void;
  onPick: () => void;
}) => {
  const { series, open, onClose, onPick } = props;

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
      <TankSeriesCard
        tankSeries={series}
        headerRightRender={() => (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <PopupState variant="popover">
              {(state) => (
                <>
                  <IconButton {...bindTrigger(state)}>
                    <MoreVert />
                  </IconButton>
                  <Menu {...bindPopover(state)}>
                    <MenuItem
                      sx={{
                        color: 'red',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                      }}
                    >
                      <Delete />
                      Удалить серию
                    </MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
            <IconButton onClick={onPick}>
              <Add />
            </IconButton>
          </div>
        )}
      />
    </Modal>
  );
};


const PodSeriesDialog = (props: {
  series: PodSeriesType;
  open: boolean;
  onClose: () => void;
  onPick: () => void;
}) => {
  const { series, open, onClose, onPick } = props;

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
      <PodSeriesCard
        podSeries={series}
        headerRightRender={() => (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <PopupState variant="popover">
              {(state) => (
                <>
                  <IconButton {...bindTrigger(state)}>
                    <MoreVert />
                  </IconButton>
                  <Menu {...bindPopover(state)}>
                    <MenuItem
                      sx={{
                        color: 'red',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                      }}
                    >
                      <Delete />
                      Удалить серию
                    </MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
            <IconButton onClick={onPick}>
              <Add />
            </IconButton>
          </div>
        )}
      />
    </Modal>
  );
};

const CreateSeriesButton = ({ type }: { type: 'pod' | 'tank' }) => {
  return (
    <PopupState variant="popover">
      {(state) => (
        <>
          <MenuItem {...bindTrigger(state)}>
            {type === 'pod'
              ? '+ Создать серию подов'
              : '+ Создать серию танков'}
          </MenuItem>
          <CreatePodSeriesModal
            open={state.isOpen}
            onClose={() => state.close()}
          />
        </>
      )}
    </PopupState>
  );
};

// interface ICustomTabPanel<T> {
//   value: T;
//   index: T;
//   children?: React.ReactNode;
// }

// const CustomTabPanel = <T extends any>(props: ICustomTabPanel<T>) => {
//   const { value, index, children } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// };
