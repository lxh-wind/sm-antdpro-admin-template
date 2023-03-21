import React from 'react';
import { Input } from 'antd';
import { SettingDrawer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { fetchUserInfo, fetchRouteMenu } from '@/utils/auth'
import { errorConfig } from './utils/umiRequest';
import Footer from '@/components/layout/Footer';
import RightContent from '@/components/layout/RightContent';
import defaultSettings from '../config/defaultSettings';
import type { RunTimeLayoutConfig } from '@umijs/max';
import type { InitialStateModel } from '@/types'

const { Search } = Input;

/**
 * 约定一个地方生产和消费初始化数据
 * @see https://umijs.org/zh-CN/plugins/plugin-initial-state
 */
export async function getInitialState(): Promise<InitialStateModel> {
  // 初始化数据
  const initialState: InitialStateModel = {
    fetchUserInfo,
    fetchRouteMenu,
    settings: defaultSettings,
  }
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== '/login') {
    const currentUser = await fetchUserInfo();
    const routeMenu = await fetchRouteMenu();
    return { ...initialState, currentUser, routeMenu };
  }
  return initialState;
}

/**
 * ProLayout 支持的api https://procomponents.ant.design/components/layout
 */
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    // 自定义 collapsed button 的方法
    collapsedButtonRender: false,
    // 右侧工具栏
    rightContentRender: () => <RightContent />,
    // 配置水印，水印是 PageContainer 的功能，layout 只是透传给 PageContainer
    waterMarkProps: {
      content: initialState?.currentUser?.staff?.real_name,
    },
    // 自定义页脚的 render 方法
    footerRender: () => <Footer />,
    // 页面切换时触发
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== '/login') {
        history.push('/login');
      }
    },
    // 显示在菜单右下角的快捷操作
    links: [],
    // 自定义的菜单头区域
    menuHeaderRender: () => {
      return (
        <Search placeholder="功能搜索" style={{ width: 200 }} />
      )
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <div style={{ display: 'none' }}>
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          </div>
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
