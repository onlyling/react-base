import React from 'react';
import { hot } from 'react-hot-loader/root';

import AppRouter from './app-router';
import Models from './models';

import './app.less';

const App: React.FC = () => {
  return (
    <Models>
      <AppRouter />
    </Models>
  );
};

export default hot(App);
