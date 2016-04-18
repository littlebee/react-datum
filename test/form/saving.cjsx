React = require 'react'
ReactDOM = require 'react-dom'
ReactTest = require 'react-addons-test-utils'
$ = require 'jquery'

Th = require '../lib/testHelpers'

Form = require '../../src/form'
Text = require '../../src/datums/text'

KittenModel = require('../lib/kittenModel')

formWithValidations = (formProps={}) ->
  <Form {... formProps}>
    <Text attr='name' required/>
  </Form>


describe 'Form when saving', ->
  model = new KittenModel()
  component = Th.render(formWithValidations({model: model}))

  describe 'without validation failures', ->
    
    describe 'when Form.save is called', ->
      saveStub = null 
      
      beforeEach ->
        saveStub = sinon.stub(model, "save").yieldsTo("success", [model, "Success"])
        
      it 'should call model.save', ->
        component.save()
        saveStub.should.have.been.called

      afterEach ->
        model.save.restore()
      

    describe "when user clicks save button", ->
      saveStub = null
      
      before ->
        saveStub = sinon.stub(model, "save").yieldsTo("success", [model, "Success"])
        Th.Simulate.click(component.refs.saveButton)
      
      it 'should call model.save', ->   
        saveStub.should.have.been.called
      
      it 'should show a indication of success', ->
        Th.findByClass(component, 'datum-form-message-success').length.should.equal(1)
        
      it 'should not be showing an error message', ->
        Th.findByClass(component, 'datum-form-message-error').length.should.equal( 
          0, "Unexpected error saving form: " + $(Th.domNode(component)).find('.datum-form-message-error').text()
        )
    
    after ->
      model.save.restore()
      
      

  describe 'with validation failures', ->
    saveStub = null 
    
    before ->
      model.set('name', '')
      component.forceUpdate()
    
    beforeEach ->
      saveStub = sinon.stub(model, "save").yieldsTo("success", [model, "Success"])
      
    it 'when Form.save is called, should not call model.save', ->
      component.save()
      saveStub.should.not.have.been.called
      
    it 'when user clicks save button, should not call model.save ', ->   
      Th.Simulate.click(component.refs.saveButton)
      saveStub.should.not.have.been.called
      
    it 'should not show a indication of success', ->
      Th.findByClass(component, 'datum-form-message-success').length.should.equal(0)
        
    it 'should be showing an error message', ->
      #Th.dumpHtml(component)
      Th.findByClass(component, 'datum-form-message-error').length.should.equal(1)
    
      
    afterEach ->
      model.save.restore()
  
  
describe "Form when saving with modelSaveMethod:'patch' prop", ->
  model = new KittenModel()
  model.patch = -> return true;   # stub for custom method
  
  component = Th.render(formWithValidations({model: model, modelSaveMethod: 'patch'}))

  describe 'when Form.save is called', ->
    saveStub = null 
    patchStub = null
    
    beforeEach ->
      saveStub = sinon.stub(model, "save").yieldsTo("success", [model, "Success"])
      patchStub = sinon.stub(model, "patch").yieldsTo("success", [model, "Success"])
      component.save()
      
    it 'should have called model.patch', ->
      patchStub.should.have.been.called

    it 'should not have called model.save', ->
      saveStub.should.not.have.been.called

    afterEach ->
      model.save.restore()
      model.patch.restore()


