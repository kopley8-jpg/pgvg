import { useStyles } from './ObjEntry.styles';

interface IObjEntry<T extends Record<string, any>> {
  data: T;
  entryName: string;
  translatedNamesForKeys?: Record<keyof T, string>;
  renderForKeys: {
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
        {renderForKeys.map((key) => (
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
