import { Modal } from "@mui/material";
import type { IcreateTankSeriesModal } from "./model/types";
import { ObjCard } from "@/shared/ui/ObjCard/ObjCard";
import { usecreateTankSeriesModal } from "./model/usecreateTankSeriesModal";
import { TextValue } from "@/shared/ui/PrimitiveValue/TextValue/TextValue";
import { createRenderConfig } from "@/shared/lib/createRenderConfig";
import { ArrayPrimitiveValue } from "@/shared/ui/ArrayPrimitiveValue/ArrayPrimitiveValue";


export const CreateTankSeriesModal = (props: IcreateTankSeriesModal) => {
  const { tankSeries, handler } = usecreateTankSeriesModal(props)

  return (
    <Modal {...props}>
      <ObjCard
        data={tankSeries}
        translatedNamesForKeys={{
          name: "",
          capacity: "Емкость",
          compatibleCoilSerieses: ""
        }}
        renderInHeader={() => (
          <TextValue value={tankSeries.name} {...handler.header.textField} />
        )}
        renderForKeys={[
          ...createRenderConfig(tankSeries).forKeys(['capacity'], (key, value) => (
            <ArrayPrimitiveValue value={value} {...handler.capacity} />
          ))
        ]} />
    </Modal>
  )
}