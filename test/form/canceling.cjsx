React = require 'react'
ReactDOM = require 'react-dom'

$ = require 'jquery'

Th = require '../lib/testHelpers'

Form = require '../../src/form'
Text = require '../../src/datums/text'

KittenModel = require('../lib/kittenModel')

class TestForm extends React.Component
  render: ->
    <Form {... @props} ref='form'>
      <Text attr='name' ref='datum'/>
    </Form>

  
NEW_NAME = "Foo Foo"

describe 'Form when canceling', ->
  model = new KittenModel()
  testForm = Th.render <TestForm model={model}/>
  form = testForm.refs.form
  datum = testForm.refs.datum
  originalName = model.get('name')

  it 'should initially render original name', ->
    Th.domNode(datum).innerHTML.should.contain(originalName)
    
    
  describe 'after changing name', ->
    inputNode = null
    
    before ->
      inputNode = Th.changeDatumValue datum, NEW_NAME
    
    it 'should be showing new name', -> 
      inputNode.value.should.equal(NEW_NAME)
    
    it 'should have set model value to new name', -> 
      model.get('name').should.be.equal(NEW_NAME)
      
      
    describe 'and then canceling', ->
      before ->
        Th.Simulate.click form.refs.cancelButton
      
      it 'should be showing original name', -> 
        inputNode.value.should.equal(originalName)
      
      it 'should have set model value to original name', ->
        model.get('name').should.be.equal(originalName)
      
      
      
    
    
    
  
