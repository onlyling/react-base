import React from 'react'
import { HashRouter } from 'react-router-dom'
import 'antd/dist/antd.less'

import Models from './models'
import AppRouter from './router'

import './app.less'

const App: React.FC = () => {
  return (
    <HashRouter>
      <Models>
        <AppRouter />
      </Models>
    </HashRouter>
  )
}

export default App
