const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'web-build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.html',
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'web-build'),
    },
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true,
  },
};