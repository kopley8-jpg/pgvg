import type React from 'react';
import { useStyles } from './ObjCard.styles';
import type { IObjCard } from './types';
import { Key } from '@mui/icons-material';

export const ObjCard = <T extends Record<string, any>>({
  photoURL,
  data,
  translatedNamesForKeys,
  renderInHeader,
  renderForKeys,
}: IObjCard<T>) => {
  const styles = useStyles();

  return (
    <div style={styles.container}>
      <img src={photoURL ? photoURL : ''} style={styles.photo} />
      <div style={styles.infoContainer}>
        <div style={styles.header}>{renderInHeader()}</div>
        <div style={styles.content}>
          {renderForKeys.map((renderForKey) => (
            <div style={styles.propContainer}>
              {renderForKey.options && renderForKey.options.hideKeyName ? (
                <></>
              ) : (
                <a style={styles.propKeyName}>
                  {translatedNamesForKeys
                    ? translatedNamesForKeys[renderForKey.key]
                    : renderForKey.key.toString()}
                  :
                </a>
              )}
              {renderForKey.renderItem(
                renderForKey.key,
                data[renderForKey.key]
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const renderPropsByKeys = <T extends Record<string, any>, K extends keyof T>(
  data: T,
  keys: K[],
  renderItem: (key: K, value: T[K]) => React.ReactNode
) => {
  return keys.map((key) => <>{renderItem(key, data[key])}</>);
};
