React = require 'react'
ReactDOM = require 'react-dom'

Backbone = require 'backbone'
$ = require 'jquery'
_ = require 'underscore'

Th = require '../lib/testHelpers'

TestExamples = require('bumble-test/testExamples')
testExamples = new TestExamples(addScripts: ['docs/vendor/tilegrid.min.js'])

KITTEN_DATA = require '../lib/kittenData'
# the examples expect these to be script tagged in and be available globally
_.extend global, 
  React: React
  ReactDOM: ReactDOM
  Backbone: Backbone
  '_': _
  '$': $
  'jQuery': $
  KITTEN_DATA: KITTEN_DATA


describe 'All examples (requires rebuild)', ->
  testExamples.testAllExamples()
  
    



  
