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
  
# require in the whole distro and it will add ReactDatum global needed by examples
#global.ReactDatum = require '../../dist/react-datum'
#global.ReactDatum = window.ReactDatum

#jsdom = require 'jsdom'

loadExample = (exampleScriptFile, done) ->
  # jsdom.env exampleScriptFile, -> done()
  $('body').html """
    <div id="demo"></div>
    <script>#{fs.readFileSync('dist/react-datum.js')}</script>
    <script>#{fs.readFileSync(exampleScriptFile)}</script>
  """
  done()

testExample = (exampleFile) ->
  describe "Example: #{exampleFile}", ->
          #require "../../" + exampleFile
    
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
  
    


