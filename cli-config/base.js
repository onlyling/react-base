/* eslint-disable @typescript-eslint/no-require-imports */
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const packageJSON = require('../package.json')

const helper = require('./helper')
const AutoCssModules = require('./libs/auto-css-modules')

// style files regexes
const cssRegex = /\.css$/
// const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/
// const lessModuleRegex = /\.module\.less$/;

// TODO 可配置？
const shouldUseSourceMap = true

// TODO 可配置？
const localIdentName = '[name]_[local]_[hash:base64:5]'

const getStyleLoaders = (
  cssOptions,
  preProcessor,
  preProcessorOptions = {},
) => {
  const loaders = [
    helper.isDevelopment && 'style-loader',
    helper.isProduction && {
      loader: MiniCssExtractPlugin.loader,
      // css is located in `static/css`, use '../../' to locate index.html folder
      // in production `paths.publicUrlOrPath` can be a relative path
      options: helper.publicPath.startsWith('.')
        ? { publicPath: '../../' }
        : {},
    },
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            'postcss-normalize',
          ],
        },
        sourceMap: helper.isProduction
          ? shouldUseSourceMap
          : helper.isDevelopment,
      },
    },
  ].filter(Boolean)
  if (preProcessor) {
    loaders.push(
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: helper.isProduction
            ? shouldUseSourceMap
            : helper.isDevelopment,
          root: helper.resolveSrcPath(''),
        },
      },
      {
        loader: preProcessor,
        options: {
          sourceMap: true,
          lessOptions: preProcessorOptions,
        },
      },
    )
  }
  return loaders
}

module.exports = {
  target: ['browserslist'],

  mode: helper.isProduction ? 'production' : 'development',

  devtool: helper.isProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : 'cheap-module-source-map',

  cache: {
    // 参考文档：https://juejin.cn/post/6924258563862822919
    // 将缓存类型设置为文件系统
    type: 'filesystem',
    // allowCollectingMemory: true,
    // buildDependencies: {
    //   /* 将你的 config 添加为 buildDependency，以便在改变 config 时获得缓存无效*/
    //   config: [__filename],
    //   /* 如果有其他的东西被构建依赖，你可以在这里添加它们*/
    //   /* 注意，webpack.config，加载器和所有从你的配置中引用的模块都会被自动添加 */
    // },
    // // 指定缓存的版本
    // version: '1.0',
  },

  experiments: {
    topLevelAwait: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  entry: {
    app: [helper.resolveSrcPath('index.tsx')],
  },

  output: {
    path: helper.outputDir,
    publicPath: helper.publicPath,
    filename: helper.isProduction
      ? 'static/js/[name].[contenthash:8].js'
      : 'static/js/bundle.js',
    chunkFilename: helper.isProduction
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
  },

  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },

      {
        oneOf: [
          {
            test: [/\.avif$/],
            type: 'asset',
            mimetype: 'image/avif',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 超过 10kb 不转 base64
              },
            },
          },
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 超过 10kb 不转 base64
              },
            },
          },

          {
            test: /\.(eot|svg|ttf|woff|)$/,
            type: 'asset/resource',
          },

          // Process application JS with Babel.
          // The preset includes JSX, Flow, TypeScript, and some ESnext features.
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/i,
            include: helper.resolveSrcPath(''),
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      // babel preset env配置
                      // https://segmentfault.com/a/1190000017929781
                      '@babel/preset-env',
                      {
                        // Allow importing core-js in entrypoint and use browserlist to select polyfills
                        useBuiltIns: 'entry',
                        // Set the corejs version we are using to avoid warnings in console
                        corejs: 3,
                        // Exclude transforms that make all code slower
                        exclude: ['transform-typeof-symbol'],

                        // 指定将 es6 modules 转换为何种模块规范
                        // 一般在 webpack 项目中，我们会将此参数设置为 false，既将 module 交由 webpack 处理，而不是 babel。
                        modules: false,
                      },
                    ],
                    [
                      '@babel/preset-react',
                      {
                        development: helper.isDevelopment,
                        // tsconfig.json jsx
                        runtime: 'automatic',
                      },
                    ],
                    '@babel/preset-typescript',
                  ],
                  plugins: [
                    [
                      '@babel/plugin-proposal-class-properties',
                      {
                        loose: true,
                      },
                    ],
                    [
                      '@babel/plugin-proposal-private-methods',
                      {
                        loose: true,
                      },
                    ],
                    [
                      '@babel/plugin-proposal-private-property-in-object',
                      {
                        loose: true,
                      },
                    ],
                    '@babel/plugin-proposal-numeric-separator',
                    [
                      '@babel/plugin-transform-runtime',
                      {
                        corejs: false,
                        version: require('@babel/runtime/package.json').version,
                        regenerator: true,
                      },
                    ],
                    '@babel/plugin-proposal-optional-chaining',
                    '@babel/plugin-proposal-nullish-coalescing-operator',
                    [
                      '@babel/plugin-proposal-decorators',
                      {
                        legacy: true,
                      },
                    ],
                    AutoCssModules,
                    helper.isProduction ? null : 'react-refresh/babel',
                  ].filter(Boolean),
                  cacheDirectory: true,
                  cacheCompression: false,
                  compact: helper.isProduction,
                },
              },
            ],
          },
          {
            test: cssRegex,
            resourceQuery: new RegExp(helper.CSS_MODULES_MARKER),
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: helper.isProduction
                ? shouldUseSourceMap
                : helper.isDevelopment,
              modules: {
                localIdentName,
              },
            }),
          },

          {
            test: cssRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: helper.isProduction
                ? shouldUseSourceMap
                : helper.isDevelopment,
            }),
            sideEffects: true,
          },

          {
            test: lessRegex,
            resourceQuery: new RegExp(helper.CSS_MODULES_MARKER),
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: helper.isProduction
                  ? shouldUseSourceMap
                  : helper.isDevelopment,
                modules: {
                  localIdentName,
                },
              },
              'less-loader',
              helper.lessOptions,
            ),
          },

          {
            test: lessRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: helper.isProduction
                  ? shouldUseSourceMap
                  : helper.isDevelopment,
              },
              'less-loader',
              helper.lessOptions,
            ),
            sideEffects: true,
          },

          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            type: 'asset/resource',
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: helper.resolveSrcPath('index.html'),
      filename: 'index.html',
      title: packageJSON.name,
      BASE_URL: helper.publicPath,
      minify: helper.isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : {},

      ...helper.htmlWebpackPlugin,
    }),

    !helper.isProduction
      ? new ESLintPlugin({
          extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        })
      : null,
  ].filter(Boolean),
}
