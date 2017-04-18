React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'
_ = require 'underscore'

Th = require './lib/testHelpers'

Model = require '../src/model'
Link = require '../src/datums/link'
Text = require '../src/datums/text'

chai.use(require('chai-string'))


model = new Backbone.Model({
  url: "http://www.zulily.com"
  name: "Zulily"
  reallyLongName: "Zulily, something special every day and then some, Mom.  And then some."
})


renderComponent = (props={}) ->
  props = _.defaults props,
    attr: 'url'
    nameAttr: 'name'
    model: model

  component = Th.render <Link {... props}/>
  $atag = $(Th.domNode(component)).find('a')
  return [component, $atag]
  

describe 'Link datum', ->

  describe 'as display without props', ->
    component = Th.render <Link attr='url' model={model}/>
    $atag = $(Th.domNode(component)).find('a')
    
    it 'should not have an input', -> Th.findByTag(component, 'input').length.should.equal(0)
    
    it 'should have rendered an <a> tag', -> $atag.length.should.equal(1)
    
    it 'should have rendered url enclosed in <a> tag without https://', ->
      value = model.get('url')
      if value.indexOf('://') >= 3
        index = value.indexOf('://')+3
        value = value.slice(index)
      $atag.html().should.equal value



  describe 'as display with nameAttr prop', ->
    [component, $atag] = renderComponent()
    
    it 'should have rendered name enclosed in <a> tag', ->
      $atag.length.should.equal(1)
      $atag.html().should.equal model.get('name')
      

  describe 'as display with really really long name', ->

    it 'should ellipsize at 35 by default', ->
      [component, $atag] = renderComponent(nameAttr: 'reallyLongName')
      $atag.text().should.endWith '...'
      $atag.text().length.should.equal(35)

    it 'should respect ellipsizeAt=55 prop', ->
      [component, $atag] = renderComponent(nameAttr: 'reallyLongName', ellipsizeAt: 55)
      $atag.text().should.endWith '...'
      $atag.text().length.should.equal(55)

    it 'should respect ellipsizeAt=false prop', ->
      [component, $atag] = renderComponent(nameAttr: 'reallyLongName', ellipsizeAt: false)
      $atag.text().should.not.endWith '...'
      $atag.text().length.should.equal(model.get('reallyLongName').length)
      

  
  renderComponentWithSimpleChildren = (model, addProps={}) ->
    component = Th.render(
      <Link attr='url' model={model} {... addProps}>
        I haz a child with <span>a span</span>
      </Link>
    )
    $atag = $(Th.domNode(component)).find('a')
    return [component, $atag]


  describe 'as display with nameAttr prop and children', ->
    [component, $atag] = renderComponentWithSimpleChildren(model, {nameAttr: "name"})

    it 'should still have rendered name enclosed in <a> tag because prop has precedence', ->
      $atag.length.should.equal(1)
      $atag.html().should.equal model.get('name')
  
  
  describe 'as display with only children', ->
    [component, $atag] = renderComponentWithSimpleChildren(model)
    simpleChildTest = "I haz a child"

    it 'should have rendered children if no nameAttr prop', ->
      $atag.length.should.equal(1)
      $atag.html().should.contain simpleChildTest


  renderComponentWithCompositeChildren = (model, addProps={}) ->
    component = Th.render(
      <Model model={model}>
        <Link attr='url' {... addProps}>
          Shop at <Text attr='name'/> now!
        </Link>
      </Model>
    )
    $atag = $(Th.domNode(component)).find('a')
    return [component, $atag]


  describe 'as display with composite children', ->
    [component, $atag] = renderComponentWithCompositeChildren(model)
    $datum = $atag.find('.datum')
    
    it 'should have rendered text in children', -> $atag.html().should.contain "Shop at"
    
    it 'should have rendered a datum', -> $datum.length.should.equal 1
      
    it 'should have rendered name from model in datum', ->  
      $datum.html().should.contain model.get('name')
  
  

