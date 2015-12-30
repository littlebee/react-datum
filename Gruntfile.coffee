###

  webpack setup and external grunt tasks are handled by bumble build:
  https://github.com/littlebee/bumble-build

###

fs = require('fs-extra')
BumbleBuild = require('bumble-build')

# so it get's picked up and compiled into our css
fs.copySync 'node_modules/react-select/dist/react-select.css', 'css/react-select.css' 

module.exports = (grunt) -> BumbleBuild.gruntConfig(grunt)
