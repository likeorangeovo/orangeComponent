import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.ts"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
// import orangeComponents from './components/index.ts'

// 引用打包后的js和css文件
import orangeComponents from '../lib/orange-components.js'; 
import '../lib/orange-components.css';

const app = createApp(App)

for(let i in Icons){
  // console.log(i);
  app.component(`el-icon-${i}`, (Icons as any)[i])
}

app.use(router)
app.use(ElementPlus)
app.use(orangeComponents)
app.mount('#app')
