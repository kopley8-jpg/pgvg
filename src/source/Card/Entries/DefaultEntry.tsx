import { Box, Button, Chip, IconButton, TextField, Typography } from '@mui/material';
import { AddTwoTone, Cancel, Delete, Save } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { createStyles, createStyless } from '../../lib';


interface ArrayObjsValueCase {
  keyName: string,
  value: object[],
  onValueChange: (objPath: string, entryName: string, value: any) => void
}

//просто крафтим контейнер для массива 
const ArrayObjsValueCase = ({ keyName, value, onValueChange }: ArrayObjsValueCase) => {

  return (
    <Box sx={stylesArrayObjsCase.container}>
      <Box sx={stylesArrayObjsCase.header}>
        <Typography fontWeight={600}>{keyName}</Typography>
      </Box>
      <Box sx={stylesArrayObjsCase.propsContainer}>
        {value.map(item => (
          <ObjValueCase onValueChange={() => { }} headerTextDisplay={(item as any).name} value={item} ignoreKeyNames={["type", "id", "name"]} />
        ))}
        <IconButton sx={{ width: "100%", borderRadius: "0px" }} >
          <AddTwoTone />
        </IconButton>
      </Box>
    </Box>
  )
}

const stylesArrayObjsCase = createStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    boxSizing: "border-box"
  },
  header: {
    width: "100%",
  },
  propsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    boxSizing: "border-box",
    p: "10px",
    gap: "16px",
    borderLeft: "2px solid white",
    borderRadius: "20px",
  }
})




interface IObjValueCase {
  headerTextDisplay: string,
  photo?: string,
  value: object,
  ignoreKeyNames: string[],
  onValueChange: (keyName: string, value: any) => void
}

export const ObjValueCase = ({ headerTextDisplay, photo, value, ignoreKeyNames, onValueChange }: IObjValueCase) => {

  const handleValueChange = (entryName: string, value: any) => {
    onValueChange(entryName, value)
  }

  return (
    <div style={stylesObjValueCase.container}>
      {photo ? <img style={stylesObjValueCase.photo} src={photo} /> : <></>}
      <div style={stylesObjValueCase.content}>
        <div style={stylesObjValueCase.header}>
          <Typography sx={{ ml: "2%" }} fontWeight={600}>{headerTextDisplay}:</Typography>
        </div>
        <div style={stylesObjValueCase.props}>
          {Object.entries(value)
            .filter(([key]) => ignoreKeyNames.every(ignoreKeyName => key != ignoreKeyName))
            .map(([key, value], index) => (
              <>
                {typeof value === "string" || typeof value === "number" ? (
                  // случай примитивного значения просто текст нахуй 
                  <PrimitiveValueCase onValueChange={() => { }} keyName={key} value={value} />
                ) : (
                  <>
                    {Array.isArray(value) ? (
                      //случай массива примитивов (19.03.2026 0:46) щас хандлить этот случай нахуй не нужно но вдруг надо будет
                      <>
                        {value.every(item => typeof item === "string") || value.every(item => typeof item === "number") ? (
                          <ArrayPrimitiveValueCase keyName={key} value={value} />
                        ) : (
                          //не примитив, не массив примитивов? значит МАССИВ ОБЪЕКТОВ! (пока остальные типы не юзаются и быть здесь не может)
                          <ArrayObjsValueCase onValueChange={() => { }} keyName={key} value={value} />
                        )}
                      </>
                    ) : (<></>)}
                  </>
                )}
              </>
            ))}
        </div>
      </div>
      <IconButton sx={stylesObjValueCase.buttonsContainer} aria-label="delete" size="small">
        <Delete sx={{ width: "100%" }} />
      </IconButton>
    </div>
  )
}

const stylesObjValueCase = createStyless({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    border: "2px solid white",
    borderRadius: "20px",
  },
  photo: {
    objectFit: "contain",
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
  },
  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",

  },
  buttonsContainer: {
    width: "4%",
    display: "flex", // добавляем display
    flexDirection: "column",
    alignItems: "stretch", // растягиваем на всю высоту
    borderRadius: "0 18px 18px 0", // скругляем только правые углы
    borderLeft: "2px solid white",
  },
  props: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    flexWrap: "nowrap",
    boxSizing: "border-box",
    gap: "5px",
    paddingLeft: "2%",
  },
  header: {
    width: "100%",
    display: "flex",
    paddingY: "1%",
    flexDirection: "column",
    justifyContent: "center",
    borderBottom: "2px solid white",
  },
})





interface IArrayPrimitiveValueCase {
  keyName: string,
  value: string[] | number[]
}

const ArrayPrimitiveValueCase = ({ keyName, value }: IArrayPrimitiveValueCase) => {
  return (
    <Box sx={stylesArrayPrimitiveValueCase.container}>
      <Typography fontWeight={600}>{keyName}:</Typography>
      <Chip label={value.join(", ")} size='small' />
    </Box>
  )
}

const stylesArrayPrimitiveValueCase = createStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  }
})



interface IPrimitiveValueCase {
  keyName: string,
  value: string | number,
  onValueChange: (entryName: string, value: string) => void
}

const PrimitiveValueCase = ({ keyName, value, onValueChange }: IPrimitiveValueCase) => {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value.toString)

  const handleCancelButtonPress = () => {
    setIsEditing(false)
  }

  const handleConfirmButtonPress = () => {
    setIsEditing(false)
  }

  return (
    <Box sx={stylesPrimitiveValueCase.container}>
      <Typography fontWeight={600}>{keyName}:</Typography>
      {!isEditing ? (
        <div onClick={() => { setIsEditing(true) }} style={{ cursor: "alias" }}>
          <Typography fontWeight={600}>{value}</Typography>
        </div>
      ) : (
        <PrimitiveValueCaseEditor onChange={v => setLocalValue(v)} value={localValue.toString()} onConfirmButtonPress={handleConfirmButtonPress} onCancelButtonPress={handleCancelButtonPress} />
      )}
    </Box>
  )
}

interface IPrimitiveValueCaseEditor {
  value: string,
  onChange: (val: string) => void,
  onCancelButtonPress: () => void,
  onConfirmButtonPress: () => void
}

const PrimitiveValueCaseEditor = ({ value, onChange, onCancelButtonPress, onConfirmButtonPress }: IPrimitiveValueCaseEditor) => {

  return (
    <>
      <TextField
        onChange={p => onChange(p.target.value)}
        value={value}
        size='small'
        sx={{
          width: "50%",
          // Убираем лишние отступы
          '& .MuiInputBase-root': {
            height: '30px',           // фикс высота
            padding: '0 8px',         // убираем вертикальные отступы
          },
          '& .MuiInputBase-input': {
            padding: '0',              // убираем внутренние отступы
            height: '100%',
          }
        }}
      />
      <IconButton onClick={onCancelButtonPress}>
        <Cancel />
      </IconButton>
      <IconButton onClick={onConfirmButtonPress}>
        <Save />
      </IconButton>
    </>
  )
}

const stylesPrimitiveValueCase = createStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
  }
})