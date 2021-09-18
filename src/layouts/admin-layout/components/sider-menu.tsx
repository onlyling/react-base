import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import { buildClassName } from '../helper';
import type { SiderMenuProps } from '../interface';
import Container from '../container';

const { SubMenu } = Menu;

const SiderMenu: React.FC<SiderMenuProps> = ({ theme }) => {
  const { selectedKeys, openKeys, setOpenKeys } = Container.useContainer();

  return (
    <Menu
      className={buildClassName('_sider-menu')}
      mode="inline"
      inlineIndent={16}
      theme={theme}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={(oks) => {
        console.log(oks);
        setOpenKeys(oks as string[]);
      }}
    >
      <Menu.Item key="/home">
        <Link to="/home">nav 1</Link>
      </Menu.Item>
      <Menu.Item key="/login">
        <Link to="/login">nav 2</Link>
      </Menu.Item>
      <Menu.Item key="/user-manage/list">
        <Link to="/user-manage/list">nav 3</Link>
      </Menu.Item>
      <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
        <Menu.Item key="1">option1</Menu.Item>
        <Menu.Item key="2">option2</Menu.Item>
        <Menu.Item key="3">option3</Menu.Item>
        <Menu.Item key="4">option4</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
        <Menu.Item key="5">option5</Menu.Item>
        <Menu.Item key="6">option6</Menu.Item>
        <Menu.Item key="7">option7</Menu.Item>
        <Menu.Item key="8">option8</Menu.Item>
      </SubMenu>
      <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
        <Menu.Item key="9">option9</Menu.Item>
        <Menu.Item key="10">option10</Menu.Item>
        <Menu.Item key="11">option11</Menu.Item>
        <Menu.Item key="12">option12</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default SiderMenu;
