export interface TableData {
  [key: string]: any;
}

export interface TableColumn {
  prop: string;
  label: string;
  width?: number | string;
  minWidth?: number | string;
  align?: 'left' | 'center' | 'right';
  showOverflowTooltip?: boolean;
  formatter?: (row: TableData, column: any, cellValue: any, index: number) => string | number;
}

export interface TableAction {
  name: string;
  label: string;
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default';
  visible?: boolean | ((row: TableData) => boolean);
}
