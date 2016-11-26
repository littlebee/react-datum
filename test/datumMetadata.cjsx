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
      placeholder: "no last name (sorta like Madonna)"
    age:
      tooltip: "Age entered must be above 0 and less than 200"
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
    
    Component = React.createClass
      render: ->
        <Model model={testModel}>
          <Text attr="firstName"/>
          <Text attr="lastName" tooltip={testTooltip}/>
          <Number attr="age" ref="number" inputMode='edit'/>
        </Model>
    component = Th.render(<Component/>)
    testDom = Th.domNode(component)
    $test = $(testDom)
  
    it 'should have rendered a label for two of the datums', ->
      $test.find('label').length.should.equal 2
      
    it 'should have rendered a tooltip for two of the datums', ->
      $test.find('[title]').length.should.equal 2
      
    it 'should have rendered the metadata tooltip for firstName', ->
      $test.find("[data-zattr='firstName']").attr('title').should.equal TestModel.metadata['firstName']['tooltip']
      
    it 'should have rendered the tooltip specified via prop for lastName', ->
      $test.find("[data-zattr='lastName']").attr('title').should.equal testTooltip
      
    it 'should have rendered the metadata placeholder for lastName', ->
      $test.find("[data-zattr='lastName']").find('.placeholder').text().should.equal TestModel.metadata['lastName']['placeholder']
      
    it 'should have applied minValue and maxValue from metadata to Number datum', ->
      Th.changeDatumAndTestValid(component.refs.number, 1, true)
      Th.changeDatumAndTestValid(component.refs.number, -20, false)
      Th.changeDatumAndTestValid(component.refs.number, 200, false)
      
    
      
