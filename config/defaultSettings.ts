import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // 导航栏菜单主题色，"light" | "dark" | "realDark"
  navTheme: 'light',
  // 主色，需要配合umi使用
  colorPrimary: '#1a83ed',
  // layout的布局方式
  layout: 'mix',
  // layout的内容模式, Fluid：自适应 | Fixed：定宽1200px
  contentWidth: 'Fluid',
  // 把第一级的菜单放置到顶栏
  splitMenus: true,
  // 是否固定header到顶部
  fixedHeader: false,
  // 是否固定导航
  fixSiderbar: true,
  // 全局增加滤镜
  colorWeak: false,
  // 显示在布局左上角的产品名
  title: '后台模板',
  // pwa
  pwa: false,
  // 显示在布局左上角产品名前的产品Logo
  logo: '',
  // iconfont script url
  iconfontUrl: '',
  // menu配置
  menu: {
    // 菜单国际化的配置
    locale: false,
    // 菜单聚合的模式，"sub" | "group"
    type: 'group',
    // 是否打开所有的菜单
    defaultOpenAll: true,
  },
};

export default Settings;
