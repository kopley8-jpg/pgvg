import { Box, Button, Chip, IconButton, TextField, Typography } from '@mui/material';
import { AddTwoTone, Cancel, Delete, Save } from '@mui/icons-material';
import { useState } from 'react';
import { createStyles } from '../../lib';


interface ArrayObjsValueCase {
  keyName: string,
  value: object[]
}

//просто крафтим контейнер для массива 
const ArrayObjsValueCase = ({ keyName, value }: ArrayObjsValueCase) => {
  return (
    <Box sx={stylesArrayObjsCase.container}>
      <Box sx={stylesArrayObjsCase.header}>
        <Typography fontWeight={600}>{keyName}</Typography>
      </Box>
      <Box sx={stylesArrayObjsCase.propsContainer}>
        {value.map(item => (
          <ObjValueCase headerTextDisplay={(item as any).name} value={item} ignoreKeyNames={["type", "id", "name"]} />
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
  value: object,
  ignoreKeyNames: string[]
}

export const ObjValueCase = ({ headerTextDisplay, value, ignoreKeyNames }: IObjValueCase) => {
  return (
    <Box sx={stylesObjValueCase.container}>
      <Box sx={stylesObjValueCase.content}>
        <Box sx={stylesObjValueCase.header}>
          <Typography sx={{ ml: "4%" }} fontWeight={600}>{headerTextDisplay}:</Typography>
        </Box>
        <Box sx={stylesObjValueCase.props}>
          {Object.entries(value)
            .filter(([key]) => ignoreKeyNames.every(ignoreKeyName => key != ignoreKeyName))
            .map(([key, value], index) => (
              <>
                {typeof value === "string" || typeof value === "number" ? (
                  // случай примитивного значения просто текст нахуй 
                  <PrimitiveValueCase keyName={key} value={value} />
                ) : (
                  <>
                    {Array.isArray(value) ? (
                      //случай массива примитивов (19.03.2026 0:46) щас хандлить этот случай нахуй не нужно но вдруг надо будет
                      <>
                        {value.every(item => typeof item === "string") || value.every(item => typeof item === "number") ? (
                          <ArrayPrimitiveValueCase keyName={key} value={value} />
                        ) : (
                          //не примитив, не массив примитивов? значит МАССИВ ОБЪЕКТОВ! (пока остальные типы не юзаются и быть здесь не может)
                          <ArrayObjsValueCase keyName={key} value={value} />
                        )}
                      </>
                    ) : (<></>)}
                  </>
                )}
              </>
            ))}
        </Box>
      </Box>
      <IconButton sx={stylesObjValueCase.buttonsContainer} aria-label="delete" size="small">
        <Delete sx={{ width: "100%" }} />
      </IconButton>
    </Box>
  )
}

const stylesObjValueCase = createStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    border: "2px solid white",
    borderRadius: "20px",
    backgroundColor: "#d6d6d6",
    minHeight: "100px", // добавляем минимальную высоту для контейнера
  },
  buttonsContainer: {
    maxWidth: "14%",
    display: "flex", // добавляем display
    flexDirection: "column",
    alignItems: "stretch", // растягиваем на всю высоту
    borderRadius: "0 18px 18px 0", // скругляем только правые углы
    borderLeft: "2px solid white",
    p: 0
  },
  content: {
    minWidth: "86%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "18px 0 0 18px", // скругляем только левые углы
    backgroundColor: "#d6d6d6",
    boxSizing: "border-box",
  },
  header: {
    width: "100%",
    display: "flex",
    paddingY: "1%",
    flexDirection: "column",
    justifyContent: "center",
    borderBottom: "2px solid white"
  },
  props: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    gap: "5px",
    pl: "4%"
  }
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
  value: string | number
}

const PrimitiveValueCase = ({ keyName, value }: IPrimitiveValueCase) => {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState("")

  return (
    <Box sx={stylesPrimitiveValueCase.container}>
      <Typography fontWeight={600}>{keyName}:</Typography>
      {!isEditing ? (
        <div onClick={() => { setIsEditing(true) }} style={{ cursor: "alias" }}>
          <Typography fontWeight={600}>{value}</Typography>
        </div>
      ) : (
        <PrimitiveValueCaseEditor />
      )}
    </Box>
  )
}

interface IPrimitiveValueCaseEditor {
  value: string,
  onCancelButtonPress: () => void,
  onConfirmButtonPress: () => void
}

const PrimitiveValueCaseEditor = () => {

  return (
    <>
      <TextField
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
      <IconButton onClick={() => { }}>
        <Cancel />
      </IconButton>
      <IconButton>
        <Save />
      </IconButton>
    </>
  )
}

const stylesPrimitiveValueCase = createStyles({
  container: {
    width: "100%",
    backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
  }
})