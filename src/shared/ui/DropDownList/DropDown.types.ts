export interface IDropDownList<T extends string | undefined> {
  value: T | undefined;
  data: readonly T[];
  onPick: (picked: T | undefined) => void;
}
