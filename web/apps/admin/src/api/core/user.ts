import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user/info');
}
/**
 * 获取用户信息
 */
export async function registerUser(data: {
  userName: string;
  password: string;
  confirmPassword: string;
}) {
  return requestClient.post<UserInfo>('/user/register', data);
}
