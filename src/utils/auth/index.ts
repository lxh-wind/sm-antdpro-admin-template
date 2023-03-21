import { history } from '@umijs/max';
import { login, logout, getUserInfo, getRoutesMenus } from '@/services/login';
import { stringify } from 'querystring';

const loginPath = '/login';

/**
 * 登录
 */
export const fetchLogin = async (data: any) => {
  try {
    const res = await login(data);
    localStorage.setItem('dongdongToken', res.data.token);
    return res.data;
  } catch (error) {
    history.push(loginPath);
  }
  return undefined;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
export const fetchLogout = async () => {
  await logout();
  const { search, pathname } = window.location;
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

/**
 * @description 获取用户信息
 * @return {*}
 */
export const fetchUserInfo = async () => {
  try {
    const res = await getUserInfo();
    return res.data;
  } catch (error) {
    history.push(loginPath);
  }
  return undefined;
};

/**
 * @description 获取用户菜单权限
 * @return {*}
 */
export const fetchRouteMenu = async () => {
  try {
    const result = await getRoutesMenus();
    return result.data;
  } catch (error) {
    history.push(loginPath);
  }
  return undefined;
};
