React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'

Th = require './lib/testHelpers'


Datum = require '../src/datums/datum'  


describe 'Datum Display', ->          
  
  model = new Backbone.Model 
    name: "Fluffy"
    nullAttribute: null
    
  TEST_LABEL = 'stop labeling me'
  TEST_PLACEHOLDER_TEXT = "whatever it is you are looking for isn't here"
  TEST_TEXT_VALUE = 'Some important value'
  
  describe 'when rendered without props', ->
    datum = Th.render <Datum model={model} attr="name"/>
    datumNode = Th.domNode(datum)
  
    it 'should initially render in display mode with model name', ->
      Th.testDatumDisplay(datum, model.get('name'))
    
  describe 'when rendered with label', ->
    datum = Th.render <Datum model={model} attr="name" label={TEST_LABEL}/>
    datumNode = Th.domNode(datum)
  
    it 'should render display mode', ->
      Th.testDatumDisplay(datum, model.get('name'))
      
    it 'should not have rendered a label', ->
      datumNode.innerHTML.should.contain(TEST_LABEL) 
    
    
  describe 'when rendered with a placeholder and value', ->
    datum = Th.render <Datum model={model} attr="name" label={TEST_LABEL} placeholder={TEST_PLACEHOLDER_TEXT}/>
    datumNode = Th.domNode(datum)
  
    it 'should render display mode', ->
      Th.testDatumDisplay(datum, model.get('name'))

    it 'should have rendered a label', ->
      datumNode.innerHTML.should.contain(TEST_LABEL) 
      
    it 'should not be showing a placeholder', ->
      datumNode.innerHTML.should.not.contain(TEST_PLACEHOLDER_TEXT)

      
    
  describe 'when rendered with a placeholder and without a value', ->
    datum = Th.render <Datum model={model} attr="bogus" label={TEST_LABEL} placeholder={TEST_PLACEHOLDER_TEXT}/>
    datumNode = Th.domNode(datum)
  
    it 'should render display mode with placeholder text', ->
      Th.testDatumDisplay(datum, TEST_PLACEHOLDER_TEXT)

    it 'should not have rendered "undefined" or [object Object]', ->
      datumNode.innerHTML.should.not.contain("undefined")
      datumNode.innerHTML.should.not.contain("[object Object")
      
      
  describe 'when rendered with a placeholder and model attribute that returns null', ->
    datum = Th.render <Datum model={model} attr="nullAttribute" placeholder={TEST_PLACEHOLDER_TEXT}/>
    datumNode = Th.domNode(datum)
  
    it 'should render display mode with placeholder text', ->
      Th.testDatumDisplay(datum, TEST_PLACEHOLDER_TEXT)

    it 'should not have rendered "undefined" or [object Object]', ->
      datumNode.innerHTML.should.not.contain("undefined")
      datumNode.innerHTML.should.not.contain("[object Object")
      
      
  describe 'when rendered with a style property', ->
    style = {width: 9989, display: 'inline-block'}
    datum = Th.render <Datum model={model} attr="name" style={style}/>
    datumNode = Th.domNode(datum)
    
    it 'should have applied styles', ->
      datumNode.innerHTML.should.contain("width: 9989px")
      datumNode.innerHTML.should.contain("display: inline-block")
      
      
  describe 'when rendered asDiv', ->
    datum = Th.render <Datum model={model} attr="name" asDiv/>
    datumNode = Th.domNode(datum)
  
    it 'should render a div wrapper', ->
      datumNode.outerHTML.should.contain('div')
      
      
  describe 'when rendered with tooltip prop and no label', ->
    tooltipTestText = "An informative tooltip with useful help about this attribute being displayed"
    datum = Th.render <Datum model={model} attr="name" tooltip={tooltipTestText}/>
    datumNode = Th.domNode(datum)
  
    it 'should not have added any title attributes', ->
      $(datumNode).find('[title]').length.should.equal 0
      expect($(datumNode).attr('title')).to.not.exist
      

  describe 'when rendered with tooltip prop and a label', ->
    tooltipTestText = "An informative tooltip with useful help about this attribute being displayed"
    datum = Th.render <Datum model={model} attr="name" label="Kitten Name" tooltip={tooltipTestText}/>
    datumNode = Th.domNode(datum)
  
    it 'should not have a single title attribute within with supplied tooltip', ->
      $(datumNode).find("[title='#{tooltipTestText}']").length.should.equal 1
      
  
  describe 'when rendered with value prop without model and attr', ->
    datum = Th.render <Datum value={TEST_TEXT_VALUE}/>
    datumNode = Th.domNode(datum)
    it 'should have rendered the value provided via prop', ->
      datumNode.outerHTML.should.contain TEST_TEXT_VALUE
      
    
  describe 'when rendered with value prop without model and attr', ->
    datum = Th.render <Datum value={TEST_TEXT_VALUE}/>
    datumNode = Th.domNode(datum)
    it 'should have rendered the value provided via prop', ->
      datumNode.outerHTML.should.contain TEST_TEXT_VALUE
        
        
  describe 'when rendered with value prop with model and attr', ->
    datum = Th.render <Datum model={model} attr="name" value={TEST_TEXT_VALUE}/>
    datumNode = Th.domNode(datum)
    it 'should still have rendered the value provided via prop', ->
      datumNode.outerHTML.should.contain TEST_TEXT_VALUE
      datumNode.outerHTML.should.not.contain model.get('name')
      
      
  
      
  
  


  
