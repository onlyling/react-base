import React from 'react';

import { Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ActionText from '../action-text/action-text';

/** 单个操作 */
export type OperationItem = {
  text: string;
  onClick?: () => void;
  danger?: boolean;
};

interface BatchOperationProps {
  actions: OperationItem[];
}

/**
 * 批量操作
 */
const BatchOperation: React.FC<BatchOperationProps> = ({ actions }) => {
  /** 下拉的列表的内部配置 */
  const menu = (
    <Menu>
      {actions.map((item) => (
        <Menu.Item key={item.text} danger={item.danger}>
          <ActionText text={item.text} onClick={item.onClick} type="text" />
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button>
        批量操作 <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default BatchOperation;
