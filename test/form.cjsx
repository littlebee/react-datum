
React = require 'react'
ReactDOM = require 'react-dom'
ReactTest = require 'react-addons-test-utils'
Backbone = require 'backbone'
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
