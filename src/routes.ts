export type RouteConfig = {
  path: string;
  component: string;
  title?: string;
  icon?: string;
  exact?: boolean;
  redirect?: string;
  routes?: RouteConfig[];
};

export const routes: RouteConfig[] = [
  {
    path: '/home',
    component: '@/pages/home/home',
  },
];
