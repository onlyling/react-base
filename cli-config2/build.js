const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ora = require('ora')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const base = require('./base')
const helper = require('./helper')
const terserOptions = require('./terser-options')

const defaultConfig = merge(base, {
  mode: 'production',

  output: {
    filename: helper.buildAssetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: helper.buildAssetsPath('js/[name].[chunkhash:8].js'),
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(terserOptions), new CssMinimizerPlugin()],
    // webpack5 长效缓存方案
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    runtimeChunk: true,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new PurgecssPlugin({
      paths: helper.resolveSrcPath(''),
    }),
  ],
})

const devConfig = helper.configureWebpack
  ? helper.configureWebpack(defaultConfig)
  : defaultConfig

const spinner = ora('building for production...\n')

spinner.start()

webpack(devConfig, (err, stats) => {
  spinner.stop()

  if (err) throw err

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n',
  )
})