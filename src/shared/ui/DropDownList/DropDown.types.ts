export interface IDropDownList<T> {
  value: T;
  data: readonly T[];
  onPick: (picked: T) => void;
}
