const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const extractCSS = new ExtractTextPlugin('styles.[contenthash].css');

module.exports = {
  entry: {
    index: './js/index.ts',
    app: './js/app.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hospitivus',
      template: './templates/index.ejs',
      excludeChunks: ['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'app.html',
      title: 'Hospitivus',
      template: './templates/app.ejs',
      excludeChunks: ['index']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 4000,
      server: { baseDir: ['build'] }
    }),
    extractCSS,
  ],
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]'
          }
        }
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]'
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(html|svg)$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: [
                'node_modules', '.'
              ]
            }
          }],
        })
      },
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ]
  },
};
