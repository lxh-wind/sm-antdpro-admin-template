// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  /**
   * @name 开启 build 时生成额外的 manifest 文件，用于描述产物。
   * @description 关于参数。fileName 是生成的文件名，默认是 asset-manifest.json；basePath 会给所有文件路径加上前缀。
   * @doc https://umijs.org/docs/api/config#manifest
   */
  // manifest: {
  //   basePath: '/',
  // },

  /**
   * @name 开启 hash 模式
   * @description 让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存。
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  /**
   * @name 配置 webpack 的 publicPath。
   * @doc https://umijs.org/docs/api/config#publicpath
   */
  // publicPath: process.env.PUBLIC_PATH || '/',

  /**
   * @name 兼容性设置
   * @description 设置 ie11 不一定完美兼容，需要检查自己使用的所有依赖
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },

  /**
   * @name 路由的配置，不在路由中引入的文件不会编译
   * @description 只支持 path，component，routes，redirect，wrappers，title 的配置
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,

  /**
   * @name 主题的配置
   * @description 虽然叫主题，但是其实只是 less 的变量设置
   * @doc antd的主题设置 https://ant.design/docs/react/customize-theme-cn
   * @doc umi 的theme 配置 https://umijs.org/docs/api/config#theme
   */
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    'root-entry-name': 'variable',
    'primary-color': defaultSettings.colorPrimary
  },

  /**
   * @name moment 的国际化配置
   * @description 如果对国际化没有要求，打开之后能减少js的包大小
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,

  /**
   * @name 代理配置
   * @description 可以让你的本地服务器代理到你的服务器上，这样你就可以访问服务器的数据了
   * @see 要注意以下 代理只能在本地开发时使用，build 之后就无法使用了。
   * @doc 代理介绍 https://umijs.org/docs/guides/proxy
   * @doc 代理配置 https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],

  /**
   * @name 快速热更新配置
   * @description 一个不错的热更新组件，更新时可以保留 state
   */
  fastRefresh: true,

  //============== 以下都是max的插件配置 ===============
  /**
   * @name 数据流插件
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},

  /**
   * 一个全局的初始数据流，可以用它在插件之间共享数据
   * @description 可以用来存放一些全局的数据，比如用户信息，或者一些全局的状态，全局初始状态在整个 Umi 项目的最开始创建。
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},

  /**
   * @name layout 插件
   * @doc https://umijs.org/docs/max/layout-menu
   */
  layout: {
    locale: false,
    ...defaultSettings,
  },

  /**
   * @name 国际化插件
   * @doc https://umijs.org/docs/max/i18n
   */
  // locale: {
  //   // default zh-CN
  //   default: 'zh-CN',
  //   antd: true,
  //   // default true, when it is true, will use `navigator.language` overwrite default
  //   baseNavigator: true,
  // },

  /**
   * @name antd 插件
   * @description 内置了 babel import 插件
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {
    // configProvider: {},
    // dark: true, // themes
    // compact: true,
    // import: true, // babel-plugin-import
    // style: 'less', // less or css, default less
  },

  /**
   * @name 网络请求配置
   * @description 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
   * @doc https://umijs.org/docs/max/request
   */
  request: {},

  /**
   * @name 权限插件
   * @description 基于 initialState 的权限插件，必须先打开 initialState
   * @doc https://umijs.org/docs/max/access
   */
  access: {},

  //================ pro 插件配置 =================
  /**
   * @name 配置额外的 Umi 插件集
   * @description 数组项为指向插件集的路径，可以是 npm 依赖、相对路径或绝对路径。如果是相对路径，则会从项目根目录开始找。
   * @doc https://umijs.org/docs/api/config#presets
   */
  presets: ['umi-presets-pro'],

  /**
   * @name openAPI 插件的配置
   * @description 基于 openapi 的规范生成serve 和mock，能减少很多样板代码
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],

  /**
   * @name Module Federation
   * @description 配置基于 Module Federation 的提速功能
   * @doc https://umijs.org/docs/api/config#mfsu
   */
  mfsu: {
    strategy: 'normal',
  },

  /**
   * @name
   * @description
   * @doc
   */
  requestRecord: {},

  /**
   * @name 设置 less-loader 的 Options
   * @description 具体参考参考 less-loader 的 Options。
   * @doc https://github.com/webpack-contrib/less-loader#lessoptions
   * @doc https://umijs.org/docs/api/config#lessloader
   */
  // lessLoader: {
  //   modifyVars: {
  //     hack: `true; @import "~@/styles/variable/index.less";`
  //   }
  // },

  /**
   * @name 支持配置多个 favicon 文件
   * @description 配置 favicons 路径，可以是绝对路径，也可以是基于项目根目录的相对路径。
   * 比如：favicons: ['/assets/favicon.ico']
   * HTML 中会生成 <link rel="shortcut icon" type="image/x-icon" href="/assets/favicon.ico" />
   * @doc https://umijs.org/docs/api/config#favicons
   */
  // favicons: [
  // ],

  /**
   * @name 配置全局页面 title
   * @description 暂时只支持静态的 Title。
   * @doc https://umijs.org/docs/api/config#title
   */
  title: '三盟科技',

  /**
   * @name 设置路由 history 类型
   * @doc https://umijs.org/docs/api/config#history
   */
  // history: {
  //   type: 'hash',
  // },

  /**
   * @name 添加统计
   * @doc https://umijs.org/docs/max/analytics
   */
  // analytics: {
  //   baidu: '',
  // },

  /**
   * @name 设置 sourcemap 生成方式
   * @description 常见可选值有：
   * eval，最快的类型，缺点是不支持低版本浏览器
   * source-map，最慢但最全的类型
   * @doc https://umijs.org/docs/api/config#devtool
   */
  // devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
  // devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false
});
