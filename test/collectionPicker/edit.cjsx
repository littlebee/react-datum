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

testBasicCollectionPickerRender = (component, model) ->
  domNode = Th.domNode(component)
  reactSelect = component.refs.reactSelect
  it 'should render a react-select component', ->
    Th.findByClass(component, "Select").length.should.be.equal(1)
    Th.findByTag(component, "input").length.should.be.equal(1)
    expect(reactSelect).to.exist
    
  it 'should show current model value', ->
    $valueLabels = $(domNode).find('.Select-value-label')
    $valueLabels.length.should.equal(1)
    $valueLabels.text().should.equal(nameCollection.get(model.get('nameId')).get('name'))
  
  describe 'when clicked', ->
    before ->
      simulateClick(component)
      #Th.dumpHtml(component)
    
    it 'should initially show all values from collection when clicked', ->
      $(domNode).find('.Select-option').length.should.equal(nameCollection.length, 
        "expected as many .Select-option elements as collection models")
      

describe 'CollectionPicker inputMode="edit" as single select', ->
  model = new Backbone.Model({nameId: 11})
  component = Th.render <CollectionPicker attr='nameId' displayAttr="name" model={model} collection={nameCollection} inputMode='edit'/>
  testBasicCollectionPickerRender(component, model)


# TODO: Find a way to differentiate the rendering of Select vs Select.Async. They seem to render exactly the same in DOM
describe 'CollectionPicker uses Select instead of Select.Async when synchronousLoading=true', ->
  model = new Backbone.Model({nameId: 11})
  component = Th.render <CollectionPicker attr='nameId' displayAttr="name" model={model} synchronousLoading={true} collection={nameCollection} inputMode='edit'/>
  testBasicCollectionPickerRender(component, model)


describe 'CollectionPicker clear value should clear the value and set it to null', ->
  model = new Backbone.Model({nameId: 11})
  component = Th.render <CollectionPicker clearable={true} attr='nameId' displayAttr="name" model={model}
                                          synchronousLoading={true} collection={nameCollection} inputMode='edit'/>
  testBasicCollectionPickerRender(component, model)

  domNode = Th.domNode(component)

  describe 'when cleared', ->
    before ->
      Th.Simulate.mouseDown(domNode.querySelector('.Select-clear-zone'))

    it 'should show no label values', ->
      $valueLabels = $(domNode).find('.Select-value-label')
      $valueLabels.length.should.equal(0)



describe 'CollectionPicker should show label value when option selected and when model is not provided to collection picker', ->
  model = new Backbone.Model({nameId: 11})
  component = Th.render <CollectionPicker clearable={true} attr='nameId' displayAttr="name"
                                          synchronousLoading={true} collection={nameCollection} inputMode='edit'/>

  domNode = Th.domNode(component)

  describe 'when opened', ->
    before ->
      simulateClick(component)
      Th.Simulate.mouseDown(domNode.querySelector('.Select-menu .Select-option:first-child'))

    it 'should initially show all values from collection when clicked', ->
      $valueLabels = $(domNode).find('.Select-value-label')
      $valueLabels.length.should.equal(1)