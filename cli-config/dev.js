const { merge } = require('webpack-merge');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const helper = require('./helper');
const base = require('./base');

const defaultConfig = merge(base, {
  mode: 'development',

  target: 'web',

  plugins: [new ReactRefreshPlugin()],
});

const devConfig = helper.configureWebpack ? helper.configureWebpack(defaultConfig) : defaultConfig;

module.exports = devConfig;
