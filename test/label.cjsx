React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'

Th = require './lib/testHelpers'


Label = require '../src/datums/label'  


describe 'Label', ->          
  
  model = new Backbone.Model 
    name: "Fluffy"
    
  TEST_TEXT_VALUE = 'Some important value'
  
  assertHasLabel = (datumNode, expectedValue) ->
      $label = $(datumNode).find('label') 
      $label.length.should.equal 1
      $label.text().should.contain(expectedValue)
    
  
  describe 'when rendered model and attr props', ->
    datum = Th.render <Label model={model} attr="name"/>
    datumNode = Th.domNode(datum)
  
    it 'should render a label with model name as content', -> assertHasLabel(datumNode, model.get('name'))
      
      
  describe 'when rendered with model, attr and value props', ->
    datum = Th.render <Label model={model} attr="name" value={TEST_TEXT_VALUE}/>
    datumNode = Th.domNode(datum)
    
    it 'should render label with value as content', -> assertHasLabel(datumNode, TEST_TEXT_VALUE)
      
      
  describe 'when rendered with just the value props', ->
    datum = Th.render <Label value={TEST_TEXT_VALUE}/>
    datumNode = Th.domNode(datum)
    
    it 'should render label with value as content', -> assertHasLabel(datumNode, TEST_TEXT_VALUE)
      
  
  describe 'when rendered with children', ->
    datum = Th.render <Label model={model} attr="name">{TEST_TEXT_VALUE}</Label>
    datumNode = Th.domNode(datum)
    
    it 'should render label with children as content', -> assertHasLabel(datumNode, TEST_TEXT_VALUE)
    
      
      
  
      
  
  


  
