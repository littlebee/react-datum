React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'
sinon = require 'sinon'

Th = require './lib/testHelpers'


Datum = require '../src/datums/datum'  


describe 'Datum (base class)', ->          
  
  model = new Backbone.Model 
    name: "Fluffy"
    
  TEST_LABEL = 'something different'
  TEST_PLACEHOLDER_TEXT = "more different then display test placeholder text"
  
  describe 'when rendered as input without props', ->
    datum = null;
    datumNode = null
    
    beforeEach ->
      datum = Th.render <Datum model={model} attr="name" inputMode="edit"/>
      datumNode = Th.domNode(datum)

    it "should think it's editable", ->
      datum.isEditable().should.equal true
      
    it "should not think it's dirty", ->
      datum.isDirty().should.equal false
      
    it 'should have rendered an input w/o placeholder attribute', ->
      $input = $(datumNode).find('input')
      $input.length.should.equal 1
      $input.attr('placeholder').should.be.equal ''
      
    it 'should set model value on blur by default', ->
      Th.changeDatumValue(datum, 'bob')
      model.get('name').should.equal 'bob'
      datum.isDirty().should.equal false, "...and it should not think it's dirty"
    
    it 'should not set model value on blur if asked not to', ->
      Th.changeDatumValue(datum, 'fred', blur: false)
      model.get('name').should.not.equal 'fred'
      datum.isDirty().should.equal true, "...and it should think it's dirty"
      
    it 'should not set model value on blur if not changed', ->
      sinon.spy model, 'set'
      inputNode = Th.domNodeByTag(datum, 'input')
      model.set.called.should.equal false, "sanity check: model.set should not have been called yet, becuase we haven't done anything yet"
      Th.Simulate.blur inputNode
      model.set.called.should.equal false, "model.set should still not have been called"
      datum.isDirty().should.equal false, "...and it should not think it's dirty"

    
  describe 'when rendered as input with setOnBlur=false', ->
    datum = Th.render <Datum model={model} attr="name" inputMode="edit" setOnBlur={false}/>
    datumNode = Th.domNode(datum)
    
    it 'should set not set model value on blur', ->
      Th.changeDatumValue(datum, 'ginger', blur: true)
      model.get('name').should.not.equal 'ginger'

      
  describe 'when rendered as input with model value, placeholder & label', ->
    datum = Th.render <Datum model={model} attr="name" label={TEST_LABEL} placeholder={TEST_PLACEHOLDER_TEXT} inputMode="edit"/>
    datumNode = Th.domNode(datum)
    
    it "should think it's editable", ->
      datum.isEditable().should.equal true
      
    it 'should have rendered an input w/placeholder attribute', ->
      $input = $(datumNode).find('input')
      $input.length.should.equal 1
      $input.attr('placeholder').should.be.equal TEST_PLACEHOLDER_TEXT
      
    it 'should have rendered a label', ->
      datumNode.innerHTML.should.contain(TEST_LABEL) 
  
    it 'should not be showing a placeholder', ->
      # the place holder value is on an input attribute tho so the tests above
      # will not work
      $(datumNode).find('.placeholder').length.should.equal 0
  
    it 'should not have rendered a datum-display-value', ->
      $displayValue = $(datumNode).find('.datum-display-value')
      $displayValue.length.should.equal 0
      
    it 'should not have rendered "undefined" or [object Object]', ->
      datumNode.innerHTML.should.not.contain("undefined")
      datumNode.innerHTML.should.not.contain("[object Object")
      
  
        