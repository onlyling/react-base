import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import Container from './container';
import { buildClassName } from './helper';
import { AdminLayoutProps } from './interface';
import SiderMenu from './components/sider-menu';
import './admin-layout.less';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  theme = 'light',
  siderWidth = 280,
  logo,
  smallLogo,
}) => {
  /** 深色 */
  const isDark = theme === 'dark';

  // 侧边栏是否收起
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // 初始化的时候找到默认的菜单栏
    console.log('|||');
  }, []);

  return (
    <Container.Provider>
      <Layout className={buildClassName('')}>
        <Sider
          collapsible
          className={classnames(
            isDark ? buildClassName('_sider-dark') : buildClassName('_sider-light'),
            buildClassName('_sider'),
          )}
          trigger={null}
          collapsed={collapsed}
          width={siderWidth}
        >
          {logo ? (
            <img
              alt=""
              src={collapsed ? smallLogo || logo : logo}
              className={buildClassName('_logo')}
            />
          ) : null}

          <SiderMenu theme={theme} />
        </Sider>

        <Layout>
          <Header
            className={classnames(
              isDark ? buildClassName('_header-dark') : buildClassName('_header-light'),
            )}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => {
                setCollapsed((cp) => !cp);
              },
            })}
          </Header>

          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Container.Provider>
  );
};

export default AdminLayout;
