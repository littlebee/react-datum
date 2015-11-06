###

  webpack setup and external grunt tasks borrowed from:
    https://github.com/felixhao28/using-coffee-react-for-frontend-dev-walkthrough

  unusused tasks from zuKeeper.  TODO: remove them if not needed

###

EXAMPLE_SRC = 'src/examples'
EXAMPLE_DEST = 'docs/examples'

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
        ["docs/examples/**/*.js", "docs/examples/**/*.html"]


    react:
      examples:
        files: [
          expand: true
          cwd: EXAMPLE_SRC
          src: [ '**/*.jsx' ]
          dest: EXAMPLE_DEST
          ext: '.js'
        ]

    coffee:
      build:
        options:
          header: true
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*.coffee', '!**/*-test.coffee', '!examples/*']
          dest: 'build'
          ext: '.js'
        ]
      examples:
        files: [
          expand: true
          cwd: EXAMPLE_SRC
          src: [ '**/*.coffee' ]
          dest: EXAMPLE_DEST
          ext: '.js'
        ]

    cjsx:
      build:
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*.cjsx', '!examples/*']
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

    run:
      buildExamples:
        options:
          failOnError: true
        cmd: 'coffee'
        args: ['./scripts/buildExamples.coffee','grunt']


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
  grunt.registerTask 'examples', ['react:examples', 'cjsx:examples', 'coffee:examples', 'run:buildExamples']
  grunt.registerTask 'build', ['examples', 'distrib'] # ['newer:cjsx:build', 'newer:coffee:build', 'distrib']
  grunt.registerTask 'default', ['build']
