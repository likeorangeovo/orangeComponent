<template>
  <directory-tree :categories="categories" :lazyLoad="lazyLoad" :defaultActiveIndex="defaultActiveIndex"
    :defaultActiveCode="defaultActiveCode" :enableSearch="enableSearch" :searchPlaceholder="searchPlaceholder"
    :treeNodeKey="treeNodeKey" :treeNodeLabel="treeNodeLabel" @nodeClick="$emit('nodeClick', $event)"
    @categoryClick="$emit('categoryClick', $event)"></directory-tree>
</template>

<script lang='ts' setup>
import { ref } from 'vue';

const defaultActiveIndex = ref(0);
const defaultActiveCode = ref('');
const enableSearch = ref(true);
const searchPlaceholder = ref('快速检索');
const treeNodeKey = ref('code');
const treeNodeLabel = ref('name');

const categories = ref<Category[]>([
  { code: 'cat-1', name: '分类一' },
  { code: 'cat-2', name: '分类二' },
]);

const mockData: Record<string, TreeNode[]> = {
  'cat-1': [
    { code: 'node-1-1', name: '节点 1-1', isLeaf: false },
    { code: 'node-1-2', name: '节点 1-2', isLeaf: true },
  ],
  'cat-2': [
    { code: 'node-2-1', name: '节点 2-1', isLeaf: true },
  ],
  'node-1-1': [
    { code: 'node-1-1-1', name: '节点 1-1-1', isLeaf: true },
    { code: 'node-1-1-2', name: '节点 1-1-2', isLeaf: true },
  ],
};

const lazyLoad: LazyLoadFunction = async (categoryCode: string, parentCode: string, searchText: string): Promise<TreeNode[]> => {
  const key = parentCode || categoryCode;
  const data = mockData[key] ?? [];
  if (!searchText) return data;
  return data.filter(item => item.name?.includes(searchText));
};
</script>

<style lang='scss' scoped></style>
