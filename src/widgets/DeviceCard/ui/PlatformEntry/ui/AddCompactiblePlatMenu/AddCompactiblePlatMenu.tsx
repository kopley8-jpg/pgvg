import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { bindMenu } from 'material-ui-popup-state';
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

export const AddCompactiblePlatMenu = ({ onPick }: IAddCompactiblePlatMenu) => {
  const { pickedTab, podSerieses, loadingPods, popupState, handleTabsChange } =
    useAddCompatiblePlats({
      onPick,
    });

  const [searchedText, setSearchedText] = useState('');

  const filteredSerieses = podSerieses.filter((s) =>
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
        {podSerieses.length === 0 || loadingPods ? (
          <MenuItem>Загрузка...</MenuItem>
        ) : (
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
                aria-label="basic tabs example"
              >
                <Tab label="Картриджи" />
                <Tab label="Танки" />
              </Tabs>
            </Box>
            <Box sx={{ overflowY: 'auto' }}>
              {filteredSerieses.map((series) => (
                <MenuItem onClick={popupState.close}>{series.name}</MenuItem>
              ))}
            </Box>
          </>
        )}
      </Popover>
    </React.Fragment>
  );
};

interface ICustomTabPanel {
  value: number;
  index: number;
  children?: React.ReactNode;
}

const CustomTabPanel = (props: ICustomTabPanel) => {
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
