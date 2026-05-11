export interface IPlatformModal {
  plat: { type: 'pod' | 'tank'; id: string };
  onBackdropClick: () => void;
  isOpen: boolean;
}
