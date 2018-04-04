React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'

Th = require './lib/testHelpers'


Text = require '../src/datums/text'  
Number = require '../src/datums/number'  
Model = require '../src/model'  

class TestModel extends Backbone.Model
  
  @metadata: 
    firstName:
      label: "First Name"
      tooltip: "The first name of the person"
    lastName:
      label: "Last Name",
      tooltip: "This is the user's legal last name or family name"
      placeholder: "no last name (sorta like Madonna)"
    age:
      minValue: 1
      maxValue: 199
      
  getDatumMetadata: (prop, datum) ->
    return @constructor.metadata[datum.props.attr]?[prop]
    
  
  

describe 'Datum Metadata', ->          
  
  describe 'when rendered with partial props', ->
    testModel = new TestModel
      firstName: "Madonna"
      age: 55
    
    testTooltip = "Note that some people dont have last names"
    
    class Component extends React.Component
      render: ->
        <Model model={testModel}>
          <Text attr="firstName" label={null}/>
          <Text attr="lastName" tooltip={testTooltip}/>
          <Number attr="age" ref="number" inputMode='edit'/>
        </Model>
        
    component = Th.render(<Component/>)
    testDom = Th.domNode(component)
    $test = $(testDom)
  
    it 'should not render the metadata label if prop provided for label is null', ->
      $test.find(".datum[data-zattr='firstName'] label").length.should.be.equal 0
      
    it 'should have rendered the metadata label for component with no label prop', ->
      $test.find(".datum[data-zattr='lastName'] label").length.should.be.equal 1
      
    it 'should have have only rendered a tooltip for the component with a label', ->
      $test.find("[title]").length.should.be.equal 1
      $test.find(".datum[data-zattr='lastName'] [title]").length.should.be.equal 1
      
    it 'should have rendered the tooltip specified via prop for lastName', ->
      $test.find("[data-zattr='lastName']").find("[title='#{testTooltip}']").length.should.equal 1
      
    it 'should have rendered the metadata placeholder for lastName', ->
      $test.find("[data-zattr='lastName']").find('.placeholder').text().should.equal TestModel.metadata['lastName']['placeholder']
      
    it 'should have applied minValue and maxValue from metadata to Number datum', ->
      Th.changeDatumAndTestValid(component.refs.number, 1, true)
      Th.changeDatumAndTestValid(component.refs.number, -20, false)
      Th.changeDatumAndTestValid(component.refs.number, 200, false)
      
    
      
