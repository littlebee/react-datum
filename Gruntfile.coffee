

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
  grunt.registerTask 'build', ['distrib']
  grunt.registerTask 'default', ['build']

  # webpack pretty much does everything
  #grunt.registerTask 'build', ['newer:cjsx:build', 'newer:coffee:build', 'distrib']
  #grunt.registerTask 'default', ['build']
