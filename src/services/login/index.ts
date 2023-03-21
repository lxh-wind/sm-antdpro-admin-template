import { request } from '@umijs/max';
import type { ResponseModel } from '@/types';

/**
 * @description 用户登录接口
 * @param {*}
 * @return {*}
 */
export async function login(data: API.LoginParams, options?: { [key: string]: any }): Promise<ResponseModel<any>> {
  return request('/api/admin/login/login', {
    method: 'POST',
    params: data,
    ...(options || {}),
  });
}

/**
 * @description 用户退出登录
 * @return {*}
 */
export async function logout(): Promise<ResponseModel<Record<string, any>>> {
  return request('/api/admin/login/logout', {
    method: 'POST',
  });
}

/**
 * @description 获取当前用户信息
 * @return {*}
 */
export async function getUserInfo(): Promise<ResponseModel<any>> {
  return request('/api/admin/index/getBrandStaffInfo', {
    method: 'GET',
  });
}

/**
 * @description 获取用户权限菜单
 * @return {*}
 */
export async function getRoutesMenus(): Promise<ResponseModel<any[]>> {
  return request('/api/admin/index/menu', {
    method: 'GET',
  });
}
