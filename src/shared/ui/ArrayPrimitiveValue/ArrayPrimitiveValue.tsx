import { Chip } from "@mui/material"
import { useState } from "react"
import { ArrayPrimitiveValueEditor } from "./ArrayPrimitiveValueEditor/ArrayPrimitiveValueEditor"

interface IArrayPrimitiveValue {
  keyName: string,
  value: (string | number)[],
  onChangesSaved: (newValue: (string | number)[]) => void,
  onClick?: () => void
}

export const ArrayPrimitiveValue = ({ keyName, value, onClick, onChangesSaved }: IArrayPrimitiveValue) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleChangesSaved = (newValue: (string | number)[]) => {
    onChangesSaved(newValue)
    setIsOpen(false)
  }



  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2%", marginLeft: "1%" }} >
      <a>{keyName + ": "}</a>
      {isOpen ? (
        <ArrayPrimitiveValueEditor value={value} keyName={keyName} onSaveButtonClick={handleChangesSaved} onCancelButtonClick={() => setIsOpen(false)} />
      ) : (
        <div onClick={() => { setIsOpen(true) }}>
          <Chip label={value.join(", ")} size="small" sx={{ cursor: "pointer" }} />
        </div>
      )}
    </div>
  )
}