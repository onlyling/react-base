import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import Styles from './base-layout.less';

moment.locale('zh-cn');

const BaseLayout: React.FC = (props) => {
  const location = useLocation();

  // 每当路由变化、页面切换，回到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ConfigProvider locale={zhCN}>
      <div className={Styles['base-layout']}>{props.children}</div>
    </ConfigProvider>
  );
};

export default BaseLayout;
