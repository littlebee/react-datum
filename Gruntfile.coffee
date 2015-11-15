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

  vps: process.env.VPS || grunt.option('vps') || "#{process.env.USER}-emsweb-01.vps.zulily.com"

  # configuration
  grunt.initConfig
    pkg: pkg

    # args to initConfig method are the tasks

    # TODO : add sourcemaps and clean them eg: "app/webroot/less/**/*.css.map"]
    clean:
      coffee:
        ["build/**/*.js"]

      distrib:
        ["dist/react-datum.*"]

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
      # build isn't really used right now (examples is) because webpack takes
      # care of pipelining coffeescript and cjsx
      build:
        options:
          header: true
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*.coffee', '!examples/*']
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
      # build isn't really used right now (examples is) because webpack takes
      # care of pipelining coffeescript and cjsx
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
        
    cssmin: {
      options: {
        shorthandCompacting: false,
        keepBreaks: true
      },
      distrib: {
        files: {
          'dist/react-datum.css': [
            'css/**/*.css', 
            'node_modules/react-select/dist/react-select.css'
          ]
        }
      }
    }      
    
    shell:
      buildExamples:
        command: 'coffee ./scripts/buildExamples.coffee grunt'
      deploy:
        options:
          # should gracefully fail if it doesn't find zukeeper src.  see comment at top of the script
          failOnError: false
        command: 'coffee ./scripts/deployToZukeeper.coffee'
      npmInstall:
        command: 'npm install'
      test:
        command: 'coffee scripts/testRunner.coffee'


    availabletasks:
      tasks:
        options:
          filter: 'include'
          tasks: ['build', 'watch']


    watch:
      examplesDeps:
        files: ["scripts/lib/exampleFile.tpl", "scripts/buildExamples.coffee"]
        tasks: ["clean:examples", "examples"]
      examples:
        files: ["src/examples/**/*", "scripts/lib/exampleFile.tpl"]
        tasks: ["examples"]
      distrib:
        files: ["src/**/*", "!src/examples/*", "css/**/*", "webpack.config.coffee"]
        tasks: ["distrib"]


    webpack:
      distrib: require("./webpack.config.coffee")
      optimize: require("./webpack.optimized.config.coffee")


  # tasks
  grunt.registerTask 'test', ['build', "shell:test"]
  grunt.registerTask 'distrib', ['cssmin:distrib', 'webpack:distrib', 'webpack:optimize','shell:deploy']
  grunt.registerTask 'examples', ['newer:react:examples', 'newer:cjsx:examples', 'newer:coffee:examples', 'shell:buildExamples']
  grunt.registerTask 'build', ['examples', 'distrib'] # ['newer:cjsx:build', 'newer:coffee:build', 'distrib']
  grunt.registerTask 'default', ['availabletasks']
