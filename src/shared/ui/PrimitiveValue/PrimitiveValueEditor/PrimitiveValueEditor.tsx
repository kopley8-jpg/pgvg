import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { useStyles } from './styles';
import { useState } from 'react';

interface IPrimitiveValueEditor {
  keyName?: string;
  value: string | number;

  onSaveButtonPress?: (newValue: string | number) => void;
  onCancelButtonPress?: () => void;
}

export const PrimitiveValueEditor = ({
  keyName,
  value,
  onCancelButtonPress,
  onSaveButtonPress,
}: IPrimitiveValueEditor) => {
  const styles = useStyles();
  const [localValue, setLocalValue] = useState(value);

  return (
    <div style={styles.container}>
      <TextField
        onChange={(p) => setLocalValue(p.target.value)}
        variant="outlined"
        {...(keyName ? { label: keyName } : {})}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                size="small"
                style={styles.button}
                onClick={() => onSaveButtonPress?.(localValue)}
              >
                <Save fontSize="small" />
              </IconButton>
            ),
          },
        }}
        sx={styles.TextField}
        value={localValue}
      />
      <IconButton
        size="small"
        style={styles.button}
        onClick={() => onCancelButtonPress?.()}
      >
        <Cancel fontSize="small" />
      </IconButton>
    </div>
  );
};
