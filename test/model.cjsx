React = require 'react'
Backbone = require 'backbone'
_ = require 'underscore'
$ = require 'jquery'
sinon = require 'sinon'

Th = require './lib/testHelpers'

Model = require '../src/model'

newTestModel = ->
  return new Backbone.Model 
    id: 1
    name: 'fluffy'

describe 'Model', ->
  
  describe 'when rendered with model prop', ->
    model = newTestModel()
    updateStub = null
    component = null
    $component = null
    
    before ->
      updateStub = sinon.stub Model.prototype, 'update'
      component = Th.render <Model model={model}>
        <h3>Something here</h3>
      </Model>
      $component = $(Th.domNode(component))
    
    after ->
      updateStub.restore()
      
    it 'should have rendered children', ->
      $component.find('h3').length.should.equal 1
    
    it 'should update when model triggers sync', (done) ->
      model.trigger 'sync'
      _.defer ->
        # updateCallCount.should.equal 1, "expected update() to be called on component"
        assert updateStub.calledOnce, "expected update() to be called on component"
        done()

      
  describe 'when rendered with forceUpdate prop', ->
    model = newTestModel()
    updateStub = sinon.stub Model.prototype, 'forceUpdate'
    component = Th.render <Model model={model} forceUpdate>
      <h3>Something here</h3>
    </Model>
    $component = $(Th.domNode(component))
    
    after ->
      updateStub.restore()
      
    it 'should force update when model triggers sync', (done) ->
      model.trigger 'sync'
      _.defer ->
        assert updateStub.calledOnce, "expected forceUpdate() to be called on component"
        done()

      