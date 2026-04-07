import { Add, Cancel, Delete, Save } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useState } from "react";
import { PrimitiveValue } from "../../PrimitiveValue/PrimitiveValue";
import { useStyles } from "./styles";

interface IArrayPrimitiveValueEditor {
  value: (string | number)[],
  keyName: string,
  onSaveButtonClick: (newValue: (string | number)[]) => void,
  onCancelButtonClick: () => void
}

export const ArrayPrimitiveValueEditor = ({ value, onCancelButtonClick, onSaveButtonClick }: IArrayPrimitiveValueEditor) => {

  const styles = useStyles()
  const [localValues, setLocalValues] = useState<(string | number)[]>(value)

  const handleValueChanged = (id: number, newValue: string | number) => {
    setLocalValues(prev => prev.map((res, index) => index === id ? newValue : res))
  }

  const handleAddButtonClick = () => {
    setLocalValues(prev => [...prev, 0])
  }

  const handleDeleteItemButtonClick = (id: number) => {
    setLocalValues(p => p.filter((_res, index) => index != id))
  }

  const handleCancelButtonClick = () => {
    onCancelButtonClick()
  }

  const handleSaveButtonClick = () => {
    onSaveButtonClick(localValues)
  }

  return (
    <div style={{ position: 'relative' }}> {/* 👈 родитель с relative */}

      {/* Выпадающий контент */}
      <div style={styles.container}>
        <div style={styles.header}>
          <IconButton onClick={handleCancelButtonClick}>
            <Cancel />
          </IconButton>
          <IconButton onClick={handleSaveButtonClick}>
            <Save />
          </IconButton>
        </div>
        {localValues.map((val, index) => (
          <div style={styles.item}>
            <PrimitiveValue value={val} keyName={String(index + 1)} onSaveButtonPress={(p) => { handleValueChanged(index, p) }} />
            {localValues.length > 1 ? (
              <IconButton size="small" onClick={() => handleDeleteItemButtonClick(index)}>
                <Delete fontSize="small" />
              </IconButton>
            ) : (<></>)}
          </div>
        ))}
        <IconButton sx={{ width: "100%" }} onClick={handleAddButtonClick}>
          <Add />
        </IconButton>
      </div>
    </div>
  );
}