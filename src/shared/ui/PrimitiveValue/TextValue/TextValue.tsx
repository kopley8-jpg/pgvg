import { useStyles } from './styles';
import { useState } from 'react';
import { TextEditor } from '../../TextEditor/TextEditor';
import { convertToNumber } from '@/shared/lib/convertToNumber';

interface IPrimitiveValueEditor {
  value: string | number;
  onSaveButtonPress?: (newValue: string | number) => void;
}

export const TextValue = ({
  value,
  onSaveButtonPress,
}: IPrimitiveValueEditor) => {
  const styles = useStyles();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div style={styles.container}>
      {isEditing ? (
        <TextEditor
          value={value}
          onCancelButtonPress={() => setIsEditing(false)}
          onSaveButtonPress={(p) => onSaveButtonPress?.(convertToNumber(p))}
        />
      ) : (
        <a style={styles.text} onClick={() => setIsEditing(true)}>
          {value}
        </a>
      )}
    </div>
  );
};
