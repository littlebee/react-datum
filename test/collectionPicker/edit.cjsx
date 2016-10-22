React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'
_ = require 'underscore'

Th = require '../lib/testHelpers'

Select = require('react-select/src/Select')
Select.Async = require('react-select/src/Async')

CollectionPicker = require '../../src/datums/collectionPicker/collectionPicker'

NameCollection = require('../lib/nameCollection')
nameCollection = new NameCollection()

simulateClick = (component) ->
  domNode = Th.domNode(component)
  Th.Simulate.focus(domNode.querySelector('.Select-input input'))
  Th.Simulate.mouseDown(domNode.querySelector('.Select-control'))


describe 'CollectionPicker inputMode="edit" as single select', ->
  model = new Backbone.Model({nameId: 11})
  component = Th.render <CollectionPicker attr='nameId' displayAttr="name" model={model} collection={nameCollection} inputMode='edit'/>
  domNode = Th.domNode(component)
  reactSelect = component.refs.reactSelect
  it 'should render a react-select component', ->
    Th.findByClass(component, "Select").length.should.be.equal(1)
    Th.findByTag(component, "input").length.should.be.equal(1)
    expect(reactSelect).to.exist
    
  it 'should show current model value', ->
    $valueLabels = $(domNode).find('.Select-value-label')
    $valueLabels.length.should.equal(1)
    $valueLabels.text().should.equal(nameCollection.get(11).get('name'))
  
  describe 'when clicked', ->
    before ->
      simulateClick(component)
      #Th.dumpHtml(component)
    
    it 'should initially show all values from collection when clicked', ->
      $(domNode).find('.Select-option').length.should.equal(nameCollection.length, 
        "expected as many .Select-option elements as collection models")
      
    
    
  
