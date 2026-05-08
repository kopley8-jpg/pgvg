export interface IArrayPrimitiveValueEditor {
  value: (string | number)[];
  onSaveButtonClick: (newValue: (string | number)[]) => void;
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}
