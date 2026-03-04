按照本项目的组件规范，生成一个新的 Vue 3 组件。

## 项目组件规范

**目录结构**（参考 DirectoryTree / DataTable / FilterTags）：
```
src/components/<ComponentName>/
  src/
    index.vue      # 主组件，使用 <script lang="ts" setup>
    types.ts       # 类型定义（interface / type）
  index.ts         # 插件注册（install）+ 类型导出
  global.d.ts      # 全局类型声明（GlobalComponents + declare global）
```

**index.ts 模板**：
```ts
import type { App } from 'vue';
import <ComponentName> from './src/index.vue';
import type { ... } from './src/types';
export type { ... };
export default {
  install(app: App) {
    app.component('<component-name>', <ComponentName>)
  }
}
```

**global.d.ts 模板**：
```ts
import 'vue';
declare module 'vue' {
  interface GlobalComponents {
    <ComponentName>: typeof import('./src/index.vue').default;
  }
}
declare global {
  type XxxType = import('./src/types').XxxType;
}
```

**components/index.ts** 需同步追加新组件的 import 和注册。

**路由与展示页**：
- 新建 `src/view/<componentName>/index.vue`，补充使用该组件所需的 mock 数据
- 在 `src/router/index.ts` 追加路由
- 在 `src/components/container/src/navSide/index.vue` 追加菜单项（`index` 值 = 路由路径）

## 样式规范
- 组件样式使用 `<style lang="less" scoped>`
- 展示页使用 `<style lang="scss" scoped>`
- 主题色 `#2d7ada`，hover 浅蓝 `#eef4fd`，边框 `#dcdfe6`
- 去除硬编码字体族（`Microsoft YaHei` 等）
- 选中态：蓝底白字或左侧 3px 蓝色竖条

## 执行步骤

用户输入：`$ARGUMENTS`

1. 理解组件功能和 Props/Emits 设计
2. 创建 `src/components/<ComponentName>/src/types.ts`
3. 创建 `src/components/<ComponentName>/src/index.vue`
4. 创建 `src/components/<ComponentName>/index.ts`
5. 创建 `src/components/<ComponentName>/global.d.ts`
6. 更新 `src/components/index.ts`（追加 import 和注册）
7. 创建 `src/view/<componentName>/index.vue`（mock 数据展示）
8. 更新 `src/router/index.ts`（追加路由）
9. 更新 `src/components/container/src/navSide/index.vue`（追加菜单项）
