import { useState } from 'react';
import type { IDropDownList } from './DropDown.types';
import { useStyles } from './DropDown.styles';

export const DropDownList = <T extends string>({
  value,
  data,
  onPick,
}: IDropDownList<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = useStyles();

  return (
    <div style={{ position: 'relative' }}>
      {isOpen ? (
        <div style={styles.container}>
          {data.map((str) => (
            <span
              style={{ fontSize: '5vw', cursor: 'pointer' }}
              onClick={() => {
                onPick(str);
                setIsOpen(false);
              }}
            >
              {str}
            </span>
          ))}
        </div>
      ) : (
        <span
          onClick={() => setIsOpen(true)}
          style={{ fontSize: '5vw', cursor: 'pointer' }}
        >
          {value}
        </span>
      )}
    </div>
  );
};
