import { convertToNumber } from "@/shared/lib/convertToNumber"
import { createRenderConfig } from "@/shared/lib/createRenderConfig"
import { BATTERY_FORMATS, type BatteryType } from "@/shared/types/device"
import { DropDownList } from "@/shared/ui/DropDownList/DropDownList"
import { ObjEntryTwo, type ObjEntryStylesType } from "@/shared/ui/ObjEntry/ObjEntry"
import { TextValue } from "@/shared/ui/PrimitiveValue/TextValue/TextValue"

interface IBatteryEntry {
  battery: BatteryType,
  style: ObjEntryStylesType,
  onChange?: (battery: BatteryType) => void,
  onError?: (error: string) => void
}

export const BatteryEntry = (props: IBatteryEntry) => {

  const { battery, style, onChange, onError } = props

  return (
    <ObjEntryTwo
      entryName="АКБ"
      style={style}
      translatedNamesForKeys={translate}
      renderForKeys={[
        ...createRenderConfig(battery).forKeys(["type"], (_key, value) => (
          <DropDownList
            value={value}
            data={["встроенный", "сменный"]}
            onPick={(picked) => {
              if (!picked || picked === battery.type) return;
              if (picked === "встроенный") {
                onChange?.({ type: "встроенный", capacity: 1 })
              } else {
                onChange?.({ type: "сменный", format: "18650" })
              }
            }} />
        )),
        ...(
          battery.type === "встроенный"
            ? createRenderConfig(battery).forKeys(["capacity"], (_key, value) => (
              <TextValue value={value} onSaveButtonPress={(val) => {
                const normalized = Number(convertToNumber(val))
                if (isNaN(normalized)) {
                  onError?.("значение должно быть числом")
                } else {
                  onChange?.({ type: "встроенный", capacity: normalized })
                }
              }} />
            ))
            : battery.type === "сменный"
              ? createRenderConfig(battery).forKeys(["format"], (_key, value) => (
                <DropDownList value={value} data={BATTERY_FORMATS} onPick={(format) => {
                  if (!format) return
                  onChange?.({ type: "сменный", format })
                }} />
              ))
              : [null])
      ]} />
  )
}

const translate = {
  type: "Тип",
  capacity: "Емкость",
  format: "Формат"
}