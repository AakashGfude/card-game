var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = function(env) {
  return {
    entry: path.resolve(__dirname,'..','app','index.js'),
    output: {
      path: path.resolve(__dirname,'..','build-dev'),
      filename: 'bundle.js'
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
          publicPath: '../build-dev'
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
      new ExtractTextPlugin("[name].css"),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname,'..','app','index.html')
      }),
      new cleanWebpackPlugin(['build-dev'],{
        root: path.resolve(__dirname,'..'),
        verbose: true,
      }),
      new CopyWebpackPlugin([
        { from: 'images' }
      ]),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname,'..','build-dev'),
      inline:true,
      port:3000
    },
    devtool: 'eval-source-map'
  }
}
