import { Switch } from '@mui/material';
import { useState } from 'react';

interface IBoolValue {
  value: boolean;
  showedText?: { positiveText: string; negativeText: string };
  onChange: (newValue: boolean) => void;
}

export const BoolValue = ({ value, showedText, onChange }: IBoolValue) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <>
      {isEditing ? (
        <Switch
          value={value}
          onClick={() => {
            onChange(!value);
            setIsEditing(false);
          }}
        />
      ) : (
        <a>
          {showedText
            ? value
              ? showedText.positiveText
              : showedText.negativeText
            : value
              ? 'Да'
              : 'Нет'}
        </a>
      )}
    </>
  );
};
