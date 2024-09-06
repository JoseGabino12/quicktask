// Props

export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  createTable: (table: CreateTable) => void
}

export interface CardTableProps {
  id: number
  nombre: string
  descripcion: string
  deleteTable: (id: number) => void
  editTable?: (table: Table) => void
}

export interface ButtonCreateProps {
  onClick: () => void
  title: string
}

// Hooks

export interface CreateTable {
  id?: number
  nombre: string
  descripcion: string
}

export interface Table {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface FormState {
  [key: string]: string | number | boolean | null;
}
