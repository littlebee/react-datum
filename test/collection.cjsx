React = require 'react'
Backbone = require 'backbone'
sinon = require 'sinon'

Th = require './lib/testHelpers'

Collection = require '../src/collection'

testCollection = new Backbone.Collection([
    {id: 1, name: "Bob"}
    {id: 1, name: "Fred"}
    {id: 1, name: "Sam"}
])

describe "Collection", ->
  
  describe "when fetching", ->
    fetchStub = null
    component = null
    
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
      
    