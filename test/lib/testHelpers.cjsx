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
  @Simulate:           ReactTest.Simulate

  @domNode: (component) ->
    ReactDOM.findDOMNode(component)


  @domNodeByClass: (component, className) ->
    c = @findByClass(component, className)
    return @domNode(c[0])


  @domNodeByTag: (component, tag) ->
    c = @findByTag(component, tag)
    return @domNode(c[0])


  @dumpHtml: (component) ->
    me = "dumpHtml"
    if component?
      node = @domNode(component)
      if node?
        console.log me, node.outerHTML
      else
        console.log me, "node not found for component:", component
    else
      console.log me, 'component passed is null or undefined'


  @changeDatumAndTestValid = (component, newValue, shouldBeValid=true) ->
    inputNode = @domNodeByTag(component, 'input')
    inputNode.value = newValue
    ReactTest.Simulate.change(inputNode)
    iconsExpected = if shouldBeValid then 0 else 1
    @findByTag(component, 'i').length.should.be.equal(iconsExpected, "expected to find one icon")
