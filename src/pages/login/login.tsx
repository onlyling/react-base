import React from 'react';
import { Link } from 'react-router-dom';
import { useModel } from '@/models';

import Styles from './login.less';

const Login: React.FC = () => {
  const { test } = useModel('test');

  return (
    <div className={Styles.page}>
      <p>dfsd</p>

      <p>{test.a}</p>

      <Link to="/home">GO HOME</Link>
    </div>
  );
};

export default Login;
