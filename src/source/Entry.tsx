import { Box, Typography, } from "@mui/material"
import { createStyles } from "./lib"
import { array } from "firebase/firestore/pipelines"


interface IEntry {
  keyy: string,
  value: any[]
}

export const Entry = ({ keyy, value }: IEntry) => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.textKeyName}>
        {keyy}:
      </Typography>
      {typeof value === "string" || typeof value === "number" ? (
        <PrimitiveValue value={value} />
      ) : (
        <>
          {Array.isArray(value) && value.every(item => typeof item === 'object') ? (
            <ArrayObjValue val={value} />
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  )
}

const ArrayObjValue = ({ val }: { val: object[] }) => {
  return (
    <Box sx={styles.arrObjValueContainer}>
      {val.map(item => (
        <ObjValue val={item} />
      ))}
    </Box>
  )
}

const ObjValue = ({ val }: { val: object }) => {
  return (
    <Box sx={styles.objValueContainer}>
      {Object.entries(val).map(([key, value]) => (
        <></>
      ))}
    </Box>
  )
}


const PrimitiveValue = ({ value }: { value: number | string }) => {
  return (
    <Typography sx={styles.textKeyName}>
      {value}
    </Typography>
  )
}

const styles = createStyles({
  container: {
    width: "100%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0 10px",

    flexShrink: 0,
    flexWrap: "nowrap",
    boxSizing: "border-box",

    borderRadius: "20px",
    backgroundColor: "yellow",
  },
  textKeyName: {
    fontWeight: 'bold',
    color: '#333'
  },
  arrObjValueContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    paddingTop: "5px",
    paddindBottom: "5px",
    gap: "5px"
  },
  objValueContainer: {
    height: "60px",
    backgroundColor: "green",
    borderLeftWidth: "3px",
    borderLeftColor: "black",
    flexShrink: 0
  }
})



// interface IObjsList {
//   objs: object[];
// }

// type PrimitiveValue = string | number | boolean | null | undefined;
// // Обновленный Entry компонент
// export const Entry = ({ keyy, value, onValueChange }: { keyy: string, value: any[], onValueChange: () => {} }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   return (
//     <Box
//       onClick={() => console.log(value)}
//       sx={{
//         width: '98%',
//         minHeight: '60px',
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'flex-start',
//         bgcolor: '#f5f5f5',
//         boxSizing: 'border-box',
//         p: 1,
//         gap: 1,
//         flexShrink: 0,
//         borderRadius: 1,
//         mb: 1,
//         border: '1px solid #ddd'
//       }}
//     >
//       <Typography sx={{ minWidth: '80px', fontWeight: 'bold', color: '#333' }}>
//         {keyy}:
//       </Typography>

//       <Box sx={{ flex: 1 }}>
//         {!Array.isArray(value) ? (
//           <StrValue str={value} />
//         ) : (
//           <ObjsList objs={value} />
//         )}
//       </Box>
//     </Box>
//   );
// };

// // Компонент для отображения свойства в зависимости от типа
// const PropertyValue = ({ value }: { value: any }) => {

//   if (Array.isArray(value)) {
//     return <ArrayValue value={value} />;
//   }

//   // Для примитивов
//   return (
//     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//       {String(value)}
//     </Typography>
//   );
// };

// // Основной компонент ObjsList
// const ObjsList = ({ objs }: IObjsList) => {
//   return (
//     <Box sx={{ width: '100%' }}>
//       <Stack spacing={2}>
//         {objs.map((obj, objIndex) => (
//           <Box
//             key={objIndex}
//             sx={{
//               borderLeft: '2px solid #e0e0e0',
//               pl: 2,
//               py: 1,
//             }}
//           >
//             <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
//               <Typography variant="subtitle2" sx={{ mb: 1, color: '#666' }}>
//                 {(obj as any).name}:
//               </Typography>
//             </Box>

//             {Object.entries(obj)
//               .filter(([key]) => key != "id" && key != "type" && key != "name")
//               .map(([key, value]) => (
//                 <Box
//                   key={key}
//                   sx={{
//                     mb: 1.5,
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: "center",
//                     gap: 0.5,
//                   }}
//                 >
//                   <Typography variant="caption" sx={{ color: '#999' }}>
//                     {key}:
//                   </Typography>
//                   <Box sx={{ ml: 1 }}>
//                     <PropertyValue value={value} />
//                   </Box>
//                 </Box>
//               ))}
//           </Box>
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// // Компонент для отображения значения-массива
// const ArrayValue = ({
//   value,
//   onUpdate
// }: {
//   value: any[];
//   onUpdate?: (newValue: any[]) => void;
// }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   // Проверяем, массив ли примитивов
//   const isPrimitiveArray = value.every((v: any) =>
//     typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean'
//   );

//   if (!isPrimitiveArray) {
//     // Если массив объектов - просто показываем количество
//     return (
//       <ObjsList objs={value} />
//     );
//   }

//   // Для массивов примитивов
//   return (
//     <Box>
//       {isEditing ? (
//         <ArrayEditor
//           values={value}
//           onSave={(newValues) => {
//             onUpdate?.(newValues);
//             setIsEditing(false);
//           }}
//           onCancel={() => setIsEditing(false)}
//         />
//       ) : (
//         <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', gap: 1 }}>
//           {!isEditing && <CollapsedArray values={value} onClick={() => setIsEditing(true)} />}
//         </Box>
//       )}
//     </Box>
//   );
// };

// // Компонент для редактирования массива
// const ArrayEditor = ({
//   values,
//   onSave,
//   onCancel
// }: {
//   values: PrimitiveValue[];
//   onSave: (newValues: PrimitiveValue[]) => void;
//   onCancel: () => void;
// }) => {
//   const [items, setItems] = useState<PrimitiveValue[]>(values);
//   const [newItem, setNewItem] = useState('');

//   const handleAddItem = () => {
//     if (newItem.trim()) {
//       setItems([...items, newItem]);
//       setNewItem('');
//     }
//   };

//   const handleRemoveItem = (index: number) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   const handleItemChange = (index: number, value: string) => {
//     const newItems = [...items];
//     newItems[index] = value;
//     setItems(newItems);
//   };

//   return (
//     <Box sx={{ mt: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
//       <Stack spacing={1}>
//         {items.map((item, idx) => (
//           <Box key={idx} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//             <TextField
//               size="small"
//               value={String(item)}
//               onChange={(e) => handleItemChange(idx, e.target.value)}
//               sx={{ width: "100%" }}
//             />
//             <IconButton size="small" onClick={() => handleRemoveItem(idx)} color="error">
//               <DeleteIcon fontSize="small" />
//             </IconButton>
//           </Box>
//         ))}

//         <Box sx={{ display: 'flex', gap: 1 }}>
//           <TextField
//             size="small"
//             placeholder="Новый элемент"
//             value={newItem}
//             onChange={(e) => setNewItem(e.target.value)}
//             sx={{ width: "100%" }}
//           />
//           <IconButton size="small" onClick={handleAddItem} color="primary">
//             <AddIcon />
//           </IconButton>
//         </Box>

//         <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "flex-start", gap: 1, justifyContent: 'flex-end', mt: 1 }}>
//           <Button size="small" onClick={onCancel} startIcon={<CloseIcon />}>
//             Отмена
//           </Button>
//           <Button
//             size="small"
//             variant="contained"
//             onClick={() => onSave(items)}
//             startIcon={<SaveIcon />}
//           >
//             Сохранить
//           </Button>
//         </Box>
//       </Stack>
//     </Box>
//   );
// };

// // Компонент для отображения массива в свернутом виде
// const CollapsedArray = ({ values, onClick }: { values: PrimitiveValue[], onClick: () => void }) => {
//   const displayText = values
//     .slice(0, 3)
//     .map(v => String(v))
//     .join(', ');

//   const remainingCount = values.length - 3;

//   return (
//     <Tooltip title={values.map(v => String(v)).join(', ')} onClick={onClick}>
//       <Chip
//         size="small"
//         label={
//           <span style={{ fontSize: '0.7rem' }}>
//             {displayText}
//             {remainingCount > 0 && ` +${remainingCount}`}
//           </span>
//         }
//         sx={{ maxWidth: '150px' }}
//       />
//     </Tooltip>
//   );
// };

// const StrValue = ({ str }: { str: string }) => {
//   return <Typography sx={{ color: '#666' }}>{str}</Typography>;
// };