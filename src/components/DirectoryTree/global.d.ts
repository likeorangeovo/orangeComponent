import 'vue';

// 将组件类型注入 Vue 全局，模板中使用 <directory-tree> 时有类型提示
declare module 'vue' {
  interface GlobalComponents {
    DirectoryTree: typeof import('./src/index.vue').default;
  }
}

// 将数据类型声明为全局类型，无需在每个文件中 import type
declare global {
  type Category = import('./types/types').Category;
  type TreeNode = import('./types/types').TreeNode;
  type LazyLoadFunction = import('./types/types').LazyLoadFunction;
}
