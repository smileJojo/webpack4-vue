'use strict'

const path = require("path")
const config = require("../config")
// 抽离css的webpack插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

exports.assetsPath = function(_path){
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config[process.env.NODE_ENV_TYPE].build.assetsSubDirectory
        : config[process.env.NODE_ENV_TYPE].dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoader = function(options){
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }
    function generateLoaders (loader, loaderOptions){
        const loaders = options.usePostCss ? [ cssLoader, postcssLoader] : [cssLoader]

        if(loaders){
            loaders.push({
                loader: `${loaders}-loader`,
                options: Object.assign({}, loaderOptions,{
                    sourceMap: options.sourceMap
                })
            })
        }

        if(options.extract) { //是否需要抽离css
            // return ExtractTextPlugin.extract({
            //     use: loaders,
            //     fallback: 'vue-style-loader',
            //     publicPath: "../../" // 抽离出来的css,添加路径前缀，让其打包出来的路径正确
            // })
            return [MiniCssExtractPlugin.loader].concat(loaders)
        }else{
            return ['vue-style-loader'].concat(loaders)
        }
    }
    return {
        css: generateLoaders(),
        // postcss: generateLoaders(),
        // less: generateLoaders('less'),
        // sass: generateLoaders('sass',{indentedSyntax: true}),
        // scss: generateLoaders('scss'),
        // stylus: generateLoaders("stylus"),
        // styl: generateLoaders("stylus")
    }
}

exports.styleLoaders = function(options){
    const output = []
    const loaders = exports.cssLoader(options)

    for(const extension in loaders){
        const loader = loaders[extension]
        output.push({
            test: new RegExp(`\\.` + extension + '$'),  //  路径匹配
            use: loader
        })
    }
    return output
}