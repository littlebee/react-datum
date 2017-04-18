React = require 'react'
ReactTest = require 'react-addons-test-utils'

Backbone = require 'backbone'
$ = require 'jquery'
_ = require 'underscore'

Th = require './lib/testHelpers'

ClickToEditForm = require '../src/clickToEditForm'
Text = require '../src/datums/text'
Percent = require '../src/datums/percent'
WholeNumber = require '../src/datums/wholeNumber'

describe 'ClickToEditForm', ->
  
  model = new Backbone.Model
    somePercent: 0.10
    someText: 'hello'
    someWholeNumber: 20
    
  modelSaveCount = 0
  model.save = (attrs, options={}) ->
    modelSaveCount++
    options.success?()
    return true

  describe 'when rendered with datums', ->
    component = Th.render <ClickToEditForm model={model}>
      <Text attr='someText'/>
      <WholeNumber attr='someWholeNumber'/>
      <Percent attr='somePercent'/>
    </ClickToEditForm>
    
    domNode = Th.domNode(component)
    
    it 'should have rendered an edit button', ->
      $button = $(domNode).find('button')
      $button.length.should.be.equal 1
      $button.text().should.equal "Edit"
      
    it 'should not have rendered any inputs', ->
      $(domNode).find('input').length.should.equal 0
    
    describe 'and then clicking Edit button', ->
      before () ->
        Th.Simulate.click $(domNode).find('button')[0]
        
      it 'should have rendered save and cancel buttons', ->
        $(domNode).find('button').length.should.equal 2
        $(domNode).find('.btn.btn-success').length.should.equal 1

      it 'should have rendered three inputs', ->
        $(domNode).find('input').length.should.equal 3
          
      
      describe 'and then clicking the cancel button', ->
        before () ->
          Th.Simulate.click $(domNode).find('.btn:not(.btn-success)')[0]
          
        it 'should go back to display mode', ->
          $button = $(domNode).find('button')
          $button.length.should.be.equal 1
          $(domNode).find('input').length.should.equal 0
          
      
      describe 'and then clicking the save button', ->
        before () ->
          # need to click edit button again 
          Th.Simulate.click $(domNode).find('button')[0]
          Th.Simulate.click $(domNode).find('.btn.btn-success')[0]
          
        it 'should go back to display mode', ->
          $button = $(domNode).find('button')
          $button.length.should.be.equal 1
          $(domNode).find('input').length.should.equal 0
          
        it 'should have called model.save', ->
          modelSaveCount.should.be.equal 1
          
          
  describe 'when rendered with readonly prop', ->
    component = Th.render <ClickToEditForm model={model} readonly>
      <Text attr='someText'/>
      <WholeNumber attr='someWholeNumber'/>
      <Percent attr='somePercent'/>
    </ClickToEditForm>
    
    domNode = Th.domNode(component)
    
    it 'should not have rendered an edit button', ->
      $(domNode).find('button').length.should.equal 0

    it 'should not have rendered any inputs', ->
      $(domNode).find('input').length.should.equal 0
      
          

