
import type { App } from 'vue';
import DirectoryTree from './DirectoryTree';
import DataTable from './DataTable';
import FilterTags from './FilterTags';

const components = [
  DirectoryTree,
  DataTable,
  FilterTags,
]

export default {
  install(app: App) {
    components.forEach(item => {
      app.use(item)
    })
  }
}
