'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const cssResources = config[process.env.NODE_ENV_TYPE][isProduction ? 'build' : 'dev'].cssResources

module.exports = {
  loaders: utils.cssLoader({
    sourceMap: !isProduction,
    extract: isProduction,
    cssResources
  }),
  // cssSourceMap: sourceMapEnabled,
  // cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
