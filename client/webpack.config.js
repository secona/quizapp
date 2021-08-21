const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');

module.exports = /** @type {import('webpack').Configuration} */ ({
  entry: SRC,

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(SRC, 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  },
});
