import { Box, Button, Chip, IconButton, Typography } from '@mui/material';
import { createStyles } from '../../../lib';
import { Delete } from '@mui/icons-material';

interface IEntry {
  keyName: string,
  value: any
}

//точка входа 
export const Entry = ({ keyName, value }: IEntry) => {
  return (
    <Box sx={styles.container}>
      {typeof value === "string" || typeof value === "number" ? (
        // случай примитивного значения просто текст нахуй 
        <PrimitiveValueCase keyName={keyName} value={value} />
      ) : (
        <>
          {Array.isArray(value) ? (
            //случай массива примитивов (19.03.2026 0:46) щас хандлить этот случай нахуй не нужно но вдруг надо будет
            <>
              {value.every(item => typeof item === "string" || typeof item === "number") ? (
                <></>
              ) : (
                //не примитив, не массив примитивов? значит МАССИВ ОБЪЕКТОВ! (пока остальные типы не юзаются и быть здесь не может)
                <ArrayObjsValueCase keyName={keyName} value={value} />
              )}
            </>
          ) : (<></>)}
        </>
      )}
    </Box>
  );
};


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
          <ObjValueCase keyName={keyName} value={item} />
        ))}
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
  keyName: string,
  value: object
}

const ObjValueCase = ({ keyName, value }: IObjValueCase) => {
  return (
    <Box sx={stylesObjValueCase.container}>

      <Box sx={stylesObjValueCase.content}>
        <Box sx={stylesObjValueCase.header}>
          <Typography fontWeight={600}>{(value as any).name}:</Typography>
        </Box>
        <Box sx={stylesObjValueCase.props}>
          {Object.entries(value)
            .filter(([key]) => key != "id" && key != "name" && key != "type")
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

      <Box sx={stylesObjValueCase.buttonsContainer}>
        <IconButton aria-label="delete" size="small">
          <Delete />
        </IconButton>
      </Box>
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
    width: "30px",
    display: "flex", // добавляем display
    alignItems: "stretch", // растягиваем на всю высоту
    borderRadius: "0 18px 18px 0", // скругляем только правые углы
    borderLeft: "2px solid white"
  },
  content: {
    flex: 1, // занимает всё доступное место
    display: "flex",
    flexDirection: "column",
    p: "10px",
    borderRadius: "18px 0 0 18px", // скругляем только левые углы
    backgroundColor: "#d6d6d6",
    boxSizing: "border-box"
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "nowrap",
    borderBottom: "2px solid white"
  },
  props: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    gap: "5px",
    pl: "5px"
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
  return (
    <Typography fontWeight={600}>{keyName + value}</Typography>
  )
}

const styles = createStyles({
  container: {
    width: '90%',

    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    p: "10px",
    boxSizing: "border-box",
    borderRadius: '20px',
    border: '2px solid #cecece',
    backgroundColor: '#d6d6d6',
    color: '#1a1a1a',
  }
});
