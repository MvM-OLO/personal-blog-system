<script lang="ts" setup>
import { ref, unref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { Button } from 'ant-design-vue';
import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteMenuApi } from '#/api';
import { formOptions, gridOptions } from './menu.data';
import AddDrawer from './menuDrawer.vue';

const expand = ref(false);

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: unref(formOptions),
  gridOptions,
});
const [Drawer, drawerApi] = useVbenDrawer({
  // 连接抽离的组件
  connectedComponent: AddDrawer,
});
function handleEdit(row: Object) {
  drawerApi.setData({
    row,
    isUpdate: true,
  });
  drawerApi.open();
}
async function handleRemove(row: { menuId: string }) {
  await deleteMenuApi(row.menuId);
  gridApi.grid.commitProxy('reload');
}
function handleAdd(row: Object) {
  drawerApi.setData({
    row,
    isUpdate: false,
  });
  drawerApi.open();
}
async function handleSuccess() {
  await gridApi.grid.commitProxy('reload');
}
function handleCollapse() {
  expand.value = !expand.value;
  gridApi.grid?.setAllTreeExpand(expand.value);
}
</script>

<template>
  <Page auto-content-height>
    <template #title>
      <div class="flex items-center justify-between gap-2">
        <div class="text-base font-bold text-[#007FFF]">菜单管理</div>
      </div>
    </template>
    <Grid>
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="handleAdd"> 新增 </Button>
      </template>
      <template #action="{ row }">
        <div class="flex w-full justify-center">
          <Button class="text-[#007EFF]" type="link" @click="handleEdit(row)">
            编辑
          </Button>
          <Button class="text-[#007EFF]" type="link" @click="handleAdd(row)">
            新增
          </Button>
          <!-- <ModalConfirm
            cancel-text="否"
            ok-text="是"
            title="确认是否删除?"
            @confirm="handleRemove(row)"
            placement="topLeft"
          >
            <Button class="text-[##FF0000]" danger type="link"> 删除 </Button>
          </ModalConfirm> -->
        </div>
      </template>
    </Grid>
    <Drawer class="sm:w-[500px]" @success="handleSuccess" />
  </Page>
</template>

<style scoped>
:deep(.vxe-cell--tree-node) {
  border: none !important;
}
</style>
