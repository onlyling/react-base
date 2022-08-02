import loadable from '@loadable/component'
import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import AdminLayout from '@/layouts/admin-layout/admin-layout'
import BaseLayout from '@/layouts/base-layout/base-layout'
import EmptyRoute from '@/router/components/empty-route'
import ErrorBoundary from '@/router/components/error-boundary'
import RouteLoading from '@/router/components/loading'

// import PageLogin from '@/pages/login/login';
// import PageHome from '@/pages/home/home';
// import PageUserManageList from '@/pages/user-manage/list/list';
// import PageUserManageDetails from '@/pages/user-manage/details/details';

const loadableWrapper = (fn: any) =>
  loadable(fn, {
    fallback: <RouteLoading />,
  })

const UserManage = () => {
  return (
    <EmptyRoute>
      <Switch>
        <Route
          path="/user-manage/list"
          component={loadableWrapper(
            () =>
              import(
                /* webpackChunkName: "user-manage-list" */ '@/pages/user-manage/list/list'
              ),
          )}
        />
        <Route
          path="/user-manage/details/:id"
          component={loadableWrapper(
            () =>
              import(
                /* webpackChunkName: "user-manage-details" */ '@/pages/user-manage/details/details'
              ),
          )}
        />
      </Switch>
    </EmptyRoute>
  )
}

const AppRouter: React.FC = () => {
  return (
    <Router>
      <BaseLayout>
        <AdminLayout
          logo="https://img.yzcdn.cn/vant/cat.jpeg"
          smallLogo="https://img.yzcdn.cn/vant/logo.png">
          <ErrorBoundary>
            <Switch>
              <Route path="/">
                <Redirect to="/home" />
              </Route>

              <Route
                path="/login"
                component={loadableWrapper(
                  () =>
                    import(
                      /* webpackChunkName: "login" */ '@/pages/login/login'
                    ),
                )}
              />

              <Route
                path="/home"
                component={loadableWrapper(
                  () =>
                    import(/* webpackChunkName: "home" */ '@/pages/home/home'),
                )}
              />

              <Route
                path="/flex"
                component={loadableWrapper(
                  () =>
                    import(/* webpackChunkName: "flex" */ '@/pages/flex/flex'),
                )}
              />

              <Route
                path="/demos/props"
                component={loadableWrapper(
                  () =>
                    import(
                      /* webpackChunkName: "demo-props" */ '@/pages/demo/props/props'
                    ),
                )}
              />

              <Route
                path="/pro-table/demo"
                component={loadableWrapper(
                  () =>
                    import(
                      /* webpackChunkName: "protable-demo" */ '@/pages/pro-table/demo'
                    ),
                )}
              />

              <Route
                path="/pro-table/table"
                component={loadableWrapper(
                  () =>
                    import(
                      /* webpackChunkName: "protable-table" */ '@/pages/pro-table/table'
                    ),
                )}
              />

              <Route
                path="/pro-table/table-2"
                component={loadableWrapper(
                  () =>
                    import(
                      /* webpackChunkName: "protable-table2" */ '@/pages/pro-table/table-2'
                    ),
                )}
              />

              <Route path="/user-manage" component={UserManage} />
            </Switch>
          </ErrorBoundary>
        </AdminLayout>
      </BaseLayout>
    </Router>
  )
}

export default AppRouter
