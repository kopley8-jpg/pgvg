import { useStyles } from './styles';
import { useState } from 'react';
import { TextEditor } from '../../TextEditor/TextEditor';
import { convertToNumber } from '@/shared/lib/convertToNumber';

interface IPrimitiveValueEditor {
  value?: string | number | null;
  fontSize?: any;
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
}: IPrimitiveValueEditor) => {
  const styles = useStyles();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      {value ? (
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
              style={{
                ...styles.text,
                fontSize: fontSize ? fontSize : undefined,
              }}
              onClick={() => setIsEditing(true)}
            >
              {value}
            </span>
          )}
        </>
      ) : (
        <span
          style={{ ...styles.text, fontSize: fontSize ? fontSize : undefined }}
          onClick={() => errorOptions?.onErrorTextClick?.()}
        >
          {errorOptions ? errorOptions.errorText : 'undefined'}
        </span>
      )}
    </>
  );
};
