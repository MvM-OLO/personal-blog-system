import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.get<RouteRecordStringComponent[]>('/menu/all');
}

/**
 * 获取用户所有菜单
 */
export async function deleteMenuApi(id: string) {
  return requestClient.delete<RouteRecordStringComponent[]>(`/menu/${id}`);
}

/**
 * 添加菜单
 */
export async function addMenuApi(menu: RouteRecordStringComponent) {
  return requestClient.post<RouteRecordStringComponent[]>('/menu/add', menu);
}

/**
 * 更新菜单
 */
export async function updateMenuApi(menu: RouteRecordStringComponent) {
  return requestClient.put<RouteRecordStringComponent[]>(`/menu`, menu);
}

/**
 * 调整菜单排序
 */
export async function updateSortMenuApi(
  sortData: { id: number; sort: number }[],
) {
  return requestClient.patch<RouteRecordStringComponent[]>(
    '/menu/sort',
    sortData,
  );
}

/**
 * 获取菜单详情
 */
export async function getMenuDetailApi(id: string) {
  return requestClient.get<RouteRecordStringComponent[]>(`/menu/${id}`);
}
