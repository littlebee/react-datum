
###
  This was pillaged from
  https://github.com/felixhao28/using-coffee-react-for-frontend-dev-walkthrough

  - removed sass loader

  TODO:  there has to be a DRYer solution, webpack.production.config.coffee and
      webpack.config.coffee are almost identical
###

webpack = require("webpack")
path = require("path")
SCSS_LOADER = "style-loader!css-loader!sass-loader?sourceMap&includePaths[]=" + path.resolve(__dirname, "./node_modules")

module.exports =
  entry:
    app: "./src/index"
  output:
    path: path.resolve(__dirname, "./assets/")
    filename: "bundle.js"
    publicPath: "./assets/"
  resolve:
    extensions: ["", ".jsx", ".cjsx", ".coffee", ".js"]
    modulesDirectories: ["src", "node_modules"]
  module:
    loaders: [
      # required to write "require('./style.css')"
        test: /\.css$/,
        loader: "style-loader!css-loader"
      ,
      # required for bootstrap icons
        test: /\.(woff|woff2)$/
        loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff"
      ,
        test: /\.ttf$/
        loader: "file-loader?prefix=font/"
      ,
        test: /\.eot$/
        loader: "file-loader?prefix=font/"
      ,
        test: /\.svg$/
        loader: "file-loader?prefix=font/"
      ,
        test: require.resolve("jquery")
        loader: 'expose?$'
      ,
        test: require.resolve("jquery")
        loader: 'expose?jQuery'
      ,
        test: require.resolve("react")
        loader: "expose?React"
      ,
        test: /\.jsx$/
        loader: "jsx-loader?insertPragma=React.DOM"
      ,
        test: /\.(cjsx|coffee)$/
        loaders: ["coffee", "cjsx"]
    ]
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/vertx/), # https://github.com/webpack/webpack/issues/353
    new webpack.ProvidePlugin(
      # Automatically detect jQuery and $ as free var in modules
      # and inject the jquery library
      # This is required by many jquery plugins
      jQuery: "jquery",
      $: "jquery",
      React: "react/addons"
    ),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin
     compress:
       warnings: false
     mangle:
       except: ['$super', '$', 'exports', 'require']
  ]
