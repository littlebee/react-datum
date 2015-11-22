React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'

Th = require './lib/testHelpers'

Text = require '../src/datums/text'

renderComponentAndTestLength = (model, attr, expectedLength, extraProps) ->
  component = Th.render <Text model={model} attr={attr} {... extraProps}/>
  domNode = Th.domNode(component)
  $displayValue = $(domNode).find('.datum-display-value')
  $displayValue.length.should.equal(1, "expected it to created a .datum-display-value element")
  $displayValue.text().length.should.be.at.most expectedLength

describe 'Text datum', ->          
  model = new Backbone.Model 
    name: "Fluffy"
    #             1        10       20        30        40        50        60 
    longName:    "Fluffy his royal cuteness and purveyor of purrs, playing and love"
    description: "This has some <b>html</b> up in here"
      
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

  it 'should render html unescaped if asked ', ->
    component = Th.render <Text model={model} attr='description' ellipsizeAt={false} displayAsHtml/>
    $(Th.domNode(component)).find('b').length.should.equal 1
    
  
