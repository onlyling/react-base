import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { locale } from 'moment'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import 'moment/locale/zh-cn'

import Styles from './base-layout.less'

locale('zh-cn')

const BaseLayout: React.FC<React.PropsWithChildren<{}>> = props => {
  const location = useLocation()

  // 每当路由变化、页面切换，回到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <ConfigProvider locale={zhCN}>
      <div className={Styles['base-layout']}>{props.children}</div>
    </ConfigProvider>
  )
}

export default BaseLayout
