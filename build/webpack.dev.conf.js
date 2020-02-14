"use strict"
const path = require('path')
const webpack = require("webpack")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('../config')
const utils = require("./utils")
// const env = process.env.NODE_ENV_TYPE;
const devConf = config[process.env.NODE_ENV_TYPE].dev;
// console.log("==========:",devConf);
const baseConf = require('./webpack.base.conf');  //webpack 基本配置

// 一个webpack配置合并模块
const merge = require("webpack-merge");
// 一个创建html入口文件的webpack插件！
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 一个编译提示的webpack插件！
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// 发送系统通知的一个node模块
const notifier = require("node-notifier");

const dev = merge(baseConf, {
    output: {
        filename: '[name]-[hash].js',
        // html 引用资源路径，在dev-server中，引用的是内存中文件
        path: devConf.publicPath
    },
    module: {
        rules: utils.styleLoaders({ sourceMap: devConf.cssSourceMap, usePostCSS: true })
    },
    // 生成sourceMaps (方便调试)
    devtool: devConf.devtoolType,
    
    //启动一个express服务器，是我们可以在本地进行开发！ 
    devServer: {
        hot: true, // 热加载
        host: devConf.host, //主机名
        port: devConf.port, //端口号
        proxy: devConf.proxyTable, // 配置反向代理解决跨域
        open: true, //自动打开浏览器
        inline: true, //自动刷新
        compress: true, // 压缩代码，加载开发流程和优化的作用
        historyApiFallback: true, // 在开发SPA时非常有用，它依赖于html5 history api, 如果设置为true，所有的额跳转将指向index.html
        overlay: { // 在浏览器上全屏显示编译的errors或warnings
            errors: true,
            warnings: false
        },
        quiet: true // 终端输入的只有初始启动信息。webapck 的警告和错误是不会输出到终端
        // openPage: 'code/client/index.html' //打开浏览器后默认显示页面
    },
    plugins: [
        
        // vue-loader v15需要添加此插件
        new VueLoaderPlugin(),

        // 开启HMR（热替换功能，替换更新部分，不重载页面！）
        new webpack.HotModuleReplacementPlugin(),

        // 显示模块相对路径
        new webpack.NamedModulesPlugin(),

        // 配置html入口信息
        new HtmlWebpackPlugin({
            title: 'hello',
            filename: 'index.html',
            template: 'code/'+ process.env.NODE_ENV_TYPE +'/index.html',
            inject: true //script 注入位置
        }),

        // 编译提示插件
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [
                    `Your application is running here: http://${devConf.host}:${devConf.port}`
                ]
            },
            onErrors: (severity, errors) => {
                if (severity !== 'error') {
                  return;
                }
                const error = errors[0];
                const filename = error.file.split("!").pop();
                // 编译错误时。右下角弹出错误提示！
                notifier.notify({
                  title: "Webpack error",
                  message: severity + ': ' + error.name,
                  subtitle: filename || ''
                });
            }
        }),

    ]
})

module.exports = dev;