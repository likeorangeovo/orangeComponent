import 'vue';

declare module 'vue' {
  interface GlobalComponents {
    DataTable: typeof import('./src/index.vue').default;
  }
}

declare global {
  type TableData = import('./src/types').TableData;
  type TableColumn = import('./src/types').TableColumn;
  type TableAction = import('./src/types').TableAction;
}
