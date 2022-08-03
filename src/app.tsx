import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Models from './models'
import AppRouter from './router'

import './app.less'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Models>
        <AppRouter />
      </Models>
    </BrowserRouter>
  )
}

export default App
