import { useState } from 'react';
import { useStyles } from './ObjEntry.styles';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { MenuItem } from '@mui/material';

interface IObjEntryTwo {
  translatedNamesForKeys: Record<string, string>;
  entryName: string;
  style?: ObjEntryStylesType
  renderForKeys: (
    {
      key: string;
      renderItem: () => React.ReactNode;
      options?: { hideKeyName?: boolean }
    } | null
  )[];
}

export type ObjEntryStylesType = Partial<Record<(keyof ReturnType<typeof useStyles>), React.CSSProperties>>

export const ObjEntryTwo = ({
  entryName,
  style,
  translatedNamesForKeys,
  renderForKeys,
}: IObjEntryTwo) => {
  const styles = useStyles();

  const [open, setOpen] = useState(false)

  return (
    <div style={{ ...styles.container, ...style?.container }}>
      <MenuItem style={{ ...styles.entryName, ...style?.entryName }} onClick={() => setOpen(!open)}>
        {entryName}
        {open ? (
          <ArrowDropUp />
        ) : (
          <ArrowDropDown />
        )}
      </MenuItem>
      {open ? (
        <div style={{ ...styles.propsContainer, ...style?.propsContainer }}>
          {renderForKeys.map((render) => (
            <>
              {render ? (
                <>
                  {render.options?.hideKeyName ? (
                    <div style={{ ...styles.propContainer, ...style?.propContainer, border: "0px black solid" }}>
                      <div style={{ ...styles.propContentContainer, ...style?.propContentContainer }}>
                        {render.renderItem()}
                      </div>
                    </div>
                  ) : (
                    <div style={{ ...styles.propContainer, ...style?.propContainer }}>
                      <div style={{ ...styles.propKeyNameContainer, ...style?.propKeyNameContainer }}>
                        <span>
                          <span>{translatedNamesForKeys ? translatedNamesForKeys[render.key] : render.key.toString()}:</span>
                        </span>
                      </div>
                      <div style={{ ...styles.propContentContainer, ...style?.propContentContainer }}>
                        {render.renderItem()}
                      </div>
                    </div>
                  )}
                </>
              ) : (<></>)}
            </>
          ))}
        </div>
      ) : (<></>)}
    </div>
  );
};