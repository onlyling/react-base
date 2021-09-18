const path = require('path');

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
      // 'https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.development.js',
      // 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.development.js',
      // 'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.2.0/react-router-dom.js',
    ],
  },
  // 生产环境
  build: {
    css: [],
    js: [
      'https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.2.0/react-router-dom.min.js',
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
    // less 4.x 计算的时候默认更改了，和 3.x 表现不一致
    math: 'always',
  },

  configureWebpack: (config) => {
    // 别名
    config.resolve.alias = {
      '@': resolveRootPath('src'),
    };

    if (isProduction) {
      // 打包时 npm 包转 CDN
      config.externals = externals;
    }

    return config;
  },
};
