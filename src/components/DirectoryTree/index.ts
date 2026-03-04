import type { App } from 'vue';
import DirectoryTree from './src/index.vue';
import type { Category, TreeNode, LazyLoadFunction } from './src/types';
export type { Category, TreeNode, LazyLoadFunction };
export default {
  install(app: App) {
    app.component('directory-tree', DirectoryTree)
  }
}
