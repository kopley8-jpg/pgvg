import { Button, IconButton, MenuItem, Modal, Popover } from '@mui/material';
import { useState } from 'react';
import PopupState from 'material-ui-popup-state';
import React from 'react';
import { PodSeriesCard } from '../PodSeriesCard/PodSeriesCard';
import { Add, Cancel } from '@mui/icons-material';

interface ICreatePodSeriesModal {
  open: boolean;
  onClose: () => void;
}

export const CreatePodSeriesModal = (props: ICreatePodSeriesModal) => {
  const { open, onClose } = props;

  const [podSeries, setPodSeries] = useState({
    name: 'Название?',
    capacity: [0],
    ohms: [0],
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{}}
      slotProps={{
        root: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      }}
    >
      <div
        style={{
          width: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton>
            <Cancel />
          </IconButton>
          <IconButton>
            <Add />
          </IconButton>
        </div>
        <PodSeriesCard platform={{ ...podSeries, id: '0' }} />
      </div>
    </Modal>
  );
};

export default CreatePodSeriesModal;
