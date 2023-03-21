import type { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @description App.tsx 全局初始数据
 * @return {*}
 */
export type InitialStateModel = {
  accessToken?: string;
  settings?: Partial<LayoutSettings>;
  currentUser?: API.USERMANAGEMENT;
  routeMenu?: API.MENUMANAGEMENT[];
  fetchUserInfo?: () => Promise<API.USERMANAGEMENT | undefined>;
  fetchRouteMenu?: () => Promise<API.MENUMANAGEMENT[] | undefined>;
}

/**
 * @description Response 返回体，默认是不分页，如果是分页查询，需要自己将 Model 带入
 * @return {*}
 */
export type ResponseModel<T> = {
  code?: number;
  data: T;
  message?: string;
  status?: 'success' | 'fail'
};
