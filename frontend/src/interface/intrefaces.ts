export interface Table {
  id?: number;
  nombre: string;
  descripcion: string;
}

export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  createTable: (table: Table) => void
}

export interface FormState {
  [key: string]: string | number | boolean | null;
}
