React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'

Th = require './lib/testHelpers'

Email = require('../src/datums/email')

describe 'Email datum', ->
  model = new Backbone.Model({email: "bob@zulily.com", name: "Some Random Bob"})
  
  it 'should invalidate bad email', ->
    badResponse = Email::validateEmail('bad_email')
    expect(badResponse).to.be.a("string").and.to.match(/invalid/gi)

  it 'should validate true if good email', ->
    expect(Email::validateEmail('firstname.lastname@example.me')).to.be(true)

  it 'should not render as link unless asked', ->
    component = Th.render <Email attr='email' model={model}/>
    $(Th.domNode(component)).find('a').length.should.equal(0)
    
  it 'should render as link if asked nicely', ->
    component = Th.render <Email attr='email' model={model} displayAsLink/>
    console.log $(Th.domNode(component)).html()
    $(Th.domNode(component)).find('a').length.should.equal(1)
    