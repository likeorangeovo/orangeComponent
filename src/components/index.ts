
import type { App } from 'vue';
import DirectoryTree from './DirectoryTree';
import DataTable from './DataTable';

const components = [
  DirectoryTree,
  DataTable,
]

export default {
  install(app: App) {
    components.forEach(item => {
      app.use(item)
    })
  }
}
