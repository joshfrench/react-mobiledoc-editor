const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const webpackConfig = {
  entry: './demo/index.js',
  output: {
    path: path.resolve(__dirname, 'demo-dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    alias: {
      'react-mobiledoc-editor': __dirname,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 9999,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
    }),
  ],
};

module.exports = webpackConfig;
