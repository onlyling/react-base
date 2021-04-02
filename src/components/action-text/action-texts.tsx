import React from 'react';
import { Divider, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import ActionText, { ActionTextProps } from './action-text';

export type ActionTextsItem = {} & ActionTextProps;

export type ActionTextsProps = {
  btns: ActionTextsItem[];

  /** 最多显示多少个, 0 就不限制 默认 3 */
  count?: number;
};

/**
 * 分页列表操作文字
 */
const ActionTexts: React.FC<ActionTextsProps> = ({ btns, count = 3 }) => {
  if (count === 1) {
    count = 2;
  }

  /** 是否展开，不存在更多 */
  const isExpand = count === 0;

  /** 是否已经超过了最大显示个数 */
  const isMoreCount = btns.length > count;

  /** 保留的个数 */
  const sliceNum = isMoreCount ? count - 1 : count;

  /** 基础的三个文字配置 */
  const actionList = btns.slice(0, isExpand ? btns.length : sliceNum);

  /** 前三个文字 JSX */
  const ActionJSX = actionList.map(({ key, text, ...resetProps }, index) => {
    if (!key) {
      key = text?.toString();
    }

    return (
      <React.Fragment key={`${key}_fragment`}>
        <ActionText {...resetProps} text={text} style={{ display: 'inline' }} />

        {index !== actionList.length - 1 ? (
          <Divider key={`${key}_divider`} type="vertical" />
        ) : null}
      </React.Fragment>
    );
  });

  /** 更多弹出的菜单 */
  const MenuJSX =
    !isExpand && isMoreCount
      ? btns.slice(sliceNum).map(({ key, type, text, onClick, PopconfirmProp, ...resetProps }) => {
          if (!key) {
            key = text?.toString();
          }

          /**
           * 点击文字
           * 若配置了 PopconfirmProp 需要阻止事件传播
           */
          const onClickText = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            if (PopconfirmProp) {
              e.stopPropagation();
            }

            if (onClick) {
              onClick(e);
            }
          };

          return (
            <Menu.Item key={`${key}_menu_item`} danger={type === 'danger'}>
              <ActionText
                {...resetProps}
                text={text}
                onClick={onClickText}
                type={type === 'danger' ? 'text' : type}
                PopconfirmProp={PopconfirmProp}
              />
            </Menu.Item>
          );
        })
      : null;

  return (
    <>
      {ActionJSX}

      {!isExpand && isMoreCount ? (
        <>
          <Divider type="vertical" />
          <Dropdown overlay={<Menu>{MenuJSX}</Menu>}>
            <ActionText style={{ display: 'inline' }}>
              更多
              <DownOutlined />
            </ActionText>
          </Dropdown>
        </>
      ) : null}
    </>
  );
};

export default ActionTexts;
