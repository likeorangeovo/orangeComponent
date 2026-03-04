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
    <el-menu-item index="/data-table">
      <el-icon-Menu></el-icon-Menu>
      <span class="subTitlePadding">复合表格</span>
    </el-menu-item>
    <el-menu-item index="/filter-tags">
      <el-icon-Menu></el-icon-Menu>
      <span class="subTitlePadding">筛选标签</span>
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
