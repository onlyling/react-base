import { Result, Button } from 'antd'
import type { ErrorInfo } from 'react'
import React, { PureComponent } from 'react'

import type { ErrorBoundaryProps } from './interface'

type ErrorBoundaryState = {
  error: Error | null
}

/**
 * ErrorBoundary 错误捕获
 * @description 一般用于应用根组件，捕获 React 内产生的问题。
 */
class ErrorBoundary extends PureComponent<
  React.PropsWithChildren<ErrorBoundaryProps>
> {
  public static getDerivedStateFromError(error: Error) {
    // 更新 state，下次渲染可以展示错误相关的 UI
    return { error }
  }

  public state: ErrorBoundaryState = {
    error: null,
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  /**
   * 点击清空错误，重新渲染子组件
   */
  public onClickReload = () => {
    this.setState({
      error: null,
    })
  }

  public render() {
    if (this.state.error) {
      // 渲染出错时的 UI
      if (this.props.renderError) {
        return this.props.renderError({
          name: this.state.error.name,
          message: this.state.error.message,
          onReset: this.onClickReload,
        })
      }

      return (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Result
            status="warning"
            title={this.props.title || '加载失败，请稍后再试~'}
            subTitle={`${this.state.error.name}\n${this.state.error.message}`}
            extra={
              <Button type="primary" onClick={this.onClickReload}>
                {this.props.reloadText || '重新加载'}
              </Button>
            }
          />
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
