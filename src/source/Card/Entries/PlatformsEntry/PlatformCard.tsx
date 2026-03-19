// import { Box, Chip, Typography } from '@mui/material';
// import { createStyles } from '../../../lib';
// import type { CoilType, PlatformType, TankType } from '../../../model';

// export const ObjValue = ({ keyName: }: { platform: PlatformType }) => {
//   return (
//     <Box sx={styles.container}>
//       <Box sx={styles.header}>
//         <Typography>{platform.name}</Typography>
//       </Box>
//       <Box sx={styles.propsContainer}>
//         {Object.entries(platform).map(([key, value], index) => (
//           <DefaultProperty keyName={key} value={value} />
//         ))}
//       </Box>
//     </Box>
//   );
// };

// const DefaultProperty = ({ keyName, value }: { keyName: string; value: any }) => {
//   return (
//     <>
//       {typeof value === 'string' || typeof value === 'number' ? (
//         <PrimitiveValue value={value} />
//       ) : (
//         <>
//           {Array.isArray(value) ? (
//             <>
//               {value.every((item) => typeof item === 'string') ||
//                 value.every((item) => typeof item === 'number') ? (
//                 <PrimitiveArrValue keyName={keyName} value={value} />
//               ) : (
//                 <ObjArrValue keyName={keyName} value={value} />
//               )}
//             </>
//           ) : (
//             <></>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// interface IObjArrValue {
//   keyName: string;
//   value: object[];
// }

// const ObjArrValue = ({ keyName, value }: IObjArrValue) => {
//   return (
//     <Box sx={objArrValueStyles.container}>
//       <Box sx={objArrValueStyles.header}>
//         <Typography>{keyName}</Typography>
//       </Box>
//       <Box sx={objArrValueStyles.propsContainer}>
//         {value.map((item) => (
//           <></>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// const objArrValueStyles = createStyles({
//   container: {
//     width: '100%',
//     minHeight: '40px',
//     backgroundColor: 'red',
//   },
//   header: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   propsContainer: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//   },
// });


// interface IPrimitiveArrValue {
//   keyName: string;
//   value: string[] | number[];
// }

// const PrimitiveArrValue = ({ keyName, value }: IPrimitiveArrValue) => {
//   return (
//     <Box sx={styles.propContainer}>
//       <Typography>{keyName}:</Typography>
//       <Chip
//         sx={styles.chipContainer}
//         size={'small'}
//         label={value.map((i) => i).join(', ')}
//       />
//     </Box>
//   );
// };

// const PrimitiveValue = ({ value }: { value: string | number }) => {
//   return (
//     <Box sx={styles.propContainer}>
//       <a>{value}</a>
//     </Box>
//   );
// };

// const styles = createStyles({
//   container: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#1a1a1a',
//     color: '#d6d6d6',
//     flexShrink: 0,
//     borderRadius: '20px',
//   },
//   header: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     boxSizing: 'border-box',
//   },
//   propsContainer: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   propContainer: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'row',
//     boxSizing: 'border-box',
//   },
//   propContainerValue: {
//     width: '100%',
//     display: 'flex',
//   },

//   chipContainer: {
//     backgroundColor: '#d6d6d6',
//   },
// });
