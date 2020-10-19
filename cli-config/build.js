const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ora = require('ora');
const helpers = require('./helpers');
const base = require('./base');

const defaultConfig = merge(base, {
  mode: 'production',

  output: {
    filename: helpers.buildAssetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: helpers.buildAssetsPath('js/[name].[chunkhash:8].js'),
  },

  plugins: [new CleanWebpackPlugin()],
});

const devConfig = helpers.configureWebpack
  ? helpers.configureWebpack(defaultConfig)
  : defaultConfig;

const spinner = ora('building for production...\n');

spinner.start();

webpack(devConfig, (err, stats) => {
  spinner.stop();

  if (err) throw err;

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n',
  );
});
