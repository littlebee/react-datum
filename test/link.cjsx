React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'

Th = require './lib/testHelpers'
Link = require '../src/datums/link'


describe 'Link datum', ->
  model = new Backbone.Model({url: "http://www.zulily.com", name: "Zulily"})

  describe 'as display without props', ->
    # component = Th.render <Number attr='url' model={model}/>
    # $atag = $(Th.domNode(component)).find('a')
    # 
    # it 'should not have an input', -> Th.findByTag(component, 'input').length.should.equal(0)
    # 
    # it 'should have rendered an <a> tag', -> $atag.length.should.equal(1)
