'user strict'
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const baseWebpackConfig = require("./webpack.base.conf")
const config = require("../config")
const utils = require("./utils")

const merge = require("webpack-merge")
// 创建html入口文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 拷贝文件
const CopyWebpackPlugin = require('copy-webpack-plugin')

const nodeEnvType = process.env.NODE_ENV_TYPE

// const env = require("../config").clinet.build

const webpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    output: {
        // build后所有文件存放的位置
        path: config[nodeEnvType].build.assetsRoot,

        // html 应用资源路径，可在此配置cdn引用地址
        publicPath: config[nodeEnvType].build.publicPath,

        // 文件名
        filename: utils.assetsPath("js/[name].[chunkhash].js"),

        //  用于打包require.ensure(代码分割)方法中引入的模块
        chunkFilename: utils.assetsPath("js/[name].[chunkhash].js")
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config[nodeEnvType].build.productionSoureceMap,
            extract: true,
            usePostCSS: true
        })
    },
    optimization:{
        // 为每个入口提取出webpack runtime 模块
        runtimeChunk: {
            name: 'manifest'
        },  
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        drop_console: true,  // 打包后去除console.log
                        pure_funcs: ['console.log']
                    }
                },
                sourceMap: config[nodeEnvType].build.productionSourceMap,
                parallel: true, // 使用多进程并行运行来提高构建速度
                cache: true
            }),
            // 压缩css
            new OptimizeCssPlugin({
                cssProcessor: config[nodeEnvType].build.productionSoureceMap
                    ? {safe: true, map: {inline: false}}
                    : {safe: true}
            }),
        ],
        splitChunks: {

            // 避免过度分割，设置尺寸不小于30Kb
            // cacheGroups 会继承这个值
            // minSize: 30000,

            // 缓存策略
            cacheGroups: {
                // 处理入口chunk
                vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  chunks: 'initial',
                  name: 'vendors',
                },
                // 处理异步chunk
                'async-vendors': {
                  test: /[\\/]node_modules[\\/]/,
                  minChunks: 3,
                  chunks: 'async',
                  name: 'app'
                }
              }
        }

    },
    plugins: [
        // vue-loader v15需要添加此插件
        new VueLoaderPlugin(),

        // 抽离css
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[bame].[contenthash].css'),
        }),

        // html配置
        new HtmlWebpackPlugin({
            // filename:  ,
            filename: config[nodeEnvType].build.index,
            template: 'code/client/index.html',
            inject: true,
            minify: {
                // 删除html 注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 去除属性引号
                removeAttributeQuotes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }),

        // 根据模块相对路径生成四位数hash值作为模块ID
        new webpack.HashedModuleIdsPlugin(),

        // 作用域提升，提升代码在浏览器执行速度
        new webpack.optimize.ModuleConcatenationPlugin(),

        // 将整个文件复制到构建输出指定目录下
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config[nodeEnvType].build.assetsPath,
            ignore: ['.*']
        }])

    ]
})

// 是否开启gzip压缩
if(config[nodeEnvType].build.productioinGzip){
    const CompressionWebpackPkugin = require('compression-webpack-plugin')
    
    webpackConfig.plugins.push(
        new CompressionWebpackPkugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' + 
                config[nodeEnvType].build.productionGzipExtensions.join('|') + 
                ')$'
            ),
            threshold: 10240, // 只有大小大雨该值的资源会被处理， 默认值是 0 
            minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理，默认值是 0.8
        })
    )

}

if(process.env.npm_config_report){
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin)
}

module.exports = webpackConfig