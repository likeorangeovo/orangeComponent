<template>
  <el-menu default-active="1" :collapse="collapse" class="el-menu-vertical-demo" router @open="" @close="">
    <el-menu-item index="/">
      <el-icon-Menu></el-icon-Menu>
      <span class="subTitlePadding">首页</span>
    </el-menu-item>
    <el-menu-item index="/directory-tree">
      <el-icon-Menu></el-icon-Menu>
      <span class="subTitlePadding">搜索树</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon-Menu></el-icon-Menu>
      <span class="subTitlePadding">组件2</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
let props = defineProps<{
  collapse: boolean;
}>();
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.subTitlePadding {
  padding-left: 10px;
}
</style>
