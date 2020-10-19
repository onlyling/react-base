import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

import EmptyRoute from '@/router/components/empty-route';
import RouteLoading from '@/router/components/loading';
import ErrorBoundary from '@/router/components/error-boundary';

import BaseLayout from '@/layouts/base-layout/base-layout.tsx';
import AdminLayout from '@/layouts/admin-layout/admin-layout';

// import PageLogin from '@/pages/login/login';
// import PageHome from '@/pages/home/home';
// import PageUserManageList from '@/pages/user-manage/list/list';
// import PageUserManageDetails from '@/pages/user-manage/details/details';

const loadableWrapper = (fn: any) =>
  loadable(fn, {
    fallback: <RouteLoading />,
  });

const AppRouter: React.FC = () => {
  return (
    <Router>
      <BaseLayout>
        <AdminLayout
          logo="https://img.yzcdn.cn/vant/cat.jpeg"
          smallLogo="https://img.yzcdn.cn/vant/logo.png"
        >
          <ErrorBoundary>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>

              <Route
                exact
                path="/login"
                component={loadableWrapper(() => import('@/pages/login/login'))}
              />

              <Route
                exact
                path="/home"
                component={loadableWrapper(() => import('@/pages/home/home'))}
              />

              <Route
                path="/user-manage"
                component={() => {
                  return (
                    <EmptyRoute>
                      <Switch>
                        <Route
                          exact
                          path="/user-manage/list"
                          component={loadableWrapper(() => import('@/pages/user-manage/list/list'))}
                        />
                        <Route
                          exact
                          path="/user-manage/details/:id"
                          component={loadableWrapper(
                            () => import('@/pages/user-manage/details/details'),
                          )}
                        />
                      </Switch>
                    </EmptyRoute>
                  );
                }}
              />
            </Switch>
          </ErrorBoundary>
        </AdminLayout>
      </BaseLayout>
    </Router>
  );
};

export default AppRouter;
