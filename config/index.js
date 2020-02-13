'use strict'
const path = require('path')

module.exports = {
    admin: {
        dev: {
            env: 'development',
            publicPath: '/',
            host: 'localhost',
            port: '1234',
            assetsSubDirectory: 'static',
            devtoolType: 'cheap-module-eval-source-map',
            proxyTable: {
                '/api': {
                    target:'',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '/'
                    }
                }
            }
        },
        build: {
            env: 'production',
            publicPath: '/admin',
            assetsPath: 'static',
            assetsSubDirectory: 'staitc',
            devtoolType: 'source-map',
            productionGzip: false,
            productionGzipExtensions: ['js', 'css']
        }
    },
    client: {
        dev: {
            env: 'development',
            publicPath: '/client/',
            host: 'localhost',
            port: '6969',
            assetsSubDirectory: 'static',
            devtoolType: 'cheap-module-eval-source-map',
            proxyTable: {
                '/api': {
                    target:'',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '/'
                    }
                }
            },
            cssSourceMap: true
        },
        
        build: {
            env: 'production',

            // template for index.html
            index: path.resolve(__dirname, '../dist/client/index.html'),

            // paths
            publicPath: '/client/',

            assetsRoot: path.resolve(__dirname, '../dist/client'),
            assetsSubDirectory: 'static',

            assetsPath: 'static',
            

            devtoolType: 'source-map',
            productionGzip: false,
            productionGzipExtensions: ['js', 'css'],
            productionSourceMap: true,

            
        }
        
    }
}