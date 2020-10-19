import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Styles from './base-layout.module.less';

const BaseLayout: React.FC = (props) => {
  const location = useLocation();

  // 每当路由变化、页面切换，回到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <div className={Styles['base-layout']}>{props.children}</div>;
};

export default BaseLayout;
