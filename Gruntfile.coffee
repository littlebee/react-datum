###

  webpack setup and external grunt tasks borrowed from:
    https://github.com/felixhao28/using-coffee-react-for-frontend-dev-walkthrough

  unusused tasks from zuKeeper.  TODO: remove them if not needed

###

DOCS_SRC = 'src/docs'
DOCS_DEST = 'docs'

EXAMPLE_SRC = 'src/docs/examples'
EXAMPLE_DEST = 'docs/examples'

BUMBLE_DOCS_SCRIPTS = './node_modules/bumble-docs/scripts/'

Path = require('path')

bumbleScriptCommand = (scriptFile, args="")-> 
  return "coffee #{Path.join(BUMBLE_DOCS_SCRIPTS, scriptFile)} #{args}"


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
    clean:
      distrib: ["dist/react-datum.*"]
      
      # these are the things created by bumble-docs/scripts
      docs: [
        "#{DOCS_DEST}/index.html"
        "#{DOCS_DEST}/api/**/*"
        "#{DOCS_DEST}/examples/**/*"
        "#{DOCS_DEST}/css/**/*"
        "#{DOCS_DEST}/vendor/**/*"
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
        command: bumbleScriptCommand('buildExamples.coffee')

      buildDocIndex:
        command: bumbleScriptCommand('buildDocIndex.coffee')
        
      buildApiDocs: 
        command: bumbleScriptCommand('buildApiDocs.coffee')
      
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
      build:
        files: ["src/**/*", "css/**/*", "lib/**/*", "scripts/**/*", "webpack.config.coffee"]
        tasks: ["build"]


    webpack:
      distrib: require("./webpack.config.coffee")
      optimize: require("./webpack.optimized.config.coffee")


  # tasks
  grunt.registerTask 'test', ['build', "shell:test"]
  grunt.registerTask 'distrib', ['cssmin:distrib', 'webpack:distrib', 'webpack:optimize','shell:deploy']
  grunt.registerTask 'docs',  ['shell:buildDocIndex', 'shell:buildApiDocs', 'shell:buildExamples']
  grunt.registerTask 'build', ['docs', 'distrib'] 
  grunt.registerTask 'default', ['availabletasks']
