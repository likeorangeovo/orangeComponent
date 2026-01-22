<template>
  <el-container>
    <el-aside width="auto">
      <nav-side :collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse" />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import navHeader from "./navHeader/index.vue";
import navSide from "./navSide/index.vue";
let isCollapse = ref(false);

</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
</style>