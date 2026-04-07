import type { PodSeriesType } from "@/entities/pods/model/types"
import { ObjCard } from "@/shared/ui/ObjCard/ObjCard"
import { PrimitiveValueEditor } from "@/shared/ui/PrimitiveValue/PrimitiveValueEditor/PrimitiveValueEditor"
import { useState } from "react"


interface IPodSeriesCard {
  podSeries: PodSeriesType
}

export const PodSeriesCard = ({ podSeries }: IPodSeriesCard) => {

  const [editingEntryName, setEditingEntryName] = useState<keyof PodSeriesType | null>()



  return (
    <ObjCard
      renderInHeader={() => (
        <>
          {editingEntryName === "name" ? (
            <PrimitiveValueEditor keyName={"Название"} value={podSeries.name} />
          ) : (
            <a onClick={() => setEditingEntryName("name")}>{podSeries.name}</a>
          )}
        </>
      )}
      renderInPropsContainer={() => (
        <div style={{ width: "100%", backgroundColor: "red", }}>
          Емкость: {podSeries.capacity}
        </div>
      )} />
  )
}