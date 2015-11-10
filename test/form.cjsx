
React = require 'react'
ReactDOM = require 'react-dom'
ReactTest = require 'react-addons-test-utils'
Backbone = require 'backbone'
_ = require 'underscore'
$ = require('jquery')

Th = require './lib/testHelpers'

Model = require '../src/Model'
Form = require '../src/form'
Text = require '../src/text'


KittenModel = require('./lib/kittenModel')

simpleTestForm = (formProps={}) ->
  <Form {... formProps}>
    <Text attr='name'/>
  </Form>

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


describe 'Form', ->
  describe "without model context", ->
    model = new KittenModel()
    component = Th.render(simpleTestForm({model: model}))

    withAndWithoutModelContext(component, model)

    it 'should not respond to model changes', ->
      debugger
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
    it 'should respond to model changes', ->
      debugger
      model.set('name', 'Foofoo')
      domNode = Th.domNodeByClass(component, 'datum')
      expect(domNode.innerHTML).to.contain('Foofoo')
