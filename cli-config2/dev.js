const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { merge } = require('webpack-merge')

const base = require('./base')
const helper = require('./helper')

const defaultConfig = merge(base, {
  mode: 'development',

  target: 'web',

  plugins: [new ReactRefreshPlugin()],
})

const devConfig = helper.configureWebpack
  ? helper.configureWebpack(defaultConfig)
  : defaultConfig

module.exports = devConfig
