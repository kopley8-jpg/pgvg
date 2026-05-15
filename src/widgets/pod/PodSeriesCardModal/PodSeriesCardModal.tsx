import { Modal } from "@mui/material"
import { PodSeriesCard } from "../PodSeriesCard/PodSeriesCard"
import type { IPodSeriesCardModal } from "./model/types"
import { usePodSeriesCardModal } from "./model/usePodSeriesCardModal"

export const PodSeriesCardModal = (props: IPodSeriesCardModal) => {
  const { podSeries } = usePodSeriesCardModal(props)

  return (
    <Modal
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
      {podSeries ? (
        <PodSeriesCard podSeries={podSeries} headerRightRender />
      ) : (
        <span>Загрузка...</span>
      )}
    </Modal>
  )
}