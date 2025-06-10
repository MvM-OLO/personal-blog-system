<script lang="ts" setup>
import { ref } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';
// import IconPicker from '#/components/IconPicker/index.vue';
import { useVbenForm } from '#/adapter/form';
import { addMenuApi, updateMenuApi } from '#/api';

import { formSchema } from './menu.data';

interface RowInfo {
  menuId?: number;
  icon?: string;
}

const emit = defineEmits(['success']);
const isUpdate = ref(false);
const rowInfo = ref<RowInfo>({});
const iconValue = ref('');

const [Form, formApi] = useVbenForm({
  schema: formSchema,
  showDefaultActions: false,
});

const [Drawer, drawerApi] = useVbenDrawer({
  onOpenChange,
  onConfirm,
});

function onOpenChange(isOpen: Boolean) {
  if (isOpen) {
    formApi.resetForm();
    const values = drawerApi.getData();
    isUpdate.value = !!values?.isUpdate;
    rowInfo.value = values.row;
    iconValue.value = rowInfo.value?.icon || '';
    formApi.setValues(
      isUpdate.value ? rowInfo.value : { pid: rowInfo.value?.menuId },
    );
  } else {
    drawerApi.setData({});
    iconValue.value = '';
  }
}

async function onConfirm() {
  await formApi.validate();
  const params = await formApi.getValues();
  const values = { ...params, icon: iconValue.value };

  await (isUpdate.value
    ? updateMenuApi({ ...values, id: rowInfo.value.menuId })
    : addMenuApi(values));
  emit('success');
  drawerApi.close();
}

function handleIconChange(value: string) {
  iconValue.value = value;
}
</script>

<template>
  <Drawer :title="isUpdate ? '编辑菜单' : '新增菜单'" class="w-[700px]">
    <Form>
      <template #icon="props">
        <IconPicker
          v-model:value="iconValue"
          @change="handleIconChange"
          v-bind="props"
        />
      </template>
    </Form>
  </Drawer>
</template>
