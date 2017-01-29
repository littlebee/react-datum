React = require 'react'
Backbone = require 'backbone'
$ = require 'jquery'
_ = require 'underscore'

Th = require './lib/testHelpers'

LazyPhoto = require('../src/datums/lazyPhoto')
Options = require '../src/options'

TEST_IMG_URL = 'https://drpem3xzef3kf.cloudfront.net/photos/pets/32707403/1/?bust=1436666804&width=200&no_scale_up=1'
LOADING_URL = Options.get('LazyPhoto').loadingUrl
NOT_FOUND_URL = Options.get('LazyPhoto').notFoundUrl

model = null
component = null
$component = null

describe 'LazyPhoto datum', ->
  
  describe 'when rendered with valid imageUrl', ->
    
    beforeEach ->
      model = new Backbone.Model
        name: 'fluffy'
        # this might break in the future
        imgUrl: TEST_IMG_URL
      
      component = Th.render <LazyPhoto attr='imgUrl' model={model}/>
      $component = $(Th.domNode(component))
    
    it 'should have rendered an image', ->
      $component.find('img').length.should.eq 1
      
    it 'should initially have a src attribute of Options.LazyPhoto.loadingUrl', ->
      $component.find('img').attr('src').should.eq LOADING_URL
      
    it 'should load image post render', () ->
      # jsDOM doesn't load images so the initial image will never load, fake it
      component.onLoad()  
      $component.find('img').attr('src').should.eq TEST_IMG_URL
      
    it 'when model attr changed to bogus image url, initially load loadingUrl and then notFoundUrl', ->
      $component.find('img').attr('src').should.eq LOADING_URL
      component.onLoad()  
      $component.find('img').attr('src').should.eq TEST_IMG_URL
      
      model.set imgUrl: 'http://bogusSite/bogusImage.jpg'
      component.forceUpdate()
      $component.find('img').attr('src').should.eq LOADING_URL, "should have reset the src to #{LOADING_URL}"
      
      # jsDOM doesn't load images so the initial image will never get loaded or get an error, fake it
      component.onLoad()  
      component.onError()
      $component.find('img').attr('src').should.eq NOT_FOUND_URL
      

  describe 'when rendered without an imageUrl', ->
    beforeEach ->
      model = new Backbone.Model
        name: 'fluffy'
      component = Th.render <LazyPhoto attr='imgUrl' model={model}/>
      component.onLoad()
      $component = $(Th.domNode(component))
    
    it 'should have rendered an image with Options.LazyPhoto.notFoundUrl', ->
      $component.find('img').length.should.eq 1
      $component.find('img').attr('src').should.eq NOT_FOUND_URL
    
    
  describe 'when rendered with a unfound imageUrl', ->
    beforeEach ->
      model = new Backbone.Model
        name: 'fluffy'
        imgUrl: 'initial/not/found/imageUrl.jpeg'
    
    it 'should have rendered an image with Options.LazyPhoto.notFoundUrl', ->
      component = Th.render <LazyPhoto attr='imgUrl' model={model}/>
      component.onLoad()
      component.onError()
      
      $component = $(Th.domNode(component))
      $component.find('img').length.should.eq 1
      $component.find('img').attr('src').should.eq NOT_FOUND_URL

    it 'should change notFoundUrl in response to Options.set', ->
      newNotFoundUrl = '/someBogusUri/bogusNotFoundImage.jpeg'
      newLoadingUrl = '/someBogusUri/bogusLoadingImage.jpeg'
      
      Options.set
        LazyPhoto: 
          notFoundUrl: newNotFoundUrl
          loadingUrl: newLoadingUrl
      
      component = Th.render <LazyPhoto attr='imgUrl' model={model}/>
      $component = $(Th.domNode(component))

      $component.find('img').attr('src').should.eq newLoadingUrl
      component.onLoad()
      component.onError()
      $component.find('img').attr('src').should.eq newNotFoundUrl
      
    
      
    
    
