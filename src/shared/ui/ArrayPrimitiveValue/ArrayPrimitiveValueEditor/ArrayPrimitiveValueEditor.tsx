import { Add, Cancel, Delete, Save } from '@mui/icons-material';
import { Divider, IconButton, Menu, MenuItem, Popover } from '@mui/material';
import { useState } from 'react';
import { useStyles } from './styles';
import { TextValue } from '../../PrimitiveValue/TextValue/TextValue';

interface IArrayPrimitiveValueEditor {
  value: (string | number)[];
  onSaveButtonClick: (newValue: (string | number)[]) => void;
  onCancelButtonClick: () => void;
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

export const ArrayPrimitiveValueEditor = (
  props: IArrayPrimitiveValueEditor
) => {
  const styles = useStyles();
  const { value, onClose, onSaveButtonClick } = props;
  const [localValues, setLocalValues] = useState<(string | number)[]>(value);

  const handleValueChanged = (id: number, newValue: string | number) => {
    setLocalValues((prev) =>
      prev.map((res, index) => (index === id ? newValue : res))
    );
  };

  const handleAddButtonClick = () => {
    setLocalValues((prev) => [...prev, '?']);
  };

  const handleDeleteItemButtonClick = (id: number) => {
    setLocalValues((p) => p.filter((_res, index) => index != id));
  };

  const handleCancelButtonClick = () => {
    onClose();
  };

  const handleSaveButtonClick = () => {
    onSaveButtonClick(localValues);
  };

  return (
    <Popover
      {...props}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{
        paper: {
          style: styles.container,
        },
      }}
    >
      <div style={styles.header}>
        <IconButton size="small">
          <Save fontSize="small" />
        </IconButton>
      </div>
      <Divider />
      {value.map((val) => (
        <MenuItem>{val}</MenuItem>
      ))}
    </Popover>
  );
};
