import { useStyles } from './ObjEntry.styles';

interface IObjEntry<T extends Record<string, any>> {
  data: T;
  entryName: string;
  translatedNamesForKeys?: Record<keyof T, string>;
  renderForKeys: (data: T) => {
    options?: { hideKeyName?: boolean };
    key: keyof T;
    renderItem: (key: keyof T, value: T[keyof T]) => React.ReactNode;
  }[];
}

export const ObjEntry = <T extends Record<string, any>>({
  data,
  entryName,
  translatedNamesForKeys,
  renderForKeys,
}: IObjEntry<T>) => {
  const styles = useStyles();

  return (
    <div style={styles.container}>
      <div style={styles.entryName}>
        <span>{entryName}</span>
      </div>
      <div style={styles.propsContainer}>
        {renderForKeys(data).map((key) => (
          <div style={styles.propContainer}>
            {key.options?.hideKeyName ? (
              <></>
            ) : (
              <span style={styles.entryName}>
                {translatedNamesForKeys
                  ? translatedNamesForKeys[key.key]
                  : key.key.toString()}
                :
              </span>
            )}
            {key.renderItem(key.key, data[key.key])}
          </div>
        ))}
      </div>
    </div>
  );
};


interface IObjEntryTwo {
  translatedNamesForKeys: Record<string, string>;
  entryName: string;
  style?: ObjEntryStyles
  renderForKeys: (
    {
      key: string;
      renderItem: () => React.ReactNode;
      options?: { hideKeyName?: boolean }
    } | null
  )[];
}

export type ObjEntryStyles = {
  container?: React.CSSProperties,
  entryName?: React.CSSProperties,
  propsContainer?: React.CSSProperties,
  propContainer?: React.CSSProperties,
}

export const ObjEntryTwo = ({
  entryName,
  style,
  translatedNamesForKeys,
  renderForKeys,
}: IObjEntryTwo) => {
  const styles = useStyles();

  return (
    <div style={{ ...styles.container, ...style?.container }}>
      <div style={{ ...styles.entryName, ...style?.entryName }}>
        <span>{entryName}</span>
      </div>
      <div style={{ ...styles.propsContainer, ...style?.propsContainer }}>
        {renderForKeys.map((key) => (
          <>
            {key ? (
              <div style={{ ...styles.propContainer, ...style?.propContainer }}>
                {key.options?.hideKeyName ? (
                  <></>
                ) : (
                  <span style={{ ...styles.entryName, ...style?.entryName }}>
                    {translatedNamesForKeys
                      ? translatedNamesForKeys[key.key]
                      : key.key.toString()}
                    :
                  </span>
                )}
                {key.renderItem()}
              </div>
            ) : (<></>)}
          </>
        ))}
      </div>
    </div>
  );
};