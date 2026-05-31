import { useStyles } from './styles';
import React, { useState } from 'react';
import { TextEditor } from '../../TextEditor/TextEditor';
import { convertToNumber } from '@/shared/lib/convertToNumber';

interface IPrimitiveValueEditor {
  value?: string | number | null;
  fontSize?: any;
  style?: React.CSSProperties
  onSaveButtonPress?: (newValue: string | number) => void;
  errorOptions?: {
    errorText: string;
    onErrorTextClick: () => void;
  };
}

export const TextValue = ({
  value,
  onSaveButtonPress,
  fontSize,
  errorOptions,
  style
}: IPrimitiveValueEditor) => {
  const styles = useStyles();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      {isEditing ? (
        <TextEditor
          style={style}
          value={value ? value.toString() : "значение?"}
          onCancelButtonPress={() => setIsEditing(false)}
          onSaveButtonPress={(p) => {
            onSaveButtonPress?.(convertToNumber(p));
            setIsEditing(false);
          }}
        />
      ) : (
        <span
          style={{
            ...styles.text,
            fontSize: fontSize ? fontSize : undefined,
          }}
          onClick={() => setIsEditing(true)}
        >
          {value ? value.toString() : "значение?"}
        </span>
      )}
    </>
  );
};
