'use strict'
const path = require('path')

module.exports = {
    client: {
        dev: {
            env: 'development',
            host: 'localhost',
            port: '6969',

            assetsSubDirectory: 'static',
            
            assetsPublicPath: '/',  //文件引用路径

            devtoolType: 'eval-source-map',
            proxyTable: {
                '/client_demo_api': {
                    target: 'http://192.168.1.19:3000/client_demo_api/',
                    changeOrigin: true,
                    pathRewrite: {
                      '^/client_demo_api': '/'
                    }
                },
                '/maskAppoint':{
                    target: 'https://mss.iconntech.com:9443/',
                    pathRewrite: {
                        '^/maskAppoint': ''
                    },
                    changeOrigin: true,
                    secure: false,
                    headers: {
                      Referer: 'https://mss.iconntech.com:9443/maskAppoint/'
                    }
        
                }
            },
            cssSourceMap: true,
            cssResources: 'src/style/variable.less' //全局使用less/sass变量路径
        },
        
        build: {
            env: 'production',

            // 指定打包后index路径
            index: path.resolve(__dirname, '../dist/client/index.html'),

            // paths
            assetsRoot: path.resolve(__dirname, '../dist/client'),
            assetsSubDirectory: 'static',

            assetsPublicPath: '/client/',  //打包后素材引用路径

            assetsPath: 'static',
            

            devtoolType: 'source-map',
            productionGzip: false,
            productionGzipExtensions: ['js', 'css'],
            productionSourceMap: true,

            cssResources: '' //全局使用less/sass变量路径

            
        }
        
    }
}