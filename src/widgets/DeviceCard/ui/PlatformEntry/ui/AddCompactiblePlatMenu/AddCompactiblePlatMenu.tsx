import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindMenu } from 'material-ui-popup-state';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Popover,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Add, Close, Search } from '@mui/icons-material';
import type { IAddCompactiblePlatMenu } from './model/types';
import { useAddCompatiblePlats } from './model/useAddCompactiblePlats';
import { useState } from 'react';
import CreatePodSeriesModal from '@/widgets/createPodSeriesModal/createPodSeriesModal';

export const AddCompactiblePlatMenu = ({ onPick }: IAddCompactiblePlatMenu) => {
  const {
    pickedTab,
    podSerieses,
    loadingPods,
    tankSerieses,
    loadingTanks,
    popupState,
    handleTabsChange,
  } = useAddCompatiblePlats({
    onPick,
  });

  const [searchedText, setSearchedText] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const filteredSerieses =
    pickedTab === 'pods'
      ? podSerieses.filter((s) =>
          s.name.toLocaleLowerCase().includes(searchedText.toLowerCase())
        )
      : tankSerieses.filter((s) =>
          s.name.toLocaleLowerCase().includes(searchedText.toLowerCase())
        );

  return (
    <React.Fragment>
      <IconButton onClick={popupState.open}>
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
            <CustomTabPanel value={pickedTab} index={'pods'}>
              {podSerieses.length !== 0 && !loadingPods ? (
                <>
                  <MenuItem onClick={() => setModalOpen(true)}>
                    + Создать серию
                  </MenuItem>

                  <Popover open={modalOpen} onClose={() => setModalOpen(false)}>
                    <CreatePodSeriesModal
                      key={Math.random()}
                      open={modalOpen}
                      onClose={() => setModalOpen(false)}
                    />
                  </Popover>

                  {filteredSerieses.map((pod) => (
                    <MenuItem key={pod.name} onClick={() => popupState.close()}>
                      {pod.name}
                    </MenuItem>
                  ))}
                </>
              ) : (
                <MenuItem>Загрузка...</MenuItem>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={pickedTab} index={'tanks'}>
              {tankSerieses && tankSerieses.length !== 0 && !loadingTanks ? (
                <>
                  {filteredSerieses.map((tank) => (
                    <MenuItem onClick={() => popupState.close()}>
                      {tank.name}
                    </MenuItem>
                  ))}
                </>
              ) : (
                <MenuItem>Загрузка...</MenuItem>
              )}
            </CustomTabPanel>
          </Box>
        </>
      </Popover>
    </React.Fragment>
  );
};

interface ICustomTabPanel<T> {
  value: T;
  index: T;
  children?: React.ReactNode;
}

const CustomTabPanel = <T extends any>(props: ICustomTabPanel<T>) => {
  const { value, index, children } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
