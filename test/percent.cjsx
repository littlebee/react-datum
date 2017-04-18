React = require 'react'
ReactTest = require 'react-addons-test-utils'

Backbone = require 'backbone'
$ = require 'jquery'

Th = require './lib/testHelpers'
Percent = require '../src/datums/percent'

describe 'Percent datum', ->
  
  describe 'as display', ->
    model = new Backbone.Model({foo: 0.10})
    component = Th.render <Percent attr='foo' model={model}/>
    domNode = Th.domNode(component)
    
    it 'should not have an input', -> 
      Th.findByTag(component, 'input').length.should.be.equal(0)
      
    it 'should have rendered 10%', ->
      $(domNode).find('.datum-display-value').text().should.be.equal("10%")

  describe 'as input', ->
    model = new Backbone.Model({foo: 0.40})
    component = Th.render <Percent attr='foo' model={model} inputMode='edit'/>
    domNode = Th.domNode(component)
    
    it 'should save user input value / 100 on model set', ->
      Th.changeDatumAndTestValid(component, 20)
      model.get('foo').should.equal 0.20  
      
