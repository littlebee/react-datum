
React = require 'react'
ReactDOM = require 'react-dom'
ReactTest = require 'react-addons-test-utils'
Backbone = require 'backbone'
$ = require('jquery')
Th = require './lib/testHelpers'

Model = require '../src/Model'
Form = require '../src/form'
Text = require '../src/text'


kittenModel = require('./lib/kittenModel')
simpleTestForm = (
  <Model model={kittenModel}>
    <Form>
      <Text attr='name'/>
    </Form>
  </Model>
)

describe 'Form', ->
  component = null
  buttons = null

  before ->
    component = Th.render(simpleTestForm)

  it 'should have two buttons', ->
    expect(Th.findByClass(component, 'btn').length).to.equal(2)

  it 'should have one success button', ->
    expect(Th.findByClass(component, 'btn-success').length).to.equal(1)

  it 'should have one datum', ->
    expect(Th.findByClass(component, 'datum').length).to.equal(1)

  it 'should not have one input', ->
    expect(Th.findByTag(component, 'input').length).to.equal(1)

  it 'should be displaying name from model', ->
    c = Th.findByClass(component, 'datum')
    domNode = ReactDOM.findDOMNode(c[0])
    #console.log $(domNode).html()
    expect($(domNode).html()).to.contain(kittenModel.get('name'))

  it 'should have one input', ->
    expect(Th.findByTag(component, 'input').length).to.equal(1)
