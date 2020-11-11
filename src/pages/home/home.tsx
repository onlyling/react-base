import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useModel } from '@/models';

import { Provider, CCCC } from './ctx/ctx';

import Styles from './home.module.less';

const Home: React.FC = () => {
  const { test, setTest } = useModel('test');

  console.log('rerender');

  return (
    <div className={Styles.a}>
      <p>home 2</p>

      <p>{test.a}</p>

      <p>
        <Button
          type="primary"
          onClick={() => {
            setTest((t) => ({
              ...t,
              a: t.a + 1,
            }));
          }}
        >
          test ++
        </Button>
      </p>

      <p>
        <Link to="/login">GO LOGIN</Link>
      </p>

      <p>
        <Link to="/user-manage/list">GO USER MANAGE</Link>
      </p>

      <p>
        <Link to="/pro-table/demo">GO PRO TABLE DEMO</Link>
      </p>

      <p>
        <Link to="/demos/props">GO DEMO PROPS</Link>
      </p>

      <Provider>
        <CCCC />
      </Provider>
    </div>
  );
};

export default Home;
