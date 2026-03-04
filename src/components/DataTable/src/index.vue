<template>
  <div class="ds-data-table">
    <el-table
      :data="tableListData"
      border
      stripe
      :row-key="rowKey"
      style="width: 100%; height: calc(100% - 52px)"
      :header-cell-style="headerCellStyle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="enableSelection"
        :reserve-selection="true"
        type="selection"
        width="70"
      />
      <el-table-column
        v-if="showIndex"
        type="index"
        :label="indexLabel"
        width="70"
        :index="getRowIndex"
      />
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
        :show-overflow-tooltip="item.showOverflowTooltip !== false"
        :align="item.align || 'center'"
      >
        <template v-if="item.formatter" #default="scope">
          {{ item.formatter(scope.row, scope.column, scope.row[item.prop], scope.$index) }}
        </template>
        <template v-else-if="$slots[item.prop]" #default="scope">
          <slot :name="item.prop" :row="scope.row" :column="scope.column" :index="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column
        v-if="actions && actions.length > 0"
        label="操作"
        :fixed="'right'"
        :width="actionColumnWidth || actions.length * actionButtonWidth"
      >
        <template #default="scope">
          <template v-for="action in actions" :key="action.name">
            <el-button
              v-if="shouldShowAction(action, scope.row)"
              link
              :size="'default'"
              :type="action.type || 'primary'"
              @click="handleActionClick(action, scope.row, scope.$index)"
            >
              {{ action.label }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="!hidePagination" class="pagination-part">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :layout="paginationLayout"
        :total="total"
        :pager-count="pagerCount"
        :next-text="nextText"
        :prev-text="prevText"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import type { TableColumn, TableAction, TableData } from './types';

interface Props {
  data: TableData[];
  columns: TableColumn[];
  actions?: TableAction[];
  enableSelection?: boolean;
  showIndex?: boolean;
  indexLabel?: string;
  rowKey?: string;
  headerTheme?: 'blue' | 'grey';
  hidePagination?: boolean;
  total?: number;
  pageSize?: number;
  currentPage?: number;
  pageSizes?: number[];
  paginationLayout?: string;
  pagerCount?: number;
  nextText?: string;
  prevText?: string;
  actionColumnWidth?: number;
  actionButtonWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  enableSelection: false,
  showIndex: true,
  indexLabel: '序号',
  rowKey: 'id',
  headerTheme: 'grey',
  hidePagination: false,
  total: 0,
  pageSize: 10,
  currentPage: 1,
  pageSizes: () => [10, 20, 50, 100, 200],
  paginationLayout: 'total, sizes, prev, pager, next, jumper',
  pagerCount: 5,
  nextText: '下一页',
  prevText: '上一页',
  actionButtonWidth: 70,
});

const emits = defineEmits<{
  actionClick: [action: TableAction, row: TableData, index: number];
  selectionChange: [selection: TableData[]];
  sizeChange: [size: number];
  currentChange: [page: number];
}>();

const currentPage = ref(props.currentPage);
const pageSize = ref(props.pageSize);

const headerCellStyle = computed(() => ({
  background: props.headerTheme === 'blue' ? '#E2EEFE' : '#F2F5F9',
  color: '#222222',
  fontSize: '14px',
  height: props.headerTheme === 'blue' ? '42px' : '50px',
  textAlign: 'center',
}));

const tableListData = computed(() => {
  if (props.hidePagination) {
    return props.data;
  }
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.data.slice(start, end);
});

const getRowIndex = (index: number) => {
  if (props.hidePagination) {
    return index + 1;
  }
  return (currentPage.value - 1) * pageSize.value + index + 1;
};

const shouldShowAction = (action: TableAction, row: TableData): boolean => {
  if (action.visible !== undefined) {
    return typeof action.visible === 'function' ? action.visible(row) : action.visible;
  }
  return true;
};

const handleActionClick = (action: TableAction, row: TableData, index: number) => {
  emits('actionClick', action, row, index);
};

const handleSelectionChange = (selection: TableData[]) => {
  emits('selectionChange', selection);
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  emits('sizeChange', val);
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  emits('currentChange', val);
};

watch(
  () => props.currentPage,
  (val) => {
    currentPage.value = val;
  }
);

watch(
  () => props.pageSize,
  (val) => {
    pageSize.value = val;
  }
);
</script>

<style lang="less" scoped>
.ds-data-table {
  width: 100%;
  height: 100%;

  :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: #2d7ada;
    border-color: #2d7ada;
  }

  :deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
    background-color: #2d7ada;
    border-color: #2d7ada;
  }

  :deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
    transition: background-color 0.25s ease;
    text-align: center;
  }

  :deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
    background: #f6faff;
  }

  :deep(.el-table) {
    --el-table-border: 1px solid #e2e7ef;
    --el-table-row-hover-bg-color: #f1f5f9;
    --el-table-current-row-bg-color: #eff6ff;
    --el-table-fixed-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    --el-table-expanded-cell-bg-color: #ffffff;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei, serif;
    font-weight: 400;
    color: #002650;
  }

  :deep(.el-button--primary.is-link) {
    --el-button-text-color: #014fe9;
    --el-button-hover-text-color: rgba(1, 79, 233, 0.6);
    --el-button-hover-link-text-color: rgba(1, 79, 233, 0.6);
    --el-button-active-color: #0047d4;
  }

  :deep(.el-popper) {
    max-width: 600px !important;
  }

  .pagination-part {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(.el-pager li) {
      border: 1px solid #e2e7ef;
      margin: 0 4px;
    }

    :deep(.el-pager li.is-active) {
      background-color: #2e77e8;
      color: #ffffff;
    }

    :deep(.el-pagination) {
      --el-pagination-hover-color: #2e77e8;
      --el-pagination-button-bg-color: #f1f5f9;
    }

    :deep(.el-pagination__jump),
    :deep(.el-pagination__sizes) {
      margin-left: 8px;
    }

    :deep(.el-pagination button) {
      margin: 0 4px;
      padding: 0 12px;
      border: 1px solid #e2e7ef;
    }

    :deep(.el-pagination .btn-prev) {
      margin-left: 8px;
    }

    :deep(.el-pagination .el-input__wrapper) {
      height: 32px;
      border-radius: 0;
    }
  }
}
</style>
