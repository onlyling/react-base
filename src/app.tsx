import React from 'react'

import AppRouter from './app-router'
import Models from './models'

import './app.less'

const App: React.FC = () => {
  return (
    <Models>
      <AppRouter />
    </Models>
  )
}

export default App
