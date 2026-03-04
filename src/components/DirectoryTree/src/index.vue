<template>
  <div class="ds-directory-tree">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        v-for="(item, index) in categories"
        :key="item.code"
        :title="item.name"
        :name="index"
      >
        <template #title>
          <div class="title-part" @click="handleCategoryClick(item)">
            {{ item.name }}
          </div>
        </template>
        <div>
          <div v-if="enableSearch" class="search-part">
            <el-input v-model="searchTexts[index]" :placeholder="searchPlaceholder">
              <template #suffix>
                <el-icon color="#1C64DD" :size="20" class="no-inherit">
                  <Search />
                </el-icon>
              </template>
            </el-input>
          </div>
          <el-tree
            :ref="(el: unknown) => setTreeRef(el, index)"
            :key="`tree-${index}-${searchTexts[index] || ''}`"
            :props="treeProps"
            :load="(node: any, resolve: any) => loadNode(node, resolve, index)"
            lazy
            highlight-current
            :default-expanded-keys="expandedKeys[index] || []"
            :node-key="treeNodeKey"
            @node-click="handleNodeClick"
            class="tree-scroll"
          >
            <template #default="{ node }">
              <span class="custom-tree-node-title">
                <span v-html="highlightText(node.label, searchTexts[index])"></span>
              </span>
            </template>
          </el-tree>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import type Node from 'element-plus/es/components/tree/src/model/node';
import { Search } from '@element-plus/icons-vue';
import type { Category, TreeNode, LazyLoadFunction } from './types';

interface Props {
  categories: Category[];
  lazyLoad: LazyLoadFunction;
  defaultActiveIndex?: number;
  defaultActiveCode?: string;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  treeNodeKey?: string;
  treeNodeLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultActiveIndex: 0,
  defaultActiveCode: '',
  enableSearch: true,
  searchPlaceholder: '快速检索',
  treeNodeKey: 'code',
  treeNodeLabel: 'name',
});

const emits = defineEmits<{
  nodeClick: [data: TreeNode];
  categoryClick: [category: Category];
}>();

const activeName = ref<number>(props.defaultActiveIndex);
const searchTexts = ref<Record<number, string>>({});
const treeRefs = ref<any[]>([]);
const expandedKeys = ref<Record<number, string[]>>({});

const setTreeRef = (el: unknown, index: number) => {
  if (el) {
    treeRefs.value[index] = el;
  }
};

const treeProps = computed(() => ({
  label: props.treeNodeLabel,
  children: 'children',
  isLeaf: 'isLeaf',
  id: props.treeNodeKey,
}));

// 高亮搜索关键词
const highlightText = (text: string, keyword?: string): string => {
  if (!keyword || !text) {
    return text;
  }

  // 转义正则特殊字符
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedKeyword})`, 'gi');
  return text.replace(regex, '<span class="highlight-keyword">$1</span>');
};

const loadNode = async (
  node: Node,
  resolve: (data: TreeNode[]) => void,
  categoryIndex: number
) => {
  try {
    const category = props.categories[categoryIndex];
    if (!category) {
      resolve([]);
      return;
    }
    const searchText = searchTexts.value[categoryIndex] || '';

    if (node.level === 0) {
      // 根节点加载,应用搜索过滤(搜索所有级别)
      const data = await props.lazyLoad(category.code, '', searchText);
      resolve(data);

      // 如果有搜索条件,收集一级节点的 key 用于自动展开
      if (searchText && data.length > 0) {
        await nextTick();
        const keysToExpand: string[] = [];
        data.forEach((item: TreeNode) => {
          const key = item[props.treeNodeKey];
          if (key && !item.isLeaf) {
            keysToExpand.push(key);
          }
        });
        expandedKeys.value[categoryIndex] = keysToExpand;
      } else {
        expandedKeys.value[categoryIndex] = [];
      }
    } else if (node.level === 1 && searchText) {
      // 一级节点加载,如果有搜索条件,继续传递搜索文本以加载匹配的二级节点
      const data = await props.lazyLoad(category.code, node.data[props.treeNodeKey], searchText);
      resolve(data);
    } else {
      // 其他情况,正常加载子节点
      const data = await props.lazyLoad(category.code, node.data[props.treeNodeKey], '');
      resolve(data);
    }
  } catch (error) {
    console.error('Load tree node failed:', error);
    resolve([]);
  }
};

const handleNodeClick = (nodeData: TreeNode) => {
  emits('nodeClick', nodeData);
};

const handleCategoryClick = (category: Category) => {
  emits('categoryClick', category);
};

onMounted(() => {
  if (props.defaultActiveCode) {
    const category = props.categories.find(c => c.code === props.defaultActiveCode);
    if (category) {
      emits('categoryClick', category);
    }
  }
});
</script>

<style lang="less" scoped>
.ds-directory-tree {
  // ── 折叠面板整体 ──────────────────────────────
  :deep(.el-collapse) {
    border: none;
  }

  :deep(.el-collapse-item) {
    margin-bottom: 12px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(45, 122, 218, 0.15);
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 4px 12px rgba(45, 122, 218, 0.25);
    }
  }

  // ── 折叠头部 ─────────────────────────────────
  :deep(.el-collapse-item__header) {
    height: 52px;
    padding: 0 16px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(90deg, #4a8eff 0%, #2d7ada 100%);
    border: none;
    border-radius: 0;

    // 箭头图标改白色
    .el-collapse-item__arrow {
      color: rgba(255, 255, 255, 0.85);
      font-size: 14px;
      transition: transform 0.25s;
    }
  }

  .title-part {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  // ── 折叠内容区 ───────────────────────────────
  :deep(.el-collapse-item__content) {
    padding-bottom: 0;
    background: #fff;
  }

  // ── 搜索框 ───────────────────────────────────
  .search-part {
    padding: 0 12px;
    border-bottom: 1px solid #eef2f8;

    :deep(.el-input__wrapper) {
      box-shadow: none !important;
      background: transparent;
      height: 44px;
    }

    :deep(.el-input__inner) {
      font-size: 13px;
      color: #333;

      &::placeholder {
        color: #bbb;
      }
    }
  }

  // ── 树节点 ───────────────────────────────────
  :deep(.el-tree) {
    background: #fff;
    font-size: 14px;
    color: #333;
  }

  :deep(.el-tree-node__content) {
    height: 44px;
    padding-left: 12px !important;
    transition: background 0.15s, color 0.15s;

    &:hover {
      background: #eef4fd;

      .custom-tree-node-title {
        color: #2d7ada;
        font-weight: 600;
      }
    }
  }

  :deep(.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content) {
    background: linear-gradient(90deg, #eef4fd 0%, #f8fbff 100%);
    border-left: 3px solid #2d7ada;

    .custom-tree-node-title {
      color: #2d7ada;
      font-weight: 600;
    }
  }

  :deep(.el-tree-node > .el-tree-node__children) {
    background: #fafcff;
  }

  .custom-tree-node-title {
    width: 100%;
    font-size: 14px;
    color: #333;
    transition: color 0.15s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // ── 滚动条 ───────────────────────────────────
  .tree-scroll {
    max-height: 530px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #d0ddf0;
      border-radius: 4px;

      &:hover {
        background: #aac0e8;
      }
    }
  }

  // ── 关键词高亮 ───────────────────────────────
  :deep(.highlight-keyword) {
    color: #e6500a;
    background: #fff3e0;
    font-weight: 700;
    border-radius: 2px;
    padding: 0 1px;
  }
}
</style>
