import { useState } from 'react';
import type { PodType } from './model';
import { isArrayObj } from './lib';

interface IEntry {
  keyy: string;
  value: string | any[];
  onValueChange: (newValue: string) => void;
}

export const Entry = ({ keyy, value, onValueChange }: IEntry) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleChangeButtonClick = () => {
    setIsEditing(true);
  };

  const handleChangeCompleteButtonClick = (text: string) => {
    setIsEditing(false);
    onValueChange(text);
  };

  const handleChangeCancelButtonClick = () => {
    setIsEditing(false);
  };

  return (
    <div onClick={() => console.log(value)} key={keyy} style={styles.container}>
      <a>{keyy + ':'}</a>
      {!Array.isArray(value) ? (
        <StrValue str={value} />
      ) : (
        <>{isArrayObj(value) ? <ObjsList objs={value} /> : <></>}</>
      )}
    </div>
  );
};

interface IStrValue {
  str: string;
}

interface IObjsList {
  objs: object[];
}

const ObjsList = ({ objs }: IObjsList) => {
  return (
    <div style={styles.objsListContainer}>
      <div style={styles.objsList}>
        {objs.map((obj) => (
          <div style={styles.objItem}>
            <a>{(obj as any).Name}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

const StrValue = ({ str }: IStrValue) => {
  return <a>{str}</a>;
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    minHeight: '40px',
    backgroundColor: 'red',
    marginBottom: '8px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 10px',
    color: 'white',
    borderRadius: '8px',
    boxSizing: 'border-box',
    flexShrink: 0,
  },
  objsListContainer: {
    flex: 1, // занимает всё доступное место
    maxWidth: '100%', // ВАЖНО! позволяет сжиматься
    height: '100%',
    marginLeft: '8px',
  },

  objsList: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    overflowX: 'auto', // ← теперь будет работать!
    overflowY: 'hidden',
    padding: '4px 0',
    height: '100%',
  },

  objItem: {
    padding: '4px 12px',
    backgroundColor: '#4CAF50',
    borderRadius: '16px',
    color: 'white',
    fontSize: '14px',
    whiteSpace: 'nowrap', // текст не переносится
    flexShrink: 0, // не сжимается
    display: 'flex',
    alignItems: 'center',
    height: '28px',
  },
  text: {
    height: '100%',
    backgroundColor: 'yellow',
  },
  buttons: { backgroundColor: 'yellow' },
  changeButton: {
    height: '20px',
    backgroundColor: 'brown',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};
