import React from 'react';
import { Popconfirm } from 'antd';
import classnames from 'classnames';
import { history } from 'umi';
import { PopconfirmProps } from 'antd/es/popconfirm';

import './action-text.less';

export interface ActionTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 自定义 key,如果 text 是 boolean 或重复的组件 xxx.toString() 是一样的时候需要自定义一下比较好 */
  key?: string;

  /** 显示的文字 */
  text?: React.ReactNode;

  /** 类型、样子 */
  type?: 'text' | 'primary' | 'success' | 'danger' | 'warning';

  /** 路由跳转  */
  to?: string;

  /** 路由跳转方式 */
  replace?: boolean;

  /** 是否禁用 */
  disabled?: boolean;

  /** Popconfirm 组件的配置 */
  PopconfirmProp?: PopconfirmProps;
}

/**
 * 分页列表操作文字
 */
const ActionText: React.FC<ActionTextProps> = ({
  children,
  key,
  text,
  className,
  type = 'primary',
  onClick,
  to,
  replace = false,
  disabled,
  PopconfirmProp,
  ...resetProps
}) => {
  /** 点击 */
  const onClickSpan = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (disabled) {
      return;
    }

    // 是否跳转
    if (to) {
      // push 还是 replace
      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }

    if (onClick) {
      onClick(e);
    }
  };

  const TextJSX = (
    <span
      {...resetProps}
      key={key}
      className={classnames('scf-action-text', type, disabled ? 'disabled' : '', className)}
      onClick={onClickSpan}
    >
      {text || children}
    </span>
  );

  // 如果需要 Popconfirm 组件
  if (PopconfirmProp) {
    return (
      <Popconfirm {...PopconfirmProp} key={`${key}_popconfirm`}>
        {TextJSX}
      </Popconfirm>
    );
  }

  return TextJSX;
};

export default ActionText;
