'use strict'

process.env.NODE_ENV = 'production'

// node for loading
var ora = require('ora')
// rm-rf for node
var rm = require("rimraf")
// path for node
var path = require("path")
// console for node
var chalk = require("chalk")
var webpack = require("webpack")
var webapckConfig = require("./webpack.prod.conf")
var config = require('../config')
const nodeEnvType = process.env.NODE_ENV_TYPE
//指定删除的文件
var rmFile = path.join(config[nodeEnvType].build.assetsRoot, config[nodeEnvType].build.assetsSubDirectory)

var spinner = ora("building from production...")
spinner.start() // 开启loading动画

// 构建全量压缩包
rm(rmFile, err => {
    if(err) throw err
    webpack(webapckConfig, function(err, stats){
        spinner.stop()
        if(err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + "\n\n")

        if(stats.hasErrors()){
            console.log(chalk.red(' Build failed with errors. \n'))
            process.exit(1)
        }
        console.log(chalk.cyan(' Build complete. \n'))
        console.log(chalk.yellow(
            ' Top: build files are meant to be served over an HTTP servr. \n' +
            ' Opening index.html over file:// won\'t work. \n'
        ))
    })
})