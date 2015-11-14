React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'

Th = require './lib/testHelpers'
Number = require '../src/datums/number'


describe 'Number datum', ->
  model = new Backbone.Model({foo: 10})

  describe 'as input with minValue prop', ->
    component = Th.render <Number attr='foo' model={model} inputMode='edit' minValue={10}/>

    it 'should have one input', -> Th.findByTag(component, 'input').length.should.be.equal(1)
    it 'should show as valid when equal to minValue', -> Th.changeDatumAndTestValid(component, 10)
    it 'should show invalid when less than minValue', -> Th.changeDatumAndTestValid(component, 3, false)


  describe 'as input with maxValue prop', ->
    component = Th.render <Number attr='foo' model={model} inputMode='edit' maxValue={10}/>

    it 'should show as valid when equal to maxValue',  -> Th.changeDatumAndTestValid(component, 10)
    it 'should show as valid when less than maxValue', -> Th.changeDatumAndTestValid(component, 3)
    it 'should show invalid when greater than maxValue', -> Th.changeDatumAndTestValid(component, 11, false)


  describe 'as display with comma format', ->
    component = Th.render <Number attr='foo' model={model} format="comma"/>
    domNode = Th.domNode(component)

    it 'should not have an input', -> Th.findByTag(component, 'input').length.should.be.equal(0)

    it 'should have tres commas for one billion', ->
      model.set('foo', 1000000000)
      component.forceUpdate()        # doesn't automatically update because it's not in a <Model> context
      $(domNode).find('.datum-display-value').text().should.be.equal("1,000,000,000")

    it 'should have two commas for one million plus a lot of decimal places', ->
      model.set('foo', 1000000.9882794274)
      component.forceUpdate()       
      $(domNode).find('.datum-display-value').text().should.be.equal("1,000,000.9882794274")
