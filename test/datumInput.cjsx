React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'
sinon = require 'sinon'

Th = require './lib/testHelpers'


Datum = require '../src/datums/datum'  

class TestModel extends Backbone.Model 
  save: (attrs={}, options={})-> 
    options.success?(@)
    return true
  patch: -> return true
  
model = new TestModel
  name: "Fluffy"
  
TEST_LABEL = 'something different'
TEST_PLACEHOLDER_TEXT = "more different then display test placeholder text"
TEST_VALUE = "something different every day"

spies = [
  setSpy = sinon.spy(model, 'set')
  saveSpy = sinon.spy(model, 'save')
  patchSpy = sinon.spy(model, 'patch')
  # saveSuccessSpy = sinon.spy()
]
resetSpies = ->
  spy.reset() for spy in spies

describe 'Datum Input', ->          
  
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
      $input = Th.testDatumInput(datum, model.get('name'))
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
      resetSpies()
      inputNode = Th.domNodeByTag(datum, 'input')
      assert !model.set.called, "sanity check: model.set should not have been called yet, becuase we haven't done anything yet"
      Th.Simulate.blur inputNode
      assert !model.set.called, "model.set was called"
      datum.isDirty().should.equal false, "...and it should not think it's dirty"

    
  describe 'when rendered as input with setOnBlur=false', ->
    datum = Th.render <Datum model={model} attr="name" inputMode="edit" setOnBlur={false}/>
    datumNode = Th.domNode(datum)
    
    it 'should not set model value on blur', ->
      Th.changeDatumValue(datum, 'ginger', blur: true)
      model.get('name').should.not.equal 'ginger'

      
  describe 'when rendered as input with saveOnSet=true', ->
    datum = Th.render <Datum model={model} attr="name" inputMode="edit" saveOnSet={true}/>
    datumNode = Th.domNode(datum)
    
    it 'should set and save model value on blur', ->
      resetSpies()
      Th.changeDatumValue(datum, 'ginger', blur: true)
      model.get('name').should.equal 'ginger'
      assert model.save.called, "model.save should have been called"
      datum.isDirty().should.equal false, "...and it should not think it's dirty"

      
  describe 'when rendered as input with saveOnSet=true and modelSaveMethod=patch', ->
    datum = Th.render <Datum model={model} attr="name" inputMode="edit" saveOnSet={true} modelSaveMethod='patch'/>
    datumNode = Th.domNode(datum)
    
    it 'should set and save model value on blur', ->
      resetSpies()
      Th.changeDatumValue(datum, 'mary', blur: true)
      model.get('name').should.equal 'mary'
      assert !model.save.called, "model.save() should not have been called"
      assert model.patch.calledOnce, "model.patch() should have been called"
      datum.isDirty().should.equal false, "...and it should not think it's dirty"

  describe 'when rendered as input with saveOnSet=true and modelSaveOptions', ->
    datumNode = null
    successCalled = false
    modelSaveOptions = {
      success: =>
        successCalled = true
        $(datumNode).attr('class').should.contain 'saving'
    }
    
    datum = Th.render <Datum model={model} attr="name" inputMode="edit" saveOnSet={true} modelSaveOptions={modelSaveOptions}/>
    datumNode = Th.domNode(datum)
    
    it 'should call my success handler when passed via modelSaveOptions', ->
      resetSpies()
      Th.changeDatumValue(datum, 'Treble', blur: true)
      assert model.save.calledOnce, 'model.save should have been called'
      assert successCalled, 'should have called the success handler provided via modelSaveOptions'
      $(datumNode).attr('class').should.contain 'saved'

      
      
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
      
  
  describe 'when rendered as input with no model, value prop', ->
    datum = Th.render <Datum value={TEST_VALUE} inputMode="edit"/>
    datumNode = Th.domNode(datum)

    it "should think it's editable", ->
      datum.isEditable().should.equal true
      
    it 'should have rendered an input with value = TEST_VALUE', ->
      Th.testDatumInput(datum, TEST_VALUE)
    
    describe 'and then changed', =>
      before ->
        Th.changeDatumValue(datum, 'fred', blur: true)
      
      it 'should not think it is dirty', ->
        datum.isDirty().should.equal false
        
      it 'input should have new value', ->
        Th.testDatumInput(datum, 'fred')
        
    describe 'and then forced to update', ->
      before ->
        datum.forceUpdate()
      
      it 'input should still have new value', ->
        Th.testDatumInput(datum, 'fred')
        
        
    
    
  
        