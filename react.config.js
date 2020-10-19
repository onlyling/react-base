const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

/** 是否是正式打包 */
const isProduction = process.env.NODE_ENV === 'production';

/** import 全局变量 */
const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-router-dom': 'ReactRouterDOM',
};

/** cdn 资源文件 */
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: [
      'https://lib.baomitu.com/react/16.13.1/umd/react.development.js',
      'https://lib.baomitu.com/react-dom/16.13.1/umd/react-dom.development.js',
      'https://lib.baomitu.com/react-router-dom/5.1.2/react-router-dom.js',
    ],
  },
  // 生产环境
  build: {
    css: [],
    js: [
      'https://lib.baomitu.com/react/16.13.1/umd/react.production.min.js',
      'https://lib.baomitu.com/react-dom/16.13.1/umd/react-dom.production.min.js',
      'https://lib.baomitu.com/react-router-dom/5.1.2/react-router-dom.min.js',
    ],
  },
};

/**
 * 相对于项目根路径
 * @param {string} dir 文件路径
 */
const resolveRootPath = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: isProduction ? './' : '/',

  outputDir: resolveRootPath('./cdist'),

  productionSourceMap: false,

  htmlWebpackPlugin: {
    cdn: isProduction ? cdn.build : cdn.dev,
  },

  lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
      'primary-color': '#1DA57A',
    },
  },

  configureWebpack: (config) => {
    // 别名
    config.resolve.alias = {
      '@': resolveRootPath('src'),
    };

    // 打包时 npm 包转 CDN
    config.externals = externals;

    if (isProduction) {
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              output: {
                // Remove Comments
                comments: false,
              },
              compress: {
                // Pass true to discard calls to console.* functions.
                drop_console: true,
              },
            },
            // Remove Comments
            extractComments: false,
          }),
        ],
      };
    }

    return config;
  },
};
