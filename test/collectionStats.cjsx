React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery' 

Th = require './lib/testHelpers'

CollectionStats = require '../src/collectionStats'
SelectableCollection = require('selectable-collection')

testData = [
  {id: 1, name: "Bob"}
  {id: 2, name: "Fred"}
  {id: 3, name: "Sam"}
]

describe "Collection Stats", ->
  
  describe "when rendering with a regular collection", ->

    testCollection = new Backbone.Collection(testData)
    component = Th.render <CollectionStats collection={testCollection}/>
    
    it "should should show 3 total results", ->
      $(Th.domNode(component)).find('.found.stats .count').text().should.equal("3")
    
  
  describe "when rendering with a selectable collection", ->
    
    testCollection = new Backbone.Collection(testData)
    SelectableCollection.applyTo(testCollection)
    testCollection.selectModelByIndex(2)
    
    component = Th.render <CollectionStats collection={testCollection}/>
    $component = $(Th.domNode(component))
    it "should should still show 3 total results", ->
      $component.find('.found.stats .count').text().should.equal("3")
      
    it "should should show 1 selected results", ->
      $component.find('.selected.stats .count').text().should.equal("1")
      
    
  describe "when rendering with a collection exposes topDisplayIndex and bottomDisplayIndex", ->
    
    testCollection = new Backbone.Collection(testData)
    testCollection.topDisplayIndex = 2
    testCollection.bottomDisplayIndex = 5
    
    component = Th.render <CollectionStats collection={testCollection}/>
    $component = $(Th.domNode(component))
    
    it "should should still show 3 total results", ->
      $component.find('.found.stats .count').text().should.equal("3")
      
    it "should should show viewing 2 - 5 selected results", ->
      $component.find('.viewing.stats .top-index').text().should.equal("2")
      $component.find('.viewing.stats .bottom-index').text().should.equal("5")
      
    
    
    
    