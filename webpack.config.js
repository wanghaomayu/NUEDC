/**
 * Created by out_xu on 17/7/17.
 */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')    // 生成 html
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
module.exports = function (webpackConfig, env) {
  // 对roadhog默认配置进行操作，比如：
  webpackConfig.module.loaders[0].exclude.push(/\.ejs$/)
  if (env === 'production') {
    webpackConfig.output.filename = '[name].[chunkhash:5].js'
    webpackConfig.output.chunkFilename = '[chunkhash:5].async.js'
    webpackConfig.plugins[3] = new ExtractTextPlugin('[contenthash:5].css')
    webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/template.ejs')
    }))
  }
  return webpackConfig
}