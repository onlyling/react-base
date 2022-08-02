const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./dev');
const helper = require('./helper');

const port = 9090;

// webpackConfig.entry.app.unshift(
//   'webpack/hot/dev-server',
//   `webpack-dev-server/client?http://localhost:${port}`,
//   //   'react-hot-loader/patch',
// );

const compiler = webpack(webpackConfig);
const devServerOptions = {
  port,
  host: '0.0.0.0', // '0.0.0.0' 可以通过局域网访问
  compress: true,
  historyApiFallback: true,
  hot: true,
  client: {
    progress: true,
    overlay: true,
    logging: 'error',
  },
  static: {
    publicPath: webpackConfig.output.publicPath,
  },
  // open: false,
  // contentBase: helper.resolveRootPath('/public'),
  // index: 'index.html',
  ...helper.devServer,
};

const server = new WebpackDevServer(devServerOptions, compiler);

server.startCallback(() => {
  console.log('发射 =>  =>  =>  =>')
});

// const devServerOptions = Object.assign(
//   {
//     // port,
//     host: '0.0.0.0', // '0.0.0.0' 可以通过局域网访问
//     overlay: true,
//     stats: 'errors-only',
//     compress: true,
//     historyApiFallback: true,
//     hot: true,
//     inline: true,
//     progress: true,
//     // open: false,
//     publicPath: webpackConfig.output.publicPath,
//     // contentBase: helper.resolveRootPath('/public'),
//     // index: 'index.html',
//   },
//   helper.devServer,
// );

// // WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);

// const compiler = webpack(webpackConfig);
// const server = new WebpackDevServer(compiler, devServerOptions);

// server.listen(port, devServerOptions.host, () => {
//   console.log(
//     '\033[42;30m READY GO \033[40;32m Starting server on ' +
//       `http://${devServerOptions.host}:${port}` +
//       '\033[0m',
//   );
// });
