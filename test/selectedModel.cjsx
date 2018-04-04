React = require 'react'


Backbone = require 'backbone'
$ = require 'jquery'
_ = require 'underscore'
sinon = require 'sinon'

Th = require './lib/testHelpers'

Collection = require '../src/collection'
SelectedModel = require '../src/selectedModel'
Text = require '../src/datums/text'

describe "SelectedModel", ->
  
  testCollection = new Backbone.Collection [
    {id: 1, name: "Sam"}
    {id: 2, name: "Miss Kitty"}
    {id: 3, name: "Mitzy"}
    {id: 4, name: "Bob"}
    {id: 5, name: "Tommy"}
  ]

  collectionComponent = Th.render(
    <Collection collection={testCollection}>
      <SelectedModel placeholder="Select a Model">
        <Text attr="name"/>
      </SelectedModel>
    </Collection>
  )
  collectionNode = Th.domNode(collectionComponent)  

  describe "without selected model", ->

    it "should be showing a placeholder", ->
      node = Th.domNodeByClass collectionComponent, "large-placeholder"
      expect(node).to.exist    
      
      
  describe "after selecting a model", ->
    before ->
      testCollection.selectModelByIndex(3)

    it "should not be showing a placeholder", ->
      node = Th.domNodeByClass collectionComponent, "large-placeholder"
      expect(node).to.not.exist    
      
  
      
    
    
  
  
  
  
  