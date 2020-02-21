'use strict';
const path = require('path');
const vueLoaderConfig = require('./vue-loader.conf')
const baseConfig = require('../config')
const utils = require('./utils')
const envType = process.env.NODE_ENV_TYPE

// 拼接路径
const resolve = function(dir){
    return path.join(__dirname, "..", dir)
}

const config = {
    entry: {
        app: [resolve('code/' + envType + '/src/main.js'), 'babel-polyfill']
    },
    resolve: {
        // 自动解析扩展名，引用文件时可以自动补全后缀
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'src': resolve('code/' + envType + '/src'),
            'components': resolve('code/' + envType + '/src/components'),
            'assets': resolve('code/' + envType + '/src/assets'),
            'views': resolve('code/' + envType + '/src/views'),
            'store': resolve('code/' + envType + '/src/store'),
            'style': resolve('code/' + envType + '/src/style')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig,
                include: resolve('code/' + envType + '/src')
            },
            {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
              include: [resolve('code/' + envType + '/src')], //指定哪个文件需要loader
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