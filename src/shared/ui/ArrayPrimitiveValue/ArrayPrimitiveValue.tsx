import { Chip } from "@mui/material"

interface IArrayPrimitiveValue {
  keyName: string,
  value: (string | number)[],
  onClick?: () => void
}

export const ArrayPrimitiveValue = ({ keyName, value, onClick }: IArrayPrimitiveValue) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2%", marginLeft: "1%" }}>
      <a>{keyName + ": "}</a>
      <Chip label={value.join(", ")} size="small" sx={{ cursor: "pointer" }} />
    </div>
  )
}