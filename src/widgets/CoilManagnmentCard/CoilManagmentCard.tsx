import { CoilSeriesCard } from "@/entities/coils/ui/EditableCoilSeriesCard/EditableCoilSeriesCard"
import { deleteCoilSeries } from "@/features/coilManagment/delete-coil-series/deleteCoilSeries"
import { updateCoilSeries } from "@/features/coilManagment/edit-сoil-series/model/edit-coil-series"
import type { CoilSeriesType } from "@/shared/types/coil-series"


type ICoilManagmentCard = {
  coilSeries: CoilSeriesType | string,
}

export const CoilManagmentCard = (props: ICoilManagmentCard) => {
  const { coilSeries } = props

  const id = typeof coilSeries === "string" ? coilSeries : coilSeries.id

  return (
    <CoilSeriesCard
      coilSeries={coilSeries}
      onChange={(k, val) => {
        alert(id + k + val)
        updateCoilSeries(id, k, val).catch(e => alert(e))
      }}
      onMenuItemClick={item => {
        switch (item) {
          case "delete": deleteCoilSeries(id).catch(e => alert(e));
        }
      }}
      onError={err => alert(err)}
    />
  )
}



