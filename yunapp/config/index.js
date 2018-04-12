'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
          target: 'http://localhost:3100', //设置调用接口域名和端口号别忘了加http
          changeOrigin: true,
          pathRewrite: {
              '^/api': '/' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
                  // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
          }
        }
      },
    // 各种开发服务器设置
    host: 'localhost', // 可以被process.env.HOST覆盖吗?
    port: 8080, // 可以被过程改写。端口，如果端口正在使用，则将确定一个空闲端口。
    autoOpenBrowser: false,//改为true貌似自动启动浏览器？
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // 如果在devtools中调试vue文件有问题，
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps 报错显示未编译过的代码 设置为false则错误显示压缩代码？
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // 默认为许多流行的静态主机，如。
    // Surge或Netlify已经为您压缩了所有静态资产。
    // 在设置为“true”之前，请确保:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // 使用额外的参数运行构建命令。
    // 在构建完成后查看bundle analyzer报告:
    // `npm run build --report`
    // 设置为“true”或“false”，以便随时打开或关闭。
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
