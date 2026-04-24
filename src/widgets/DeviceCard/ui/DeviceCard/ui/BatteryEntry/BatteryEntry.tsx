import { BATTERY_FORMATS } from '@/entities/devices/model/types';
import { createRenderConfig } from '@/shared/lib/createRenderConfig';
import { DropDownList } from '@/shared/ui/DropDownList/DropDownList';
import { ObjEntryTwo } from '@/shared/ui/ObjEntry/ObjEntry';
import { TextValue } from '@/shared/ui/PrimitiveValue/TextValue/TextValue';
import type { IBatteryEntry } from './model/batteryEntry.types';
import { useBatteryEntry } from './model/useBatteryEntry';


export const BatteryEntry = ({ battery, onChange }: IBatteryEntry) => {

  const {
    handleDropDownPicked,
    handleCapacityChanged,
    handleCapacityErrorTextClick,
    handleFormatPicked
  } = useBatteryEntry({ battery, onChange })

  return (
    <>
      {battery ? (
        <ObjEntryTwo entryName='АКБ' translatedNamesForKeys={translate} renderForKeys={[
          ...createRenderConfig(battery).forKeys(["type"], (_key, value) => (
            <DropDownList value={value} data={["встроенный", "сменный"]} onPick={handleDropDownPicked} />
          )),
          ...(battery.type === "встроенный"
            ? createRenderConfig(battery).forKeys(["capacity"], (_key, value) => (
              <TextValue fontSize={"5vw"} value={value} errorOptions={{ errorText: "емкость?", onErrorTextClick: handleCapacityErrorTextClick }} onSaveButtonPress={handleCapacityChanged} />
            ))
            : battery.type === "сменный" ?
              createRenderConfig(battery).forKeys(["format"], (_key, value) => (
                <DropDownList value={value} data={BATTERY_FORMATS} onPick={handleFormatPicked} />
              ))
              : [null])
        ]} />
      ) : (
        <span style={{ cursor: "pointer" }} onClick={() => onChange({ type: "сменный" })}>АКБ?</span>
      )}
    </>
  )
}

const translate = {
  type: 'Тип',
  capacity: 'Емкость',
  format: 'Формат',
};
