const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const helpers = require('./helpers');
const base = require('./base');

const defaultConfig = merge(base, {
  mode: 'development',

  plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshPlugin()],
});

const devConfig = helpers.configureWebpack
  ? helpers.configureWebpack(defaultConfig)
  : defaultConfig;

module.exports = devConfig;
