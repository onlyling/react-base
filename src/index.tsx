import React from 'react';
import { render } from 'react-dom';
import App from './app';

const RootELe = document.getElementById('app');

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  RootELe,
);
