
import type { App } from 'vue';
import DirectoryTree from './DirectoryTree';

const components = [
  DirectoryTree,
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}