###

  webpack setup and external grunt tasks borrowed from:
    https://github.com/felixhao28/using-coffee-react-for-frontend-dev-walkthrough

  unusused tasks from zuKeeper.  TODO: remove them if not needed

###
module.exports = (grunt) ->
  # load plugins
  # this loads all of the grunt-... packages in package.json.  clever
  require("load-grunt-tasks")(grunt)
  pkg = grunt.file.readJSON("package.json")

  # configuration
  grunt.initConfig
    pkg: pkg

    # args to initConfig method are the tasks

    # TODO : add sourcemaps and clean them eg: "app/webroot/less/**/*.css.map"]
    clean:
      coffee:
        ["build/**/*.js"]

      distrib:
        ["dist/**/*"]

      # all examples need to be .jsx or .csx
      examples:
        ["examples/**/*.js"]


    react:
      examples:
        files: [
          expand: true
          cwd: 'examples'
          src: [ '**/*.jsx' ]
          dest: 'examples'
          ext: '.js'
        ]

    coffee:
      build:
        options:
          header: true
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*.coffee']
          dest: 'build'
          ext: '.js'
        ]

    cjsx:
      build:
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*.cjsx']
          dest: 'build'
          ext: '.js'
        ]
      examples:
        files: [
          expand: true
          cwd: 'examples'
          src: [ '**/*.cjsx' ]
          dest:'examples'
          ext: '.js'
        ]


    watch:
      coffee:
        files: ["app/coffeescripts/**/*.coffee"]
        tasks: ["newer:coffee"]
        options:
          livereload: true
      cjsx:
        files: ["app/coffeescripts/**/*.cjsx"]
        tasks: ["newer:cjsx"]

      distrib:
        files: [
          "build/**/*"
        ]
        tasks: ["distrib"]


    webpack:
      distrib: require("./webpack.config.coffee")


  # tasks
  grunt.registerTask 'distrib', ['webpack:distrib']
  grunt.registerTask 'examples', ['react:examples', 'cjsx:examples']
  grunt.registerTask 'build', ['examples', 'distrib'] # ['newer:cjsx:build', 'newer:coffee:build', 'distrib']
  grunt.registerTask 'default', ['build']
