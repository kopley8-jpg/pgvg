import { useStyles } from './styles';
import { useState } from 'react';
import { TextEditor } from '../../TextEditor/TextEditor';
import { convertToNumber } from '@/shared/lib/convertToNumber';

interface IPrimitiveValueEditor {
  value: string | number;
  fontSize?: any;
  onSaveButtonPress?: (newValue: string | number) => void;
}

export const TextValue = ({
  value,
  onSaveButtonPress,
  fontSize,
}: IPrimitiveValueEditor) => {
  const styles = useStyles();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      {isEditing ? (
        <TextEditor
          value={value}
          onCancelButtonPress={() => setIsEditing(false)}
          onSaveButtonPress={(p) => {
            onSaveButtonPress?.(convertToNumber(p));
            setIsEditing(false);
          }}
        />
      ) : (
        <span
          style={{ ...styles.text, fontSize: fontSize ? fontSize : undefined }}
          onClick={() => setIsEditing(true)}
        >
          {value}
        </span>
      )}
    </>
  );
};
