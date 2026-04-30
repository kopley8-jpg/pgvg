import { Add, Cancel, Delete, Save } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useStyles } from './styles';
import { TextValue } from '../../PrimitiveValue/TextValue/TextValue';

interface IArrayPrimitiveValueEditor {
  value: (string | number)[];
  onSaveButtonClick: (newValue: (string | number)[]) => void;
  onCancelButtonClick: () => void;
}

export const ArrayPrimitiveValueEditor = ({
  value,
  onCancelButtonClick,
  onSaveButtonClick,
}: IArrayPrimitiveValueEditor) => {
  const styles = useStyles();
  const [localValues, setLocalValues] = useState<(string | number)[]>(value);

  const handleValueChanged = (id: number, newValue: string | number) => {
    setLocalValues((prev) =>
      prev.map((res, index) => (index === id ? newValue : res))
    );
  };

  const handleAddButtonClick = () => {
    setLocalValues((prev) => [...prev, "?"]);
  };

  const handleDeleteItemButtonClick = (id: number) => {
    setLocalValues((p) => p.filter((_res, index) => index != id));
  };

  const handleCancelButtonClick = () => {
    onCancelButtonClick();
  };

  const handleSaveButtonClick = () => {
    onSaveButtonClick(localValues);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={styles.container}>
        <div style={styles.header}>
          <IconButton onClick={handleCancelButtonClick} size="small">
            <Cancel fontSize="small" />
          </IconButton>
          <IconButton onClick={handleSaveButtonClick} size="small">
            <Save fontSize="small" />
          </IconButton>
        </div>
        {localValues.map((val, index) => (
          <div style={styles.item}>
            <TextValue
              value={val}
              onSaveButtonPress={(p) => {
                handleValueChanged(index, p);
              }}
            />
            {localValues.length > 1 ? (
              <IconButton
                size="small"
                onClick={() => handleDeleteItemButtonClick(index)}
              >
                <Delete fontSize="small" />
              </IconButton>
            ) : (
              <></>
            )}
          </div>
        ))}
        <IconButton sx={{ width: '100%' }} onClick={handleAddButtonClick}>
          <Add />
        </IconButton>
      </div>
    </div>
  );
};
