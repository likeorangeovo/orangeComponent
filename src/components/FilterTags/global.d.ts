import 'vue';

declare module 'vue' {
  interface GlobalComponents {
    FilterTags: typeof import('./src/index.vue').default;
  }
}

declare global {
  type FilterTagItem = import('./src/types').FilterTagItem;
}
