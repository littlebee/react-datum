###

  webpack setup and external grunt tasks borrowed from:
    https://github.com/felixhao28/using-coffee-react-for-frontend-dev-walkthrough

  unusused tasks from zuKeeper.  TODO: remove them if not needed

###

DOCS_SRC = 'src/docs'
DOCS_DEST = 'docs'

EXAMPLE_SRC = 'src/docs/examples'
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

      # all examples need to be compiled to .js to be statically available to gh-pages
      examples:
        ["#{EXAMPLE_DEST}/**/*.js", "#{EXAMPLE_DEST}/**/*.html"]
        
      docIndex:
        ["#{DOCS_DEST}/index.html"]


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
      examples:
        files: [
          expand: true
          cwd: EXAMPLE_SRC
          src: [ '**/*.coffee' ]
          dest: EXAMPLE_DEST
          ext: '.js'
        ]

    cjsx:
      examples:
        files: [
          expand: true
          cwd: EXAMPLE_SRC
          src: [ '**/*.cjsx' ]
          dest:EXAMPLE_DEST
          ext: '.js'
        ]
    
        
    cssmin: 
      options: 
        shorthandCompacting: false,
        keepBreaks: true
      
      distrib: 
        files: 
          'dist/react-datum.css': [
            'css/**/*.css', 
            'node_modules/react-select/dist/react-select.css'
          ]
       
    
    shell:
      buildExamples:
        command: 'coffee ./scripts/buildExamples.coffee grunt'

      buildDocIndex:
        command: 'coffee ./scripts/buildDocIndex.coffee grunt'
      
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
          tasks: ['build', 'test', 'watch',  'clean', 'docs']
          descriptions: 
            build: "Builds everything including docs, examples"
            test: "Builds everything and then run tests in /test"
            watch: "Watch for changing files and calls build. Also watches examples and docs"
            docs: "Build the docs. To publish to github.io, you must pull master into gh-pages"
            clean: "Remove all compiled files. Use `grunt clean build` to rebuild everything from scratch"

    watch:
      examplesDeps:
        files: ["src/docs/exampleFile.tpl", "scripts/buildExamples.coffee"]
        tasks: ["clean:examples"]
      
      docs:
        files: ["src/docs/**/*", "scripts/buildDocIndex.coffee", "scripts/documentor.coffee", "README.md"]
        tasks: ["docs"]
              
      distrib:
        files: ["src/**/*", "!src/examples/*", "css/**/*", "webpack.config.coffee"]
        tasks: ["distrib"]


    webpack:
      distrib: require("./webpack.config.coffee")
      optimize: require("./webpack.optimized.config.coffee")


  # tasks
  grunt.registerTask 'test', ['build', "shell:test"]
  grunt.registerTask 'distrib', ['cssmin:distrib', 'webpack:distrib', 'webpack:optimize','shell:deploy']
  grunt.registerTask 'docs',  ['shell:buildDocIndex', 'examples']
  grunt.registerTask 'examples', ['newer:react:examples', 'newer:cjsx:examples', 'newer:coffee:examples', 'shell:buildExamples']
  grunt.registerTask 'build', ['docs', 'distrib'] # ['newer:cjsx:build', 'newer:coffee:build', 'distrib']
  grunt.registerTask 'default', ['availabletasks']
