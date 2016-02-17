React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'

Th = require './lib/testHelpers'


Datum = require '../src/datums/datum'  


describe 'Datum (base class)', ->          
  
  model = new Backbone.Model 
    name: "Fluffy"
    
  TEST_LABEL = 'stop labeling me'
  TEST_PLACEHOLDER_TEXT = "whatever it is you are looking for isn't here"
  
  describe 'when rendered without props', ->
    datum = Th.render <Datum model={model} attr="name"/>
    datumNode = Th.domNode(datum)
  
    it 'should initially render model name', ->
      datumNode.innerHTML.should.contain(model.get('name'))
      
    it 'should default to readonly "', ->
      datum.isEditing().should.equal false 
      
    it 'should not have rendered an input', ->
      $(datumNode).find('input').length.should.equal 0  
    
    
  describe 'when rendered with label', ->
    datum = Th.render <Datum model={model} attr="name" label={TEST_LABEL}/>
    datumNode = Th.domNode(datum)
  
    it 'should render model name', ->
      datumNode.innerHTML.should.contain(model.get('name'))
      
    it 'should not have rendered a label', ->
      datumNode.innerHTML.should.contain(TEST_LABEL) 
    
    
  describe 'when rendered with a placeholder and value', ->
    datum = Th.render <Datum model={model} attr="name" label={TEST_LABEL} placeholder={TEST_PLACEHOLDER_TEXT}/>
    datumNode = Th.domNode(datum)
  
    it 'should render model name', ->
      datumNode.innerHTML.should.contain(model.get('name'))

    it 'should have rendered a label', ->
      datumNode.innerHTML.should.contain(TEST_LABEL) 
      
    it 'should not be showing a placeholder', ->
      datumNode.innerHTML.should.not.contain(TEST_PLACEHOLDER_TEXT)

      
    
  describe 'when rendered with a placeholder and without a value', ->
    datum = Th.render <Datum model={model} attr="bogus" label={TEST_LABEL} placeholder={TEST_PLACEHOLDER_TEXT}/>
    datumNode = Th.domNode(datum)
  
    it 'should be showing a placeholder', ->
      datumNode.innerHTML.should.contain(TEST_PLACEHOLDER_TEXT)
    
    it 'should not have rendered a datum-display-value', ->
      $(datumNode).find('.datum-display-value').length.should.equal 0
      
    it 'should not have rendered "undefined" or [object Object]', ->
      datumNode.innerHTML.should.not.contain("undefined")
      datumNode.innerHTML.should.not.contain("[object Object")
      


      
    


  
