export interface IPlatformModal {
  plat: { type: 'pod' | 'tank'; id: number };
  onBackdropClick: () => void;
  isOpen: boolean;
}
