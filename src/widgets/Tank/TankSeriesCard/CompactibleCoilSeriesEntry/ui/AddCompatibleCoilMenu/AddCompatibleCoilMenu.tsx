import { Add, Search } from "@mui/icons-material"
import { IconButton, MenuItem, Modal, Popover, TextField } from "@mui/material"
import type { IAddCompatibleCoilMenu } from "./model/types"
import { createStyles } from "@/shared/lib/createStyles"
import { useAddCompatibleCoilMenu } from "./model/useAddCompatibleCoilMenu"
import { useState } from "react"
import type { CoilSeriesType } from "@/entities/coils/model/types"
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state"
import { CoilSeriesCard } from "@/widgets/coil/CoilSeriesCard/CoilSeriesCard"


export const AddCompatibleCoilMenu = (props: IAddCompatibleCoilMenu) => {

  const { coilSerieses } = useAddCompatibleCoilMenu(props)

  const styles = useStyles()

  const [searchedText, setSearchedText] = useState("")

  const filteredSerieses = coilSerieses.filter(series => series.name.toLowerCase().includes(searchedText.toLowerCase()))

  return (
    <Popover
      {...props}
    >
      <TextField
        sx={{ width: "100%" }}
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <Search />
            )
          }
        }}
        onChange={p => setSearchedText(p.target.value)}
      />
      {filteredSerieses.map(coilSeries => (
        <PopupState variant="popover">
          {state => (
            <>
              <MenuItem {...bindTrigger(state)}>{coilSeries.name}</MenuItem>
              <CoilSeriesDialog {...bindMenu(state)} series={coilSeries} onAdd={() => { }} />
            </>
          )}
        </PopupState>
      ))}
    </Popover>
  )
}

const CoilSeriesDialog = (props: { series: CoilSeriesType, open: boolean, onClose: () => void, onAdd: () => void }) => {

  const { series } = props

  return (
    <Modal
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <CoilSeriesCard coilSeries={series} headerRightRender={(
        <IconButton>
          <Add />
        </IconButton>
      )} />
    </Modal>
  )
}

const useStyles = () => {
  return (
    createStyles({
      popover: {
        width: "50vw",
        height: "40vh",
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    })
  )
}