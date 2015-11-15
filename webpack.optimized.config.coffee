
###
  optimized config makes dist/react-datum.min.js
###

webpack = require("webpack")
path = require("path")
_ = require('lodash')

baseConfig = require('./webpack.config')
optimizedConfig =
  debug: false,
  output:
    filename: "react-datum.min.js"
  plugins: baseConfig.plugins.concat [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(
      compress:
        warnings: false
      mangle:
        except: ['$super', '$', 'exports', 'require']
    )
  ]
# digging lodash
exportConfig = _.defaultsDeep optimizedConfig, baseConfig
#console.log exportConfig

module.exports = exportConfig
