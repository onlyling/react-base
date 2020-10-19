const webpack = require('webpack');
const { merge } = require('webpack-merge');
const helpers = require('./helpers');
const base = require('./base');

const defaultConfig = merge(base, {
  mode: 'development',

  plugins: [new webpack.HotModuleReplacementPlugin()],
});

const devConfig = helpers.configureWebpack
  ? helpers.configureWebpack(defaultConfig)
  : defaultConfig;

module.exports = devConfig;
