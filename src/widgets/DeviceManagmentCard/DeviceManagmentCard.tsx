import { DeviceCard } from "@/entities/devices/ui/EditableDeviceCard/EditableDeviceCard";
import { useThemeStore } from "@/shared/hooks/useThemeStore";
import type { DeviceType } from "@/shared/types/device";
import { CompatiblePlatPicker } from "./ui/CompatiblePlatPicker/CompatiblePlatPicker";
import { useState } from "react";



export const DeviceManagmentCard = ({ device }: { device: DeviceType | string }) => {
  const { colors } = useThemeStore()
  const [compatiblePlatPickerProps, setCompatiblePlatPickerProps] = useState<{ open: boolean, anchorEl: HTMLElement | null }>({
    open: false,
    anchorEl: null
  })
  return (
    <>
      <DeviceCard
        device={device}
        onChange={() => { }}
        onCompatiblePlatAdd={(e) => {
          setCompatiblePlatPickerProps(prev => ({
            ...prev,
            open: true,
            anchorEl: e.currentTarget
          }))
        }}
        onPlatItemClick={() => { }}
        onError={(err) => { alert(err) }}
        colors={colors} />
      <CompatiblePlatPicker {...compatiblePlatPickerProps} onClose={() => setCompatiblePlatPickerProps(prev => ({ ...prev, open: false }))} />
    </>
  )
}