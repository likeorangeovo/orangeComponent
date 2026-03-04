import type { App } from 'vue';
import FilterTags from './src/index.vue';
import type { FilterTagItem } from './src/types';

export type { FilterTagItem };
export default {
  install(app: App) {
    app.component('filter-tags', FilterTags)
  }
}
