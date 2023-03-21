import { message, notification } from 'antd';
import { history } from 'umi'
import { debounce } from 'lodash';
import qs from 'qs'
import { getCookie } from '@/utils/storage/cookie'
import type { RequestOptions, RequestError } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';

// 与后端约定的响应数据格式
// interface ResponseStructure {
//   code: number;
//   data: any;
//   message: string;
//   status: string;
//   path?: string;
// }

/**
 * @description: 防抖函数统一处理异常错误
 * @param {*} debounce
 * @return {*}
 */
const authError = debounce((content, duration = 3) => {
  message.error(content, duration);
}, 300);

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误接收及处理
    errorHandler: (error: RequestError, opts: RequestOptions) => {
      // 获取报错的响应和请求信息
      const { response, request } = error;
      // 配置 skipErrorHandler 会跳过默认的错误处理，用于项目中部分特殊的接口
      if (opts?.skipErrorHandler) throw error;

      if (response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        authError(response.data.msg || '服务器内部发生错误！');
      } else if (request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        authError('请求未成功,请重新尝试！');
      } else {
        // 发送请求时出了点问题
        authError('请求出错,请重新尝试！');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 处理data数据
      if (config.method === 'post') {
        config.data = qs.stringify(config.data);
      }
      // 请求头携带token
      if (config.headers) {
        const token = getCookie('token') || localStorage.getItem('dongdongToken') || '';
        config.headers.Authorization = `Bearer ${token}`;
      }
      return {
        ...config
      };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data: responseData } = response as any;
      // 根据返回状态码，统一处理
      const { code, data, message: msg, status, path } = responseData;
      switch (code) {
        /** 处理重定向 */
        case 302:
          if (history.location.pathname !== path) {
            history.replace(path)
          }
          break;
        /** 退出登录 */
        case 10001:

          break;
        /**
         * 扫码登录错误
         * 10003 用户信息获取失败、员工信息不存在
         * 10002 企业已禁用
         */
        case 10003:
        case 10002:
          notification.warning({
            message: '账号异常',
            description: msg
          })
          // handleLogout()
          break;
      }
      return response;
    },
  ],
};
