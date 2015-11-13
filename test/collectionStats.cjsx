React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery' 

Th = require './lib/testHelpers'

CollectionStats = require '../src/collectionStats'

testCollection = new Backbone.Collection([
    {id: 1, name: "Bob"}
    {id: 2, name: "Fred"}
    {id: 3, name: "Sam"}
])

describe "Collection Stats", ->
  
  describe "when rendering", ->
    component = Th.render <CollectionStats collection={testCollection}/>
    
    it "should should show 3 total results", ->
      $(Th.domNode(component)).find('.found.stats .count').text().should.equal("3")
    