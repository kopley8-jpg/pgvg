import { MenuItem, Popover } from "@mui/material"
import { bindMenu, type PopupState } from "material-ui-popup-state/hooks"


interface ICompatiblePlatPicker {
  anchorEl: HTMLElement | null,
  open: boolean,
  onClose: () => void
}

export const CompatiblePlatPicker = (props: ICompatiblePlatPicker) => {


  return (
    <Popover
      {...props}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      anchorOrigin={{ vertical: "top", horizontal: "left" }} >
      <MenuItem>1 asdasdas</MenuItem>
      <MenuItem>2 asdasdas</MenuItem>
      <MenuItem>3 asdasdas</MenuItem>
    </Popover>
  )
}