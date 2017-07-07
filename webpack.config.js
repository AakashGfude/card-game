var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname,'app','index.js'),
    output: {
      path: path.resolve(__dirname,'build'),
      filename: '[hash].bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        query: {
          presets: ['react',['es2015',{"loose": true,"modules":false}]]
        }
      },{
        test:/\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader",
          publicPath: '/build'
        })
      },{
      test: /\.(png|jpg)$/,
      loader: 'url?limit=10000'
      }]
    },
    resolve: {
      extensions: ['.js','.scss']
    },
    plugins: [
      new ExtractTextPlugin("[name].[hash].css"),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname,'app','index.html'),
        hash: true
      }),
      new cleanWebpackPlugin(['build'],{
        root: path.resolve(__dirname),
        verbose: true,
      })
    ],
    devServer: {
      contentBase: path.resolve(__dirname,'build'),
      inline:true,
      port:3000
    },
    devtool: 'eval-source-map'
  }
