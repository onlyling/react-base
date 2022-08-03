import { Popconfirm } from 'antd'
import type { PopconfirmProps } from 'antd/es/popconfirm'
import classnames from 'classnames'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import './action-text.less'

export type ActionTextProps = {
  /** 自定义 key,如果 text 是 boolean 或重复的组件 xxx.toString() 是一样的时候需要自定义一下比较好 */
  key?: string

  /** 显示的文字 */
  text?: React.ReactNode

  /** 类型、样子 */
  type?: 'text' | 'primary' | 'success' | 'danger' | 'warning'

  /** 路由跳转  */
  to?: string

  /** 路由跳转方式 */
  replace?: boolean

  /** 是否禁用 */
  disabled?: boolean

  /** Popconfirm 组件的配置 */
  PopconfirmProp?: PopconfirmProps
} & React.HTMLAttributes<HTMLDivElement>

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
  const navigate = useNavigate()
  /** 点击 */
  const onClickSpan = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) {
      return
    }

    // 是否跳转
    if (to) {
      // push 还是 replace
      if (replace) {
        navigate(to, { replace: true })
      } else {
        navigate(to)
      }
    }

    if (onClick) {
      e.stopPropagation()
      onClick(e)
    }
  }

  const TextJSX = (
    <div
      {...resetProps}
      key={key}
      className={classnames(
        'scf-action-text',
        type,
        disabled ? 'disabled' : '',
        className,
      )}
      onClick={onClickSpan}>
      {text || children}
    </div>
  )

  // 如果需要 Popconfirm 组件
  if (PopconfirmProp) {
    return (
      <Popconfirm {...PopconfirmProp} key={`${key}_popconfirm`}>
        {TextJSX}
      </Popconfirm>
    )
  }

  return TextJSX
}

export default ActionText
