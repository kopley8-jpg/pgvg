import { useState } from "react"
import { PrimitiveValueEditor } from "./PrimitiveValueEditor/PrimitiveValueEditor"

interface IPrimitiveValue {
  value: string | number,
  keyName: string,
  onSaveButtonPress: (newValue: string | number) => void
}

export const PrimitiveValue = ({ value, keyName, onSaveButtonPress }: IPrimitiveValue) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveButtonPress = (newValue: string | number) => {
    onSaveButtonPress(newValue)
    setIsEditing(false)
  }

  return (
    <>
      {isEditing ? (
        <PrimitiveValueEditor keyName={keyName} value={value} onSaveButtonPress={handleSaveButtonPress} onCancelButtonPress={() => setIsEditing(false)} />
      ) : (
        <a onClick={() => setIsEditing(true)}>{keyName + ": " + value}</a>
      )}
    </>
  )
}