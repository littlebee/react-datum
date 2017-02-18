###

  webpack setup and external grunt tasks are handled by bumble build:
  https://github.com/littlebee/bumble-build

###

fs = require('fs-extra')
BumbleBuild = require('bumble-build')

# so it get's picked up and compiled into our css
fs.copySync 'node_modules/react-select/dist/react-select.css', 'css/react-select.css' 

debugger

module.exports = (grunt) -> 
  
  grunt.loadNpmTasks('grunt-coveralls');
  
  return BumbleBuild.gruntConfig grunt,

    # change where we get css files from so we don't pick up the docs dir
    cssmin:
      distrib: 
        files:    
          "dist/react-datum.css": [
            'css/react-datum/*.css'
          ]
    
    coveralls:
      options:
        force: true
      
      upload:
        src: 'coverage/lcov.info'
