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
            <div style={{ ...styles.prop, ...propsStyles?.prop, ...render.options?.style }}>
              {!render.options?.hideKeyName ? (
                <div style={styles.propKeyNameContainer}>
                  <span>{translatedNamesForKeys ? translatedNamesForKeys[render.key] : render.key.toString()}</span>
                </div>
              ) : (<></>)}
              <div style={styles.propContentContainer}>
                {render.renderItem(render.key, data[render.key])}
              </div>
            </div>
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
      width: '60%'
    },
    img: {
      objectFit: "contain",
      maxWidth: "20vw"
    },
    info: {
      display: "flex",
      flexDirection: "column",
      width: "100%"
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
      height: "100%",
      display: "flex",
      flexDirection: "column",
      paddingTop: "0.5vh",
      paddingBottom: "0.5vh",
      gap: "0.5vh",
      paddingLeft: "1vw",
      paddingRight: "1vw"
    },
    prop: {
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
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
      justifyContent: "center"
    }
  })
}

const renderPropsByKeys = <T extends Record<string, any>, K extends keyof T>(
  data: T,
  keys: K[],
  renderItem: (key: K, value: T[K]) => React.ReactNode
) => {
  return keys.map((key) => <>{renderItem(key, data[key])}</>);
};


// <div style={{ ...styles.container, ...style?.container }}>
//   {photoURL ? (
//     <img src={photoURL ? photoURL : ''} style={styles.photo} />
//   ) : (<></>)}
//   <div style={{ ...styles.infoContainer, ...style?.infoContainer }}>
//     <div style={{ ...styles.header, ...style?.header }}>{renderInHeader()}</div>
//     <div style={{ ...styles.content, ...style?.content }}>
//       {renderForKeys.map((renderForKey) => (
//         <div style={{ ...styles.propContainer, ...style?.propContainer }}>
//           {renderForKey.options && renderForKey.options.hideKeyName ? (
//             <></>
//           ) : (
//             <span style={{ ...styles.propKeyName, ...style?.propKeyName }}>
//               {translatedNamesForKeys
//                 ? translatedNamesForKeys[renderForKey.key]
//                 : renderForKey.key.toString()}
//               :
//             </span>
//           )}
//           {renderForKey.renderItem(
//             renderForKey.key,
//             data[renderForKey.key]
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// </div>