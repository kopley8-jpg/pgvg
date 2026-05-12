import type { CompatibleCoilSeriesesType } from "@/entities/tanks/model/types"
import { createRenderConfig } from "@/shared/lib/createRenderConfig"
import { ObjEntryTwo } from "@/shared/ui/ObjEntry/ObjEntry"
import { CoilItem } from "./PlatItem/CoilItem"



interface ICompactibleCoilSeriesesEntry {
  compatibleCoilSerieses: CompatibleCoilSeriesesType[]
}


export const CompactibleCoilSeriesesEntry = (props: ICompactibleCoilSeriesesEntry) => {
  const { compatibleCoilSerieses } = props
  return (
    <ObjEntryTwo entryName='Поддерживает:' translatedNamesForKeys={{}} renderForKeys={[
      ...compatibleCoilSerieses.map((series) => [
        ...createRenderConfig({ series }).forKeys(["series"], (key, value) => (
          <CoilItem compatibleCoilSeries={value} onClick={() => { }} onDeleteButtonClick={() => { }} />
        ), { hideKeyName: true })
      ]).flat()

    ]} />
  )
}