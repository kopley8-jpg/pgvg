import { MenuItem, Modal, Popover } from '@mui/material';
import { useState } from 'react';
import PopupState from 'material-ui-popup-state';
import React from 'react';

interface ICreatePodSeriesModal {
  open: boolean;
  onClose: () => void;
}

export const CreatePodSeriesModal = (props: ICreatePodSeriesModal) => {
  const [podSeries, setPodSeries] = useState({
    name: 'Название?',
    capacity: [0],
    ohms: [0],
  });

  return (
    <div
      style={{
        height: '300px',
        backgroundColor: 'purple',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '200px',
          height: '50px',
          backgroundColor: 'red',
        }}
      />
      <div
        style={{
          height: '50px',
          backgroundColor: 'green',
        }}
      />
    </div>
  );
};

if (import.meta.hot) {
  import.meta.hot.accept();
}

export default CreatePodSeriesModal;
