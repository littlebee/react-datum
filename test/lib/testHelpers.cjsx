###
  utilities for writing tests and aliases for long ass, no fucking way I'm typing
  that out React methods
###

React = require 'react'
ReactDOM = require 'react-dom'
ReactTest = require 'react-addons-test-utils'


module.exports = class TestHelpers
  # these are aliases of React test util names that are TFL
  @findByClass:        ReactTest.scryRenderedDOMComponentsWithClass
  @findByTag:          ReactTest.scryRenderedDOMComponentsWithTag
  @render:             ReactTest.renderIntoDocument

  @domNode: (component) ->
    ReactDOM.findDOMNode(component)


  @domNodeByClass: (component, className) ->
    c = @findByClass(component, className)
    return @domNode(c[0])


  @dumpHtml: (component) ->
    console.log @domNode(component).outerHTML
