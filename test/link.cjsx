React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'

Th = require './lib/testHelpers'

Model = require '../src/model'
Link = require '../src/datums/link'
Text = require '../src/datums/text'


describe 'Link datum', ->
  model = new Backbone.Model({url: "http://www.zulily.com", name: "Zulily"})

  describe 'as display without props', ->
    component = Th.render <Link attr='url' model={model}/>
    $atag = $(Th.domNode(component)).find('a')
    
    it 'should not have an input', -> Th.findByTag(component, 'input').length.should.equal(0)
    
    it 'should have rendered an <a> tag', -> $atag.length.should.equal(1)
    
    it 'should have rendered url enclosed in <a> tag', ->
      $atag.html().should.equal model.get('url')


  describe 'as display with nameAttr prop', ->
    component = Th.render <Link attr='url' nameAttr='name' model={model}/>
    $atag = $(Th.domNode(component)).find('a')
    
    it 'should have rendered name enclosed in <a> tag', ->
      $atag.length.should.equal(1)
      $atag.html().should.equal model.get('name')
      

  
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
  
  

