<template>
  <data-table
    :data="tableData"
    :columns="columns"
    :actions="actions"
    :total="tableData.length"
    @action-click="handleActionClick"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const columns = ref<TableColumn[]>([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', minWidth: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'email', label: '邮箱', minWidth: 200 },
  { prop: 'status', label: '状态', width: 100, formatter: (row) => row['status'] === 1 ? '启用' : '禁用' },
]);

const tableData = ref<TableData[]>([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', status: 1 },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com', status: 0 },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', status: 1 },
  { id: 4, name: '赵六', age: 35, email: 'zhaoliu@example.com', status: 1 },
  { id: 5, name: '孙七', age: 22, email: 'sunqi@example.com', status: 0 },
]);

const actions = ref<TableAction[]>([
  { name: 'edit', label: '编辑', type: 'primary' },
  { name: 'delete', label: '删除', type: 'danger' },
]);

const handleActionClick = (action: TableAction, row: TableData) => {
  console.log('action:', action.name, 'row:', row);
};
</script>

<style lang="scss" scoped></style>
