import { pasteFromClipboard } from "@/shared/lib/pasteFromClipboard";
import { MenuItem, Popover, type PopoverProps } from "@mui/material";
import { useRef } from "react";



export type PhotoLoaderProps = {
  onFile?: (file: File) => void;
  onURL?: (url: string) => void;
} & PopoverProps;

export const PhotoLoader = (props: PhotoLoaderProps) => {
  const { onClose, onFile, onURL } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Popover {...props}>
        <MenuItem
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          Выбрать файл
        </MenuItem>
        <MenuItem
          onClick={async () => {
            const res = await pasteFromClipboard();
            if (!res) return;
            if (typeof res === 'object') {
              onFile?.(res);
              onClose?.({}, 'backdropClick');
            } else {
              onURL?.(res);
              onClose?.({}, 'backdropClick');
            }
          }}
        >
          Вставить
        </MenuItem>
      </Popover>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          onFile?.(file);
          onClose?.({}, 'backdropClick');
        }}
      />
    </>
  );
};