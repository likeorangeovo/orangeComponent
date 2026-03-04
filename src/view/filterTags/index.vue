<template>
  <div class="filter-tags-demo">
    <filter-tags
      title="数据类型"
      :tagsListData="typeList"
      titleMinWidth="70px"
      @returnChecked="handleChecked('数据类型', $event)"
      @singleChecked="handleChecked('数据类型', $event)"
    />
    <filter-tags
      title="所属部门"
      :tagsListData="deptList"
      titleMinWidth="70px"
      @returnChecked="handleChecked('所属部门', $event)"
      @singleChecked="handleChecked('所属部门', $event)"
    />
    <filter-tags
      title="共享方式"
      :tagsListData="shareList"
      :defaultActive="[shareList[0]]"
      titleMinWidth="70px"
      @returnChecked="handleChecked('共享方式', $event)"
      @singleChecked="handleChecked('共享方式', $event)"
    />
    <div class="result">
      <span class="result__title">已选条件</span>
      <template v-if="hasChecked">
        <div v-for="(items, group) in checkedResult" :key="group" class="result__group">
          <template v-if="items.length > 0">
            <span class="result__group-name">{{ group }}：</span>
            <el-tag
              v-for="item in items"
              :key="item.value"
              type="primary"
              size="small"
              class="result__tag"
            >{{ item.title }}</el-tag>
          </template>
        </div>
      </template>
      <span v-else class="result__empty">暂无筛选条件</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const typeList = ref<FilterTagItem[]>([
  { title: '结构化数据', value: '1' },
  { title: '非结构化数据', value: '2' },
  { title: '半结构化数据', value: '3' },
]);

const deptList = ref<FilterTagItem[]>([
  { title: '技术部', value: 'tech' },
  { title: '产品部', value: 'product' },
  { title: '运营部', value: 'ops' },
  { title: '财务部', value: 'finance' },
]);

const shareList = ref<FilterTagItem[]>([
  { title: '无条件共享', value: 'free' },
  { title: '有条件共享', value: 'conditional' },
  { title: '不予共享', value: 'none', isIncompatible: true },
]);

const checkedResult = ref<Record<string, FilterTagItem[]>>({});
const hasChecked = computed(() => Object.values(checkedResult.value).some(v => v.length > 0));

const handleChecked = (group: string, items: FilterTagItem[]) => {
  checkedResult.value[group] = items;
};
</script>

<style lang="scss" scoped>
.filter-tags-demo {
  padding: 24px;
}
.result {
  margin-top: 16px;
  font-size: 13px;
  color: #666;
  word-break: break-all;
}
</style>
