const path = require('path');
const diyConfig = require('../react.config');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

/** 资源发布路径 output.publicPath */
const publicPath = diyConfig.publicPath || (isProduction ? './' : '/');

/**
 * 相对于项目根路径
 * @param {string} dir 文件路径
 */
const resolveRootPath = (dir) => {
  return path.join(__dirname, '../', dir);
};

/**
 * 相对于 src 的路径
 * @param {string} dir 文件路径
 */
const resolveSrcPath = (dir) => {
  return resolveRootPath(`src/${dir}`);
};

module.exports = {
  isProduction,

  isDevelopment,

  publicPath,

  outputDir: diyConfig.outputDir || 'dist',

  buildAssetsPath: (p) => {
    return path.join(diyConfig.assetsDir || '', p);
  },

  filenameHashing: diyConfig.filenameHashing || true,

  productionSourceMap: diyConfig.productionSourceMap,

  crossorigin: diyConfig.crossorigin,

  devServer: diyConfig.devServer || {},

  htmlWebpackPlugin: diyConfig.htmlWebpackPlugin || {},

  lessOptions: diyConfig.lessOptions || {},

  configureWebpack: diyConfig.configureWebpack,

  resolveRootPath,

  resolveSrcPath,
};
