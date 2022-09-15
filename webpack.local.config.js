/* eslint-disable*/
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotEnv = require('dotenv-webpack')
/* eslint-enable*/

module.exports = (env) => {
  return {
    mode: 'development',
    // eslint-disable-next-line
    entry: `./src/index.tsx`,
    devtool: 'source-map',
    output: {
      filename: 'main.js',
      path: `${__dirname}/dist`,
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local', // mode: true でもOK
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          loader: 'file-loader',
          options: {},
        },
      ],
    },
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
      extensions: ['.ts', '.tsx', '.js', '.json'],
      fallback: {
        util: false,
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        fs: false,
      },
    },
    target: ['web', 'es5'],
    devServer: {
      hot: true,
      host: 'localhost',
      port: 8080,
      historyApiFallback: true,
      static: {
        directory: `${__dirname}/dist`,
      },
    },
    plugins: [
      // eslint-disable-next-line
      new HtmlWebpackPlugin({ template: `${__dirname}/public/index.html` }),
      new webpack.HotModuleReplacementPlugin(),
      // eslint-disable-next-line
      new DotEnv({
        // eslint-disable-next-line
        path: `${__dirname}/public/env/local.env`,
        safe: false,
      }),
      // eslint-disable-next-line
    ],
  }
}
