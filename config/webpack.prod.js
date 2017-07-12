var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
var webpack = require('webpack');

module.exports = function(env) {
  return {
    entry: path.resolve(__dirname,'..','app','index.js'),
    output: {
      path: path.resolve(__dirname,'..','build-prod'),
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
          publicPath: '../build-prod'
        })
      },{
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?limit=10000'
      }]
    },
    resolve: {
      extensions: ['.js','.scss']
    },
    plugins: [
      new ExtractTextPlugin("[name].[hash].css"),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname,'..','app','index.html'),
        hash: true,
        minify: {
          collapseWhitespace: true,
          removeComments: true
        }
      }),
      new cleanWebpackPlugin(['build-prod'],{
        root: path.resolve(__dirname,'..'),
        verbose: true,
      }),
      new CopyWebpackPlugin([
        { from: 'images' }
      ]),
      new optimizeCssAssetsWebpackPlugin({
        cssProcessorOptions: { discardComments: {removeAll: true}}
      }),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
          drop_console: true
        }
      })
    ],
    devServer: {
      contentBase: path.resolve(__dirname,'..','build-prod'),
      inline:true,
      port:8000
    },
    devtool: 'source-map'
  }
}
