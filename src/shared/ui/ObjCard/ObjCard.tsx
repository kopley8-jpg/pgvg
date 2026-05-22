import type React from 'react';
import type { IObjCard } from './types';
import { createStyles } from '@/shared/lib/createStyles';

export const ObjCard = <T extends Record<string, any>>({
  photoURL,
  data,
  translatedNamesForKeys,
  renderInHeader,
  styles: propsStyles,
  renderForKeys,
}: IObjCard<T>) => {

  const styles = useStyles()

  return (
    <div style={{ ...styles.container, ...propsStyles?.container }}>
      {photoURL ? (
        <img
          src={photoURL}
          style={{ ...styles.img, ...propsStyles?.photo }} />
      ) : (<></>)}

      <div
        style={{ ...styles.info, ...propsStyles?.infoContainer }}
      >
        <div style={{ ...styles.header, ...propsStyles?.header }}>
          {renderInHeader()}
        </div>
        <div style={{ ...styles.props, ...propsStyles?.props }}>
          {renderForKeys.map(render => (
            <>
              {!render.options?.hideKeyName ? (
                <div style={{ ...styles.prop, ...propsStyles?.prop, ...render.options?.style }}>
                  <div style={styles.propKeyNameContainer}>
                    <span>{translatedNamesForKeys ? translatedNamesForKeys[render.key] : render.key.toString()}</span>
                  </div>
                  <div style={{ ...styles.propContentContainer }}>
                    {render.renderItem(render.key, data[render.key])}
                  </div>
                </div>
              ) : (
                <div style={{ ...styles.prop, ...propsStyles?.prop, border: "0px black solid" }}>
                  <div style={{ ...styles.propContentContainer, width: "100%" }}>
                    {render.renderItem(render.key, data[render.key])}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};


const useStyles = () => {


  return createStyles({
    container: {
      border: "2px grey solid",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      height: "35vh"
    },
    img: {
      objectFit: "contain",
      height: "100%"
    },
    info: {
      display: "flex",
      flexDirection: "column",
      width: "40vw"
    },
    header: {
      borderBottom: "2px grey solid",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: "1vw",
      paddingRight: "1vw",
      gap: "0.5vw",
    },
    props: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      paddingTop: "0.5vh",
      paddingBottom: "0.5vh",
      gap: "0.5vh",
      paddingLeft: "1vw",
      paddingRight: "1vw",
      overflowY: "auto"
    },
    prop: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      border: "2px grey solid",
      borderRadius: "20px",
    },
    propKeyNameContainer: {
      backgroundColor: "grey",
      width: "50%",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
    },
    propContentContainer: {
      minWidth: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }
  })
}