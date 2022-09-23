/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')

/** 是否是正式打包 */
const isProduction = process.env.NODE_ENV === 'production'

/** import 全局变量 */
const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-router-dom': 'ReactRouterDOM',
  'react-router': 'ReactRouter',
  history: 'HistoryLibrary',
}

/** cdn 资源文件 */
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: [],
  },
  // 生产环境
  build: {
    css: [],
    js: [
      'https://lib.baomitu.com/react/18.2.0/umd/react.production.min.js',
      'https://lib.baomitu.com/react-dom/18.2.0/umd/react-dom.production.min.js',
      'https://lib.baomitu.com/history/5.2.0/history.production.min.js',
      'https://lib.baomitu.com/react-router/6.3.0/react-router.production.min.js',
      'https://lib.baomitu.com/react-router-dom/6.3.0/react-router-dom.production.min.js',
    ],
  },
}

/**
 * 相对于项目根路径
 * @param {string} dir 文件路径
 */
const resolveRootPath = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: isProduction ? './' : '/',

  outputDir: resolveRootPath('./cdist'),

  productionSourceMap: false,

  htmlWebpackPlugin: {
    cdn: isProduction ? cdn.build : cdn.dev,
    scriptLoading: 'blocking',
  },

  lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
      'primary-color': '#1DA57A',
    },
    // less 4.x 计算的时候默认更改了，和 3.x 表现不一致
    math: 'always',
  },

  configureWebpack: config => {
    // 别名
    config.resolve.alias = {
      '@': resolveRootPath('src'),
    }

    if (isProduction) {
      // 打包时 npm 包转 CDN
      config.externals = externals
    }

    return config
  },
}
