React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'

Th = require './lib/testHelpers'

Text = require '../src/datums/text'




renderComponent = (model, attr, extraProps) ->
  component = Th.render <Text model={model} attr={attr} {... extraProps}/>
  domNode = Th.domNode(component)
  
renderComponentAndTestValue = (model, attr, expectedValue, extraProps) ->
  domNode = renderComponent(model, attr, extraProps)
  $displayValue = $(domNode).find('.datum-display-value')
  $displayValue.text().should.equal expectedValue

renderComponentAndTestLength = (model, attr, expectedLength, extraProps) ->
  domNode = renderComponent(model, attr, extraProps)
  $displayValue = $(domNode).find('.datum-display-value')
  $displayValue.length.should.equal(1, "expected it to created a .datum-display-value element")
  $displayValue.text().length.should.be.at.most expectedLength

describe 'Text datum', ->          
  model = new Backbone.Model 
    name: "Fluffy"
    #             1        10       20        30        40        50        60 
    longName:    "Fluffy his royal cuteness and purveyor of purrs, playing and love"
    description: "This has some <b>html</b> up in here"
    trueValue: true
    falseValue: false
    arrayOfNumbers: [1,1,2,3,5,8]
      
  it 'should ellipsize to 35 by default', ->
    renderComponentAndTestLength model, 'longName', 35
    
  it 'should ellipsize at 50 if asked', ->
    renderComponentAndTestLength model, 'longName', 50, ellipsizeAt: 50
    
  it 'should respect the ellipsizeAt=false prop', ->
    renderComponentAndTestLength model, 'longName', 
      model.get('longName').length,  ellipsizeAt: false

  it 'should not render html unescaped unless asked ', ->
    component = Th.render <Text model={model} attr='description'/>
    $(Th.domNode(component)).find('b').length.should.equal 0

  it 'should be able to handle boolean value', ->
    renderComponentAndTestValue(model, 'trueValue', 'true')
    renderComponentAndTestValue(model, 'falseValue', 'false')
    
  it 'should be able to handle simple array', ->
    renderComponentAndTestValue(model, 'arrayOfNumbers', "1, 1, 2, 3, 5, 8")
      
  
    
    
    
    
  
