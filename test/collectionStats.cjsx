React = require 'react'
Backbone = require 'backbone'
sinon = require 'sinon'

Th = require './lib/testHelpers'

CollectionStats = require '../src/collectionStats'

testCollection = new Backbone.Collection([
    {id: 1, name: "Bob"}
    {id: 1, name: "Fred"}
    {id: 1, name: "Sam"}
])

describe "Collection Stats", ->
  
  describe "when rendering", ->
    it "should should show 3 total results", ->
      component = Th.render <CollectionStats collection={testCollection}/>
      false.should.equal(true, "TODO: make this test work")
    