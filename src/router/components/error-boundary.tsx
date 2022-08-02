import { Component } from 'react'

interface IState {
  hasError?: boolean
  error?: string
  info?: {
    componentStack?: string
  }
}

export interface IProps extends React.PropsWithChildren<{}> {
  /** 发生错误后的回调（可做一些错误日志上报，打点等） */
  onError?: (error: Error, info: any) => void
}

class ErrorBoundary extends Component<IProps, IState> {
  public static defaultProps = {
    onError: null,
  }

  public static getDerivedStateFromError() {
    return { hasError: true }
  }

  public constructor(props: IProps) {
    super(props)
    this.state = {
      hasError: false,
      error: '',
    }
  }

  public componentDidCatch(error: any, info: any) {
    this.setState({
      error,
      info,
    })
    const { onError } = this.props
    if (onError && typeof onError === 'function') {
      onError(error, info)
    }
  }

  public render() {
    const { children, ...restProps } = this.props
    const { hasError, error, info } = this.state
    if (hasError) {
      return (
        <div>
          <p>出问题了</p>
          <pre>{info?.componentStack}</pre>
          <p>{JSON.stringify(restProps)}</p>
          <p>{error}</p>
        </div>
      )
    }
    return children
  }
}

export default ErrorBoundary
