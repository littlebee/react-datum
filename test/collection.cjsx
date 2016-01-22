React = require 'react'
Backbone = require 'backbone'
_ = require 'underscore'
sinon = require 'sinon'

Th = require './lib/testHelpers'

Collection = require '../src/collection'

newTestCollection = ->
  return new Backbone.Collection [
      {id: 1, name: "Fluffy"}
      {id: 2, name: "Siam"}
      {id: 3, name: "Licorice"}
      {id: 4, name: "Figgy"}
      {id: 5, name: "Rob Roy"}
  ]

describe "Collection", ->
  
  describe "when fetching", ->
    testCollection = newTestCollection()
    
    it "should not fetch if not asked", ->
      fetchStub = sinon.stub(testCollection, 'fetch').returns(true)
      component = Th.render <Collection collection={testCollection}/>
      testCollection.fetch.restore()
      fetchStub.should.not.have.been.called

    it "should fetch if asked nicely", ->
      fetchStub = sinon.stub(testCollection, 'fetch').returns(true)
      component = Th.render <Collection collection={testCollection} fetch={true}/>
      testCollection.fetch.restore()
      fetchStub.should.have.been.called

    it "should passthrough className to element", ->
      component = Th.render <Collection collection={testCollection} className="haz multipols"/>
      domNode = Th.domNode(component)
      $(domNode).attr("class").should.be.equal('contextual-data collection haz multipols')
    
  describe "when selecting models, Backbone collection", ->
    testCollection = null
    component = null
    beforeEach ->
      testCollection = newTestCollection()
      component = Th.render <Collection collection={testCollection}/>
      
    it "should have mixed in collection selection tracking methods", ->
      for method in ['getSelectedModels', 'selectModel', 'selectModelById', 'selectNone']
        testCollection.should.respondTo(method, "expected collection to have #{method} method")  
    
    it "should initially have no models selected", ->
      testCollection.getSelectedModels().length.should.equal(0)
    
    it "should have one model selected after one selectModel", ->
      testCollection.selectModelByIndex(1)
      testCollection.getSelectedModels().length.should.equal(1)
      
    it "should have two models selected after second selectedModel", ->
      testCollection.selectModelByIndex(1)
      testCollection.selectModelByIndex(2)
      testCollection.getSelectedModels().length.should.equal(2)
      
    it "should have selected the correct models by index", ->
      testCollection.selectModelByIndex(1)
      testCollection.selectModelByIndex(2)
      expectedModels = testCollection.models.slice(1, 3)
      expectedModels.should.have.members testCollection.getSelectedModels()
      
      
    it "should have no models selected after selectNone()", ->
      testCollection.selectNone()
      testCollection.getSelectedModels().length.should.equal(0)

    it "should add .selected to models selected", ->
      testCollection.selectModelByIndex(1)
      testCollection.selectModelByIndex(2)
      for model in testCollection.getSelectedModels()
        (model.selected?).should.equal(true, "from getSelectedModels()")
      
      _.filter( 
        testCollection.models, (m) -> m.selected
      ).length.should.equal(2, "should have found two models with selected property")
    
      
      
      