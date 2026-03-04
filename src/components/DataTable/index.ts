import type { App } from 'vue';
import DataTable from './src/index.vue';
import type { TableData, TableColumn, TableAction } from './src/types';

export type { TableData, TableColumn, TableAction };
export default {
  install(app: App) {
    app.component('data-table', DataTable)
  }
}
