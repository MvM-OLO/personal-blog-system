import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getAllMenusApi } from '#/api';

export const formOptions: VbenFormProps = {
  schema: [
    {
      component: 'Input',
      fieldName: 'menuName',
      label: '菜单名称',
      formItemClass: 'col-span-2',
      labelWidth: 70,
      componentProps: {
        allowClear: true,
      },
    },
    {
      component: 'Select',
      fieldName: 'status',
      label: '状态',
      labelWidth: 70,
      formItemClass: 'col-span-2',
      componentProps: {
        options: [
          {
            label: '正常',
            value: '0',
          },
          {
            label: '停用',
            value: '1',
          },
        ],
        allowClear: true,
      },
    },
  ],
  showCollapseButton: false,
  // 按下回车时是否提交表单
  submitOnEnter: true,
  wrapperClass: 'grid-cols-10',
  // showDefaultActions: false,
};
export const gridOptions: VxeGridProps = {
  columns: [
    { field: 'meta.title', title: '菜单名称', treeNode: true },
    { field: 'path', title: '路由地址' },
    { field: 'component', title: '组件路径' },
    {
      title: '操作',
      slots: { default: 'action' },
      fixed: 'right',
    },
  ],
  height: 'auto',
  keepSource: true,
  columnConfig: {
    resizable: false,
  },
  pagerConfig: {
    enabled: false,
  },
  proxyConfig: {
    response: {
      list: 'rows',
    },
    ajax: {
      query: async ({ page }, formValues) => {
        const params = {
          ...page,
          ...formValues,
        };
        const res = await getAllMenusApi();
        // res.forEach((item: any) => {
        //   item.status = item.status === '0';
        // });
        console.log(res, 'res');

        return {
          rows: res,
        };
      },
    },
  },
};
export const formSchema = [
  {
    component: 'ApiTreeSelect',
    label: '上级菜单',
    fieldName: 'pid',
    componentProps: {
      api: async () => {
        const res = await getAllMenusApi();
        return [
          {
            children: res,
            menuName: '主类目',
            menuId: 0,
          },
        ];
      },
      labelField: 'menuName',
      valueField: 'menuId',
      class: 'w-full',
    },
  },
  {
    component: 'RadioGroup',
    label: '菜单类型',
    fieldName: 'menuType',
    defaultValue: 'M',
    componentProps: {
      options: [
        {
          label: '目录',
          value: 'M',
        },
        {
          label: '菜单',
          value: 'C',
        },
        {
          label: '按钮',
          value: 'F',
        },
      ],
    },
  },
  {
    component: 'Input',
    fieldName: 'icon',
    label: '菜单图标',
    componentProps: {
      allowClear: true,
    },
    dependencies: {
      if(values: any) {
        return values.menuType !== 'F';
      },
      triggerFields: ['menuType'],
    },
  },
  {
    component: 'Input',
    fieldName: 'menuName',
    rules: 'required',
    label: '菜单名称',
  },
  {
    component: 'InputNumber',
    fieldName: 'orderNum',
    rules: 'required',
    label: '显示排序',
  },
  {
    component: 'Input',
    fieldName: 'path',
    rules: 'required',
    label: '路由地址',
    dependencies: {
      if(values: any) {
        return values.menuType !== 'F';
      },
      triggerFields: ['menuType'],
    },
  },
  {
    component: 'Input',
    fieldName: 'activePath',
    label: '当前激活路径',
    dependencies: {
      if(values: any) {
        return values.menuType === 'C';
      },
      triggerFields: ['menuType'],
    },
  },
  {
    component: 'Input',
    fieldName: 'component',
    rules: 'required',
    label: '组件路径',
    dependencies: {
      if(values: any) {
        return values.menuType === 'C';
      },
      triggerFields: ['menuType'],
    },
  },

  {
    component: 'Input',
    fieldName: 'permission',
    label: '权限字符',
    dependencies: {
      if(values: any) {
        return values.menuType !== 'M';
      },
      triggerFields: ['menuType'],
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'isCache',
    label: '是否缓存',
    defaultValue: 0,
    componentProps: {
      options: [
        {
          label: '缓存',
          value: 0,
        },
        {
          label: '不缓存',
          value: 1,
        },
      ],
    },
    dependencies: {
      if(values: any) {
        return values.menuType === 'C';
      },
      triggerFields: ['menuType'],
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'visible',
    label: '显示状态',
    defaultValue: '0',
    componentProps: {
      options: [
        {
          label: '显示',
          value: '0',
        },
        {
          label: '隐藏',
          value: '1',
        },
      ],
    },
    dependencies: {
      if(values: any) {
        return values.menuType !== 'F';
      },
      triggerFields: ['menuType'],
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'status',
    label: '菜单状态',
    defaultValue: '0',
    componentProps: {
      options: [
        {
          label: '正常',
          value: '0',
        },
        {
          label: '停用',
          value: '1',
        },
      ],
    },
    dependencies: {
      if(values: any) {
        return values.menuType !== 'F';
      },
      triggerFields: ['menuType'],
    },
  },
];
