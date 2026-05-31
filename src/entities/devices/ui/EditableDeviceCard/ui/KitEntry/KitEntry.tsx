import type { colors as cols } from "@/shared/constants/colors";
import { modalStyles, ObjCardStyles, ObjEntryStyles } from "@/shared/constants/styles";
import { createRenderConfig } from "@/shared/lib/createRenderConfig";
import type { DeviceKitType, PodInKitType, SomethingElseInKitType } from "@/shared/types/device";
import { ObjCard } from "@/shared/ui/ObjCard/ObjCard";
import { ObjEntryTwo } from "@/shared/ui/ObjEntry/ObjEntry";
import { TextValue } from "@/shared/ui/PrimitiveValue/TextValue/TextValue";
import { Add, Delete } from "@mui/icons-material";
import { IconButton, MenuItem, Modal, Popover, Typography, type MenuProps, type ModalProps, type PopoverProps } from "@mui/material";
import PopupState, { bindMenu, bindPopover, bindTrigger } from "material-ui-popup-state";
import { useEffect, useState } from "react";

interface IKitEntry {
  kit: DeviceKitType[],
  onAddKitItemMenuClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
  onKitItemClick: (item: Exclude<DeviceKitType, SomethingElseInKitType>) => void
  colors: typeof cols.light
  onChange: (newValue: DeviceKitType[]) => void,
  onError: (error: string) => void
}

export const KitEntry = (props: IKitEntry) => {

  const { kit, colors, onAddKitItemMenuClick, onKitItemClick, onChange, onError } = props

  const [clickedSomethingElseKitItem, setClickedSomethingElseKitItem] = useState<SomethingElseInKitType | null>(null)



  return (
    <ObjEntryTwo
      entryName="Комплект"
      translatedNamesForKeys={{}}
      style={ObjEntryStyles(colors)}
      renderForKeys={[
        ...kit.map((item, index) =>
          createRenderConfig({ item }).forKeys(["item"], (_key, value) => (
            <>
              <KitMenuItem
                item={item}
                onClick={() => {
                  if (item.type === "something-else") {
                    setClickedSomethingElseKitItem(item)
                  } else {
                    onKitItemClick(item)
                  }
                }}
                onDelete={() => {
                  onChange(kit.filter((_kitItem, kitIndex) => kitIndex != index))
                }} />
              <Modal
                sx={modalStyles}
                open={Boolean(clickedSomethingElseKitItem)}
                onClose={() => setClickedSomethingElseKitItem(null)} >
                <EditSomethingElseInKitCard
                  item={clickedSomethingElseKitItem!}
                  onChange={(newItem) => {
                    onChange(kit.map((kitItem, kitIndex) => index === kitIndex ? newItem : kitItem))
                    setClickedSomethingElseKitItem(newItem)
                  }}
                  onDelete={() => {
                    onChange(kit.filter((_kitItem, kitIndex) => kitIndex != index))
                    setClickedSomethingElseKitItem(null)
                  }}
                  onError={onError}
                  colors={colors} />
              </Modal>
            </>
          ), { hideKeyName: true })
        ).flat(),
        ...createRenderConfig({ a: 1 }).forKeys(
          ['a'],
          () => (
            <PopupState variant="popover">
              {state => (
                <>
                  <IconButton size="small" {...bindTrigger(state)}>
                    <Add fontSize="small" />
                  </IconButton>
                  <AddItemToKitMenu onClick={(item, e) => {
                    if (item === "somethingElse") {
                      const newKitItem: SomethingElseInKitType = { type: "something-else", name: "Новое что-то еще", count: 1 }
                      onChange([...kit, newKitItem])
                      setClickedSomethingElseKitItem(newKitItem)
                    } else {
                      onAddKitItemMenuClick(e)
                    }
                  }} menuProps={{ ...bindPopover(state) }} />
                </>
              )}
            </PopupState>
          ),
          { hideKeyName: true }
        ),
      ]} />
  )
}

const AddItemToKitMenu = (props: { menuProps: PopoverProps, onClick?: (item: "platform" | "somethingElse", e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void }) => {

  const { onClick } = props

  return (
    <Popover {...props.menuProps}>
      <MenuItem onClick={(e) => onClick?.("platform", e)}>Картридж, танк, Испарик</MenuItem>
      <MenuItem onClick={(e) => onClick?.("somethingElse", e)}>Что-то еще</MenuItem>
    </Popover>
  )
}


const EditSomethingElseInKitCard = ({ item, colors, onChange, onDelete, onError }: { item: SomethingElseInKitType, colors: typeof cols.light, onChange: (newValue: SomethingElseInKitType) => void, onDelete: () => void, onError: (error: string) => void }) => {

  const kitConfig = createRenderConfig(item)
  return (
    <ObjCard
      data={item}
      styles={ObjCardStyles(colors)}
      translatedNamesForKeys={{ name: "Наименование", count: "Кол-во", type: "" }}
      renderInHeader={() => (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <TextValue value={item.name} onSaveButtonPress={newVal => onChange({ ...item, name: newVal.toString() })} />
          <IconButton onClick={onDelete}>
            <Delete />
          </IconButton>
        </div>
      )}
      renderForKeys={[
        ...kitConfig.forKeys(["count"], (_key, value) => (
          <TextValue value={value} onSaveButtonPress={newVal => {
            const toNumber = Number(newVal)
            if (isNaN(toNumber)) {
              onError("значение должно быть числом")
            } else {
              onChange({ ...item, count: toNumber })
            }
          }} />
        ))
      ]}
    />
  )
}

const KitMenuItem = ({ item, onClick, onDelete }: { item: DeviceKitType, onClick?: () => void, onDelete?: () => void }) => {


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }} >
      <MenuItem
        sx={{ fontSize: '2vw', py: 1, px: 1, minHeight: 'auto' }}
        onClick={() => onClick?.()}
      >
        {item.name}
      </MenuItem>
      <IconButton
        size="small"
        onClick={onDelete}
      >
        <Delete fontSize="small" />
      </IconButton>
    </div>
  )
}