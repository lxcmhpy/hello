'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  //BASE_API: '"http://172.16.169.54:8888"',
  //BASE_API: '"http://172.16.170.53:8888"', //线上的
  // BASE_API: '"http://172.16.169.62:8888/catsic"', //鸿燕
  // BASE_API: '"http://172.16.169.83:8888/catsic"', //罗兴朝
  // BASE_API: '"http://172.16.169.75:8888/catsic"', //单国鑫
  BASE_API: '"http://172.16.168.84:8888/catsic"', //单国鑫


  //BASE_API2: '"http://baidu.com"',
})
