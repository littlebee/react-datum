React = require 'react'
ReactDOM = require 'react-dom'
ReactTest = require 'react-addons-test-utils'
Backbone = require 'backbone'
$ = require 'jquery'
_ = require 'underscore'

Th = require '../lib/testHelpers'

fs = require 'fs'
glob = require 'glob'


EXAMPLE_DIR = 'docs/examples'

# the examples expect these to be script tagged in and be available globally
_.extend global, 
  React: React
  ReactDOM: ReactDOM
  Backbone: Backbone
  '_': _
  '$': $
  'jQuery': $
  

# this is a suboptimal way of doing this.  I also tried and failed when using:
#  - a script tag with a src,  no way to load it synchrously or detect it's load
#  - wrapping this in another jsDom.env  - i think it ignores if already in a jsDom.env
loadExample = (exampleScriptFile, done) ->
  # example files all expect to find an element with the id='demo' where they do 
  # their rendering
  $('body').html """
    <div id="demo"></div>
    <script>#{fs.readFileSync('dist/react-datum.js')}</script>
    <script>#{fs.readFileSync(exampleScriptFile)}</script>
  """
  done()

testExample = (exampleFile) ->
  describe "Example: #{exampleFile}", ->
    it 'should render something', (done) ->
      loadExample exampleFile, ->
        #console.log $('#demo').html()
        $('#demo').html().should.not.equal ""
        done()
      

testAllExamples = () ->
  files = glob.sync(EXAMPLE_DIR + '/**/*.js', {nodir: true})
  files.forEach(testExample)  
  
  
  
describe 'All examples', ->
  testAllExamples()
  
    


