
###
  This was pillaged from
  https://github.com/felixhao28/using-coffee-react-for-frontend-dev-walkthrough
  (which isn't so... yeah)

  - removed sass loader
  - removed a lot more stuff and dried up with webpack.config

  - I had to prove to myself that the optimizer was stripping comments.  it does :)

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
