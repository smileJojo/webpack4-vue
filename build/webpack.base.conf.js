'use strict';
const path = require('path');
const vueLoaderConfig = require('./vue-loader.conf')
const baseConfig = require('../config')
const utils = require('./utils')
const env = process.env.NODE_ENV;
console.log(process.env.NODE_ENV, process.env.NODE_ENV_TYPE)
const prodConfig = baseConfig[process.env.NODE_ENV_TYPE].build
// const prodConfig = env === 'admin' ? baseConfig.admin.build : env === 'client' ? baseConfig.clinet.build : "test";


// 拼接路径
const resolve = function(dir){
    return path.join(__dirname, "..", dir)
}

const config = {
    // context: path.resolve(__dirname, '../'),
    // entry: {
    //     app: [resolve('code/client/src/main.js'), 'babel-polyfill']
    // },
    entry: resolve('code/client/src/main.js'),
    resolve: {
        // 自动解析扩展名，引用文件时可以自动补全后缀
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            // 'src': resolve('code/client/src'),
            // 'components': resolve('code/client/src/compomemts'),
            // 'assets': resolve('code/client/src/assets'),
            // 'views': resolve('code/client/src/views'),
            // 'store': resolve('code/client/src/store')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
                include: [resolve('code/client/src')],
              },
              {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 2000,
                  name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
              },
              {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
              }
        ]
    }
}

module.exports = config;