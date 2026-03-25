import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  Stack,
  TextField,
} from '@mui/material';
import { styleSheetCreate } from '../../lib';
import { Add, Close, Delete, Save } from '@mui/icons-material';
import type React from 'react';
import { useState } from 'react';

interface IObjCard<TObj extends Record<string, any>> {
  photo?: string;
  data: TObj;
  renderHeaderItem: () => React.ReactNode;
  renderArrayObj?: <K extends keyof TObj>(
    key: keyof TObj,
    value: TObj[K] extends object[] ? TObj[K] : never
  ) => React.ReactNode;
  filterProps: string[];
}

export const ObjCard = <TObj extends Record<string, any>>({
  photo,
  filterProps,
  data,
  renderArrayObj,
  renderHeaderItem,
}: IObjCard<TObj>) => {
  return (
    <div
      style={{ ...ObjCardStyles.container, ...(!photo && { height: 'auto' }) }}
    >
      {photo && <img src={photo} style={ObjCardStyles.photo} />}
      <div style={ObjCardStyles.content}>
        <div style={ObjCardStyles.obj}>
          <div style={ObjCardStyles.header}>
            <div style={ObjCardStyles.headerCenter}>{renderHeaderItem()}</div>
            <div style={ObjCardStyles.headerSides}>
              <svg
                style={{ width: '30%', aspectRatio: 1 / 1 }}
                fill="none"
                viewBox="0 0 10 10"
                stroke-width="1.5"
                stroke="red"
                preserveAspectRatio="none"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M0,0 L10,10 M0,10 L10,0"
                />
              </svg>
            </div>
          </div>
          <div style={ObjCardStyles.propsContainer}>
            {Object.entries(data)
              .filter(([key]) =>
                filterProps.every((filteredKey) => key != filteredKey)
              )
              .map(([key, value]) => {
                const typedKey = key as keyof TObj;

                // Примитивные значения (string, number)
                if (typeof value === 'string' || typeof value === 'number') {
                  return (
                    <PrimitiveValue
                      key={key}
                      keyName={key}
                      value={value}
                      showKeyName={true}
                    />
                  );
                }

                // Массивы
                if (Array.isArray(value)) {
                  // Массив примитивов (string[] или number[])
                  if (
                    value.length === 0 ||
                    value.every((item) => typeof item === 'string') ||
                    value.every((item) => typeof item === 'number')
                  ) {
                    return (
                      <ArrayPrimitiveValue
                        data={value as string[] | number[]}
                        keyName={key}
                      />
                    );
                  }

                  // Массив объектов - используем renderArrayObj
                  return <>{renderArrayObj?.(typedKey, value as any)}</>;
                }

                // Другие типы (объекты и т.д.)
                return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ObjCardStyles = styleSheetCreate({
  container: {
    width: '95%',
    height: '45%',
    display: 'flex',
    flexDirection: 'row',

    flexShrink: 0,
    borderRadius: '20px',
    border: '2px, white solid',
  },
  photo: {
    height: '100%',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    objectFit: 'contain',
    borderRight: '2px white solid',
  },
  obj: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    paddingTop: '2.5px',
    paddingBottom: '2.5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '2px white solid',
  },
  headerSides: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    height: '100%',
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  },
  content: {
    height: '100%',
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
  },
  propsContainer: {
    height: '100%',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '5%',
    gap: '5px',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  deleteButton: {
    height: '100%',
    width: '10%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderLeft: '2px white solid',
    borderRadius: 0,
  },
});

interface IArrayObj<T> {
  value: T[];
  keyName: string;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const ArrayObj = <T,>({ value, keyName, renderItem }: IArrayObj<T>) => {
  return (
    <div style={ArrayObjStyles.container}>
      <div style={ArrayObjStyles.header}>{keyName}:</div>
      <div style={ArrayObjStyles.content}>
        {value.map((item, index) => (
          <>{renderItem(item, index)}</>
        ))}
        <IconButton>
          <Add />
        </IconButton>
      </div>
    </div>
  );
};

const ArrayObjStyles = styleSheetCreate({
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  header: {
    width: '100%',
    marginBottom: '4px',
  },
  content: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    paddingTop: '2.5%',
    gap: '1%',
    paddingBottom: '2.5%',

    overflowY: 'auto',
    borderRadius: '20px',
    borderLeft: '2px white solid',
  },
});

interface IArrayPrimitiveValue {
  data: string[] | number[];
  keyName: string;
}

const ArrayPrimitiveValue = ({ data, keyName }: IArrayPrimitiveValue) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div style={ArrayPrimitiveValueStyles.container}>
      <a style={ArrayPrimitiveValueStyles.key}>{keyName}:</a>
      <div>
        {isEditing ? (
          <ArrayPrimitiveEditor values={data} open={isEditing} />
        ) : (
          <div onClick={() => setIsEditing(true)}>
            <Chip label={data.join(', ')} size="small" />
          </div>
        )}
      </div>
    </div>
  );
};

interface IArrayPrimitiveEditor {
  values: string[] | number[];
  open: boolean;
  // onSave: (newValues: (string | number)[]) => void;
  // onCancel: () => void;
}

const ArrayPrimitiveEditor = () => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100px',
        height: '100px',
        backgroundColor: 'red',
      }}
    ></div>
  );
};

const ArrayPrimitiveEditorStyles = styleSheetCreate({
  container: {
    width: '50vw',
    height: '50vh',
    backgroundColor: 'grey',
  },
});

const ArrayPrimitiveValueStyles = styleSheetCreate({
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  key: {},
  value: {
    color: '#333',
  },
});

interface IPrimitiveValue {
  keyName: string;
  value: number | string;
  showKeyName: boolean;
}

export const PrimitiveValue = ({
  keyName,
  value,
  showKeyName,
}: IPrimitiveValue) => {
  return (
    <div style={PrimitiveValueStyles.container}>
      {showKeyName && <a style={PrimitiveValueStyles.key}>{keyName}:</a>}
      <a>{value}</a>
    </div>
  );
};

interface IPrimitiveValueEditor {
  value: number | string;
}

const PrimitiveValueEditor = ({ value }: IPrimitiveValueEditor) => {
  return (
    <TextField
      value={value}
      size="small"
      slotProps={{
        input: {
          style: {
            width: 'auto',
            minWidth: '20px',
          },
        },
      }}
      sx={{
        width: 'auto',
        '& .MuiInputBase-root': {
          height: 'auto',
          width: 'auto',
          minWidth: '20px',
        },
        '& .MuiInputBase-input': { padding: 0 },
      }}
    />
  );
};

const PrimitiveValueStyles = styleSheetCreate({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  key: {},
  value: {
    color: '#333',
  },
});
