var WebpackDevServer = require('webpack-dev-server')
var webpack = require('webpack')
var config = require('./webpack.config.js')
var path = require('path')
var compile = webpack(config)
var server = new WebpackDevServer(compile)
server.listen(3000,'localhost',function(){});