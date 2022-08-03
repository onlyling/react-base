import React, { lazy } from 'react'
import { useRoutes, Navigate } from 'react-router-dom'

import ErrorBoundary from '@/components/error-boundary'
import AdminLayout from '@/layouts/admin-layout/admin-layout'
import BaseLayout from '@/layouts/base-layout/base-layout'

import EmptyRoute from './components/empty-route'
import { buildRouteSuspense } from './suspense'

// import PageLogin from '@/pages/login/login';
// import PageHome from '@/pages/home/home';
// import PageUserManageList from '@/pages/user-manage/list/list';
// import PageUserManageDetails from '@/pages/user-manage/details/details';

// const UserManage = () => {
//   return (
//     <EmptyRoute>
//       <Switch>
//         <Route
//           path="/user-manage/list"
//           component={loadableWrapper(
//             () =>
//               import(
//                 /* webpackChunkName: "user-manage-list" */ '@/pages/user-manage/list/list'
//               ),
//           )}
//         />
//         <Route
//           path="/user-manage/details/:id"
//           component={loadableWrapper(
//             () =>
//               import(
//                 /* webpackChunkName: "user-manage-details" */ '@/pages/user-manage/details/details'
//               ),
//           )}
//         />
//       </Switch>
//     </EmptyRoute>
//   )
// }

const AppRouter: React.FC = () => {
  return (
    <BaseLayout>
      <ErrorBoundary>
        {useRoutes([
          {
            path: '/login',
            element: buildRouteSuspense(
              lazy(
                () =>
                  import(/* webpackChunkName: "login" */ '@/pages/login/login'),
              ),
            ),
          },
          {
            path: '/',
            element: (
              <AdminLayout
                logo="https://img.yzcdn.cn/vant/cat.jpeg"
                smallLogo="https://img.yzcdn.cn/vant/logo.png"
              />
            ),
            children: [
              {
                index: true,
                element: <Navigate to="/home" replace />,
              },
              {
                path: '/home',
                element: buildRouteSuspense(
                  lazy(
                    () =>
                      import(
                        /* webpackChunkName: "home" */ '@/pages/home/home'
                      ),
                  ),
                ),
              },
              {
                path: '/flex',
                element: buildRouteSuspense(
                  lazy(
                    () =>
                      import(
                        /* webpackChunkName: "flex" */ '@/pages/flex/flex'
                      ),
                  ),
                ),
              },
              {
                path: '/demos/props',
                element: buildRouteSuspense(
                  lazy(
                    () =>
                      import(
                        /* webpackChunkName: "demo-props" */ '@/pages/demo/props/props'
                      ),
                  ),
                ),
              },
              {
                path: '/pro-table/demo',
                element: buildRouteSuspense(
                  lazy(
                    () =>
                      import(
                        /* webpackChunkName: "protable-demo" */ '@/pages/pro-table/demo'
                      ),
                  ),
                ),
              },
              {
                path: '/pro-table/table',
                element: buildRouteSuspense(
                  lazy(
                    () =>
                      import(
                        /* webpackChunkName: "protable-table" */ '@/pages/pro-table/table'
                      ),
                  ),
                ),
              },
              {
                path: '/pro-table/table-2',
                element: buildRouteSuspense(
                  lazy(
                    () =>
                      import(
                        /* webpackChunkName: "protable-table2" */ '@/pages/pro-table/table-2'
                      ),
                  ),
                ),
              },
              {
                path: '/user-manage',
                element: <EmptyRoute />,
                children: [
                  {
                    index: true,
                    element: <Navigate to="/user-manage/list'" replace />,
                  },
                  {
                    path: '/user-manage/list',
                    element: buildRouteSuspense(
                      lazy(
                        () =>
                          import(
                            /* webpackChunkName: "user-manage-list" */ '@/pages/user-manage/list/list'
                          ),
                      ),
                    ),
                  },
                  {
                    path: '/user-manage/details/:id',
                    element: buildRouteSuspense(
                      lazy(
                        () =>
                          import(
                            /* webpackChunkName: "user-manage-details" */ '@/pages/user-manage/details/details'
                          ),
                      ),
                    ),
                  },
                ],
              },
            ],
          },
        ])}
      </ErrorBoundary>
    </BaseLayout>
  )
}

export default AppRouter
