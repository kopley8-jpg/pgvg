export interface IDropDownList<T extends string | undefined | null> {
  value: T | undefined | null;
  data: readonly T[];
  onPick: (picked: T | undefined) => void;
}
