
###
  This was pillaged from
  https://github.com/felixhao28/using-coffee-react-for-frontend-dev-walkthrough

  - removed sass loader


  TODO:  there has to be a DRYer solution, webpack.production.config.coffee and
      webpack.config.coffee are almost identical

###

webpack = require("webpack")
path = require("path")

module.exports =
  cache: true
  entry: [
    "webpack-dev-server/client?http://localhost:3000", # WebpackDevServer host and port
    "webpack/hot/only-dev-server",
    "./src/index" # Main app"s entry point
  ],
  output:
    path: path.join(__dirname, "dist")
    filename: "bundle.js"
    libraryTarget: "var"
    library: "ReactDatum"
    publicPath: "/dist/"
  externals:
    "jquery": "jQuery"
    "backbone": "Backbone"
    "react": "React"
    "react-dom": "ReactDom"
    "react-bootstrap": "Rbs"
  debug: false,

  resolve:
    extensions: ["", ".jsx", ".cjsx", ".coffee", ".js"]
    modulesDirectories: ["src", "node_modules"]
  module:
    loaders: [
      # required to write "require("./style.css")"
        test: /\.css$/
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
      #   test: require.resolve("jquery")
      #   loader: "expose?$"
      # ,
      #   test: require.resolve("jquery")
      #   loader: "expose?jQuery"
      # ,
      #   test: require.resolve("react")
      #   loader: "expose?React"
      # ,
        test: /\.jsx$/
        loaders: ["react-hot", "jsx-loader?insertPragma=React.DOM"]
        include: path.join(__dirname, "src")
      ,
        test: /\.(cjsx|coffee)$/
        loaders: ["react-hot", "coffee", "cjsx"]
        include: path.join(__dirname, "src")
    ]
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    new webpack.NoErrorsPlugin()
    new webpack.IgnorePlugin(/vertx/) # https://github.com/webpack/webpack/issues/353
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin
     compress:
       warnings: false
     mangle:
       except: ['$super', '$', 'exports', 'require']
  ]
