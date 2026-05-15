import { createRenderConfig } from "@/shared/lib/createRenderConfig"
import { ObjEntryTwo } from "@/shared/ui/ObjEntry/ObjEntry"
import type { ICompactibleCoilSeriesesEntry } from "./model/types"
import { useCompatibleCoilSeriesesEntry } from "./model/useCompatibleCoilSeriesesEntry"
import { CoilItem } from "./ui/PlatItem/CoilItem"
import { CoilSeriesCardModal } from "@/widgets/coil/CoilSeriesCardModal/CoilSeriesCardModal"
import { AddCompatibleCoilMenu } from "./ui/AddCompatibleCoilMenu/AddCompatibleCoilMenu"
import PopupState, { bindTrigger } from "material-ui-popup-state"
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"





export const CompactibleCoilSeriesesEntry = (props: ICompactibleCoilSeriesesEntry) => {
  const { compatibleCoilSerieses } = props
  const { clickedCoilSeriesId, handler } = useCompatibleCoilSeriesesEntry(props)
  return (
    <ObjEntryTwo entryName='Поддерживает:' translatedNamesForKeys={{}} renderForKeys={[
      ...compatibleCoilSerieses.map((series) => [
        ...createRenderConfig({ series }).forKeys(["series"], (key, value) => (
          <>
            <CoilItem compatibleCoilSeries={value} {...handler.coilItem} />
            <CoilSeriesCardModal compatibleCoilSeries={value} clickedCoilSeriesId={clickedCoilSeriesId} {...handler.coilSeriesCardModal} />
          </>
        ), { hideKeyName: true })
      ]).flat(),
      ...createRenderConfig({ a: 1 }).forKeys(["a"], () => (
        <PopupState variant="popover">
          {state => (
            <>
              <IconButton sx={{ width: "100%" }} {...bindTrigger(state)}>
                <Add />
              </IconButton>
              <AddCompatibleCoilMenu anchorEl={state.anchorEl} open={state.isOpen} onClose={() => state.close()} onPick={() => { }} />
            </>
          )}
        </PopupState>
      ), { hideKeyName: true })
    ]} />
  )
}