import { Modal } from "@mui/material";
import type { ITankSeriesCardModal } from "./model/types";
import { useTankSeriesModal } from "./model/useTankSeriesCardModal";
import { TankSeriesCard } from "../TankSeriesCard/TankSeriesCard";



export const TankSeriesCardModal = (props: ITankSeriesCardModal) => {
  const { open, onClose } = props
  const { tankSeries } = useTankSeriesModal(props)

  return (
    <Modal open={open} onClose={onClose}>
      {tankSeries ? (
        <TankSeriesCard tankSeries={tankSeries} headerRightRender />
      ) : (
        <span>загрузка...</span>
      )}
    </Modal>
  )
}