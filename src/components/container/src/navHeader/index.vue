<template>
  <div class="navHeader">
    <span @click="toggleCollapse">
      <el-icon-Expand v-if="collapse"></el-icon-Expand>
      <el-icon-Fold v-else></el-icon-Fold>
    </span>
  </div>
</template>

<script lang="ts" setup>
let props = defineProps<{
  collapse: boolean;
}>();
let emit = defineEmits<{
  (e: "update:collapse", value: boolean): void;
}>();
let toggleCollapse = () => {
  emit("update:collapse", !props.collapse);
};
</script>

<style lang="scss" scoped>
.navHeader {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
</style>