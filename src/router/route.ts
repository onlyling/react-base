/**
 * 单个路由的配置
 */
export type RouteItem = {
  /**
   * 左侧菜单名称
   */
  name?: string;

  /**
   * 路由路径
   */
  path: string;

  /**
   * 路由组件路径
   */
  component: string;

  /**
   * 图标
   */
  icon?: React.ReactElement;

  /**
   * 子路由/子菜单
   */
  routes?: RouteItem[];
};
