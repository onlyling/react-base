const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const helpers = require('./helpers');
const packageJSON = require('../package.json');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

// TODO 可配置？
const shouldUseSourceMap = false;

const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000');

const getStyleLoaders = (cssOptions, preProcessor, preProcessorOptions = {}) => {
  const loaders = [
    helpers.isDevelopment && 'style-loader',
    helpers.isProduction && {
      loader: MiniCssExtractPlugin.loader,
      // css is located in `static/css`, use '../../' to locate index.html folder
      // in production `paths.publicUrlOrPath` can be a relative path
      options: helpers.publicPath.publicUrlOrPath.startsWith('.') ? { publicPath: '../../' } : {},
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
        sourceMap: helpers.isProduction ? shouldUseSourceMap : helpers.isDevelopment,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: helpers.isProduction ? shouldUseSourceMap : helpers.isDevelopment,
          // root: paths.appSrc,
          root: helpers.resolveSrcPath(''),
        },
      },
      {
        loader: preProcessor,
        options: {
          sourceMap: true,
          lessOptions: preProcessorOptions,
        },
      },
    );
  }
  return loaders;
};

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  entry: {
    app: [helpers.resolveSrcPath('index.tsx')],
  },

  output: {
    path: helpers.outputDir,
    publicPath: helpers.publicPath,
    filename: helpers.buildAssetsPath('js/app.js'),
    chunkFilename: helpers.buildAssetsPath('js/[name].chunk.js'),
  },

  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },

      // 解决打包的时候找不到文件
      // https://github.com/webpack/webpack/issues/11467
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {},
          },
        ],
        include: helpers.resolveSrcPath(''),
      },

      {
        oneOf: [
          // https://github.com/jshttp/mime-db
          {
            test: [/\.avif$/],
            loader: 'url-loader',
            options: {
              limit: imageInlineSizeLimit,
              mimetype: 'image/avif',
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: imageInlineSizeLimit,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // Process application JS with Babel.
          // The preset includes JSX, Flow, TypeScript, and some ESnext features.
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/i,
            include: helpers.resolveSrcPath(''),
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              plugins: [
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread',
                '@babel/plugin-syntax-dynamic-import',
                helpers.isProduction ? null : 'react-hot-loader/babel',
              ].filter((p) => !!p),
            },
          },

          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use MiniCSSExtractPlugin to extract that CSS
          // to a file, but in development "style" loader enables hot editing
          // of CSS.
          // By default we support CSS Modules with the extension .module.css
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: helpers.isProduction ? shouldUseSourceMap : helpers.isDevelopment,
            }),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },

          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: helpers.isProduction ? shouldUseSourceMap : helpers.isDevelopment,
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
            }),
          },

          {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: helpers.isProduction ? shouldUseSourceMap : helpers.isDevelopment,
              },
              'less-loader',
              helpers.lessOptions,
            ),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },

          // Adds support for CSS Modules, but using LESS
          // using the extension .module.less
          {
            test: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: helpers.isProduction ? shouldUseSourceMap : helpers.isDevelopment,
                modules: {
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                },
              },
              'less-loader',
              helpers.lessOptions,
            ),
          },

          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: 'file-loader',
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: helpers.resolveSrcPath('index.html'),
      filename: 'index.html',
      title: packageJSON.name,
      BASE_URL: helpers.publicPath,
      minify: helpers.isProduction
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

      ...helpers.htmlWebpackPlugin,
    }),
  ],
};
