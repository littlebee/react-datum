
React = require 'react'
ReactDOM = require 'react-dom'
ReactTest = require 'react-addons-test-utils'
Backbone = require 'backbone'
_ = require 'underscore'
$ = require('jquery')

Th = require '../lib/testHelpers'

Model = require '../../src/model'
Form = require '../../src/form'
Text = require '../../src/datums/text'


KittenModel = require('../lib/kittenModel')

# needed to wrap the below in a div to get around stateless component not
simpleTestForm = (formProps={}) ->
  <Form {... formProps}>
    <Text attr='name'/>
  </Form>

# these specs are all run twice.  once with a model context, and once with
# a model prop.   In general, every thing should work with both.  
#
# the possible bugs that might get introduced would involve internal 
# (src/form.cjsx) access to props.model or context.model without going
# through getModel() method on Form.   
withAndWithoutModelContext = (component, model) ->
  it 'should have two buttons', ->
    expect(Th.findByClass(component, 'btn').length).to.equal(2)

  it 'should have one success button', ->
    expect(Th.findByClass(component, 'btn-success').length).to.equal(1)

  it 'should have one datum', ->
    expect(Th.findByClass(component, 'datum').length).to.equal(1)

  it 'should have one input', ->
    expect(Th.findByTag(component, 'input').length).to.equal(1)

  it 'should be displaying name from model', ->
    domNode = Th.domNodeByClass(component, 'datum')
    expect(domNode.innerHTML).to.contain(model.get('name'))


describe 'Form when rendering', ->
  describe "without model context", ->
    model = new KittenModel()
    component = Th.render(simpleTestForm({model: model}))

    withAndWithoutModelContext(component, model)

    it 'should not respond to model changes', ->
      model.set('name', 'Foofoo')
      domNode = Th.domNodeByClass(component, 'datum')
      expect(domNode.innerHTML).to.not.contain('Foofoo')


  describe "with model context", ->
    model = new KittenModel()
    component = Th.render(
      <Model model={model}>
        {simpleTestForm()}
      </Model>
    )
    withAndWithoutModelContext(component, model)

    # with a model context, we expect the name to rerender to reflect the change to the model
    it 'should respond to model changes', (done) ->
      model.set('name', 'Foofoo')
      # model rerender is debounced, so defer the test to pickup changes
      _.defer =>
        domNode = Th.domNodeByClass(component, 'datum')
        expect(domNode.innerHTML).to.contain('Foofoo')
        done()


  describe "without any props other than model", ->
    model = new KittenModel()
    component = Th.render(<div>{simpleTestForm(model: model)}</div>)
    formNode = Th.domNode(component).children[0]

    it 'form node should have form class', ->
      expect($(formNode).hasClass('form')).to.equal(true)


  describe "with readonly prop", ->
    model = new KittenModel()
    component = Th.render simpleTestForm(readyOnly: true)

    it 'should not have any inputs', ->
      expect(Th.findByTag(component, 'input').length).to.equal(0)


  describe "with className prop", ->
    model = new KittenModel()
    component = Th.render(<div>{simpleTestForm(model: model, className: 'test-form')}</div>)
    formNode = Th.domNode(component).children[0]
    #console.log formNode.outerHTML

    it 'form node should have test-form class', ->
      expect($(formNode).hasClass('test-form')).to.equal(true)

    it 'form node should also have form class', ->
      expect($(formNode).hasClass('form')).to.equal(true)
            
    it 'form node should also have edit class', ->
      expect($(formNode).hasClass('edit')).to.equal(true)
      
      
  describe "with buttonPosition='top' prop", ->
    model = new KittenModel()
    testForm = simpleTestForm(model: model, buttonPosition: "top")  
    component = Th.render(
      <div>{testForm}</div>
    )
    formNode = Th.domNode(component).children[0]
    #console.log formNode.outerHTML
    
    it 'should render buttons before content', ->
      $(formNode).find('.form-buttons').prev('.form-content').length.should.be.equal(0)
      
      
    
