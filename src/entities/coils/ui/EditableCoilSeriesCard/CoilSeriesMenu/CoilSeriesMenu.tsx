import { createStyles } from "@/shared/lib/createStyles"
import { Delete } from "@mui/icons-material"
import { Menu, MenuItem, type MenuProps } from "@mui/material"

interface ICoilSeriesMenuProps {
  onItemClick: (item: "delete") => void,
  menuProps: MenuProps
}

export const CoilSeriesMenu = (props: ICoilSeriesMenuProps) => {

  const { menuProps, onItemClick } = props

  const styles = useStyles()

  return (
    <Menu {...menuProps}>
      <MenuItem sx={styles.menuItem} onClick={() => onItemClick("delete")}>
        <Delete />
        Удалить серию
      </MenuItem>
    </Menu>
  )
}


const useStyles = () => {

  return (
    createStyles({
      menuItem: {
        display: "flex",
        flexDirection: 'row',
        gap: "3px",
        color: "red"
      }
    })
  )
}