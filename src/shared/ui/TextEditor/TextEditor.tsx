import { IconButton, TextField } from '@mui/material';
import { Save } from '@mui/icons-material';
import { useStyles } from './styles';
import React, { useState } from 'react';

interface IPrimitiveValueEditor {
  keyName?: string;
  value: string | number;
  style?: React.CSSProperties;
  onSaveButtonPress?: (newValue: string | number) => void;
  onCancelButtonPress?: () => void;
}

export const TextEditor = ({
  keyName,
  value,
  style,
  onSaveButtonPress,
}: IPrimitiveValueEditor) => {
  const styles = useStyles();
  const [localValue, setLocalValue] = useState(value);

  return (
    <div style={{ ...styles.container, ...style }}>
      <TextField
        onChange={(p) => {
          setLocalValue(p.target.value);
        }}
        variant="outlined"
        {...(keyName ? { label: keyName } : {})}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                size="small"
                style={styles.button}
                onClick={() => {
                  if (localValue === '') return;
                  onSaveButtonPress?.(localValue);
                }}
              >
                <Save fontSize="small" />
              </IconButton>
            ),
          },
        }}
        sx={styles.TextField}
        value={localValue}
      />
    </div>
  );
};
