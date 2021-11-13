const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app:'./src/index.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, './src/styles/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: require.resolve('./src/scripts/three.r110.js'),
        use: [{
          loader: 'expose-loader',
          options: {
            exposes: 'THREE',
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
  ]
};
