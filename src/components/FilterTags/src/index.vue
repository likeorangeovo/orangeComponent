<template>
  <div class="filter-tags">
    <div
      class="filter-tags__label"
      :style="titleMinWidth ? { minWidth: titleMinWidth } : {}"
    >{{ title }}</div>
    <el-checkbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      <div class="filter-tags__all-btn">全部</div>
    </el-checkbox>
    <el-checkbox-group v-model="checkedItems" @change="handleCheckedChange">
      <el-checkbox v-for="(tag, index) in tagsListData" :key="index" :label="tag">
        {{ tag.title }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { FilterTagItem } from './types';

interface Props {
  /** 左侧标签名称 */
  title: string;
  /** 标签选项列表 */
  tagsListData: FilterTagItem[];
  /** 左侧标签最小宽度，用于多行对齐 */
  titleMinWidth?: string;
  /** 默认已选项 */
  defaultActive?: FilterTagItem[];
}

const props = defineProps<Props>();

const emits = defineEmits<{
  /** 点击"全部"时触发，返回空数组 */
  returnChecked: [items: FilterTagItem[]];
  /** 点击单个选项时触发，返回当前所有已选项 */
  singleChecked: [items: FilterTagItem[]];
}>();

const defaultCount = props.defaultActive?.length ?? 0;
const checkAll = ref(defaultCount === props.tagsListData.length);
const isIndeterminate = ref(defaultCount > 0 && defaultCount < props.tagsListData.length);
const checkedItems = ref<FilterTagItem[]>(props.defaultActive ?? []);

/** 点击"全部"：true → 全选，false → 清空 */
const handleCheckAllChange = (val: boolean) => {
  if (val) {
    checkedItems.value = [...props.tagsListData];
    isIndeterminate.value = false;
    emits('returnChecked', checkedItems.value);
  } else {
    checkedItems.value = [];
    isIndeterminate.value = false;
    emits('returnChecked', []);
  }
};

/** 点击单个选项 */
const handleCheckedChange = (value: FilterTagItem[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === props.tagsListData.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.tagsListData.length;

  // 互斥逻辑：若最后选中的项标记了 isIncompatible，则清除其他所有选中项
  const lastItem = value[value.length - 1];
  if (lastItem?.isIncompatible) {
    checkedItems.value = [lastItem];
    emits('singleChecked', [lastItem]);
  } else {
    const filtered = value.filter((item) => !item.isIncompatible);
    checkedItems.value = filtered;
    emits('singleChecked', filtered);
  }
};

/** 对外暴露：供父组件调用以重置为"全部"状态 */
defineExpose({ handleCheckAllChange });
</script>

<style lang="less" scoped>
.filter-tags {
  margin-bottom: 14px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  &__label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    white-space: nowrap;
    margin-right: 8px;
  }

  &__all-btn {
    padding: 0 14px;
    height: 30px;
    font-size: 13px;
    line-height: 28px;
    border-radius: 4px;
    border: 1px solid transparent;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s;
  }
}

// 全部按钮 — 选中态（checkAll=true 或 indeterminate=false 且无选中项）
:deep(.el-checkbox.is-checked .filter-tags__all-btn),
:deep(.el-checkbox:not(.is-checked):not(.is-indeterminate) .filter-tags__all-btn) {
  color: #fff;
  background: #2d7ada;
  border-color: #2d7ada;
}

// 全部按钮 — 有子项被选中时（indeterminate），显示为未选中态
:deep(.el-checkbox.is-indeterminate .filter-tags__all-btn) {
  color: #555;
  background: #f4f6f9;
  border-color: #dcdfe6;
}

:deep(.el-checkbox.is-indeterminate .filter-tags__all-btn:hover),
:deep(.el-checkbox:not(.is-checked) .filter-tags__all-btn:hover) {
  color: #2d7ada;
  border-color: #2d7ada;
  background: #eef4fd;
}

// 隐藏原生 checkbox 方框
:deep(.el-checkbox__input) {
  display: none;
}

:deep(.el-checkbox__label) {
  padding-left: 0;
}

// checkbox-group 内的标签项
:deep(.el-checkbox-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0;
}

:deep(.el-checkbox-group .el-checkbox) {
  margin: 0;
  height: 30px;
  line-height: 28px;
}

:deep(.el-checkbox-group .el-checkbox .el-checkbox__label) {
  display: inline-block;
  padding: 0 14px;
  height: 30px;
  font-size: 13px;
  line-height: 28px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #555;
  background: #f4f6f9;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}

:deep(.el-checkbox-group .el-checkbox:hover .el-checkbox__label) {
  color: #2d7ada;
  border-color: #2d7ada;
  background: #eef4fd;
}

:deep(.el-checkbox-group .el-checkbox.is-checked .el-checkbox__label) {
  color: #fff;
  background: #2d7ada;
  border-color: #2d7ada;
}
</style>
