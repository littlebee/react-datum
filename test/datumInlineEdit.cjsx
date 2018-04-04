React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'

Th = require './lib/testHelpers'

Model = require '../src/model'
Datum = require '../src/datums/datum'  
Label = require '../src/datums/label'

model = new Backbone.Model 
  name: "Whiskers"
  description: 'adorable little kitten'
  
TEST_LABEL = 'something different'
TEST_PLACEHOLDER_TEXT = "more different then display test placeholder text"
TEST_VALUE = "something different every day"

TestForm = ->
  <Model {... arguments}>
    <Label ref='label'>This is a non editable element such as the user might click on</Label>
    <Datum attr="name" ref='datum' inputMode="inlineEdit"/>
    <Datum attr="description" ref='otherDatum' inputMode="inlineEdit"/>
  </Model>


describe 'Datum inlineEdit', ->          
  
  describe 'when rendered with inputMode="inlineEdit"', ->
    testComponent = null
    testComponentNode = null
    datum = null
    datumNode = null
    otherDatum = null
    otherDatumNode = null
    
    beforeEach ->
      testComponent = Th.render <TestForm model={model}/>
      testComponentNode = Th.domNode(testComponent)
      datum = testComponent.refs.datum
      datumNode = Th.domNode(datum)
      otherDatum = testComponent.refs.otherDatum
      otherDatumNode = Th.domNode(otherDatum)
      
    it 'should have initially rendered as display mode (no input)', ->
      Th.testDatumDisplay(datum, model.get('name'))
      
    describe 'and then clicked', ->
      beforeEach ->
        Th.Simulate.click $(datumNode).find('.datum-display-value')[0]
      
      it 'should now be in edit mode', ->
        Th.testDatumInput datum, model.get('name')


      describe 'and then click outside of any inlineEdit datums', ->
        beforeEach ->
          datum.onDocumentClick({target: testComponent.refs.label})

        it 'both datums should be in display mode', ->
          Th.testDatumDisplay datum, model.get('name')
          Th.testDatumDisplay otherDatum, model.get('description')
        
        
      describe 'and then click another', ->
        beforeEach ->
          Th.Simulate.click $(otherDatumNode).find('.datum-display-value')[0]
          
        it 'the first datum should be in display and the second in edit mode', ->
          Th.testDatumDisplay datum, model.get('name')
          Th.testDatumInput otherDatum, model.get('description')
      



