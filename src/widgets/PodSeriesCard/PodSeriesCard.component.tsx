import type { PodSeriesType } from "@/entities/pods/model/types"
import { updatePodSeriesEntryById } from "@/features/updatePodSeriesEntryById/model/updatePodSeriesEntryById"
import { ObjCard } from "@/shared/ui/ObjCard/ObjCard"
import { PrimitiveValueEditor } from "@/shared/ui/PrimitiveValue/PrimitiveValueEditor/PrimitiveValueEditor"
import { useState } from "react"


interface IPodSeriesCard {
  podSeries: PodSeriesType
}

export const PodSeriesCard = ({ podSeries }: IPodSeriesCard) => {

  const [editingEntryName, setEditingEntryName] = useState<keyof PodSeriesType | null>()

  const updatePodSeries = (keyName: string, value: any) => {
    updatePodSeriesEntryById(podSeries.id, keyName, value)
    setEditingEntryName(null)
    alert(value)
  }

  return (
    <ObjCard
      renderInHeader={() => (
        <>
          {editingEntryName === "name" ? (
            <PrimitiveValueEditor keyName={"Название"} value={podSeries.name} onCancelButtonPress={() => setEditingEntryName(null)} onSaveButtonPress={p => updatePodSeries("name", p)} />
          ) : (
            <a onClick={() => setEditingEntryName("name")}>{podSeries.name}</a>
          )}
        </>
      )}
      renderInPropsContainer={() => (
        <>
          <div style={{ width: "100%", backgroundColor: "red", }}>
            Емкость: {podSeries.capacity}
          </div>
          <div style={{ width: "100%", backgroundColor: "red", }}>
            Сопротивления: {podSeries.ohms}
          </div>
        </>
      )} />
  )
}