
###
  Unoptimized config makes dist/react-datum.js

  See also, https://github.com/felixhao28/using-coffee-react-for-frontend-dev-walkthrough
###

webpack = require("webpack")
path = require("path")

module.exports =
  cache: true
  entry: [
    # "webpack-dev-server/client?http://localhost:3000", # WebpackDevServer host and port
    # "webpack/hot/only-dev-server",
    "./src/index" # Main app"s entry point
  ],
  output:
    path: path.join(__dirname, "dist")
    filename: "react-datum.js"
    libraryTarget: "var"
    library: "ReactDatum"
    publicPath: "/dist/"
  externals:
    "jquery": "jQuery"
    "backbone": "Backbone"
    "underscore": "_"
    "react": "React"
    "react-dom": "ReactDOM"
    "react-bootstrap": "Rbs"

  debug: true,

  resolve:
    extensions: ["", ".jsx", ".cjsx", ".coffee", ".js"]
    modulesDirectories: ["src", "node_modules"]

  module:
    loaders: [
      # 
      # DON'T USE THIS  if you do a require(`../css/someFile.css`) that file will fail to load in tests
      # If you need to include CSS for a component of this lib:
      #   - keep it minimal (let our users style and format)
      #   - please don't use inline styles as they are difficult for our user to override
      #   - put the css in a file that is of same or similar name to the components in the css/ dir
      #
      #   test: /\.css$/                         # required to write "require("./someFile.css")"
      #   loader: "style-loader!css-loader"
      # ,
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
        loader: "expose?$"
      ,
        test: require.resolve("jquery")
        loader: "expose?jQuery"
      ,
      #   test: require.resolve("react")
      #   loader: "expose?React"
      # ,
      #   test: /\.jsx$/
      #   loaders: ["react-hot", "jsx-loader?insertPragma=React.DOM"]
      #   include: path.join(__dirname, "src")
      # ,
        test: /\.(cjsx|coffee)$/
        loaders: ["coffee", "cjsx"]
        include: path.join(__dirname, "src")
      ,
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }        
      ,
        test: /\.(png|jpg|gif)$/
        loader: 'url-loader?limit=8192' # inline base64 URLs for <=8k images, direct URLs for the rest
        #test: /\.jpe?g$|\.gif$|\.png|\.ico$/, loader: 'file' 
    ]
  plugins: [
    # #  this adds a lot of code to the bundle for hot loading feature
    # new webpack.HotModuleReplacementPlugin()

    # We will probably need this plugin at some point
    # new webpack.ProvidePlugin
    #   React: "react"
    #   jQuery: "jquery"
    #   $: "jquery"
    #   "window.jQuery": "jquery"      

    ## I think this and changing the debug setting above to `debug: false` above are all that
    ##   should be needed to produce an optimized minified package
    # new webpack.optimize.DedupePlugin(),
    # new webpack.optimize.UglifyJsPlugin
    #  compress:
    #    warnings: false
    #  mangle:
    #    except: ['$super', '$', 'exports', 'require']
  ]
