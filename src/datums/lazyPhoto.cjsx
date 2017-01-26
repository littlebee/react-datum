
React = require('react')
Datum = require('./datum')
Options = require('../options')


###
  This is a lazy loading image.

  To prevent a page heavily loaded with images preventing other content from loading, a small
  blank image is downloaded and rendered first and then onLoad the real image src is used and
  rerender.

  On error a notFoundUrl is set as the image src to prevent broken image display.

  The model attribute specified in @props.attr should return a fully qualified
  url.  The image is only rendered if it's visible and in view. Otherwise the placeholder
  image is rendered.
###
module.exports = class LazyPhoto extends Datum
  @displayName: "react-datum.LazyPhoto"

  # ...and again the promise of webpack falls short of the reality
  # This works great for bundling, but when you require the react-datum npm package
  # for server side use, it chokes on these
  #notFoundUrl: require("../../img/petals.png")
  #loadingUrl: require("../../img/blank.jpg")
  notFoundUrl: Options.get('LazyPhoto').notFoundUrl 
  loadingUrl: Options.get('LazyPhoto').loadingUrl 
  
  subClassName: 'lazy-image'

  # these are updated as events are fired
  notFound: false
  initialLoadComplete: false

  isEditable: -> false

  # override
  renderForDisplay: () ->
    modelValue = @getModelValue()
    if !modelValue || modelValue != @lastModelValue
      @notFound = @initialLoadComplete = !(modelValue?.length > 0)
      @lastModelValue = modelValue
    
    source = switch
      when @notFound then @notFoundUrl
      when @initialLoadComplete then modelValue
      else @loadingUrl

    <img src={source}
         onLoad={@onLoad}
         onError={@onError}
    />


  onLoad: (evt) =>
    return if @initialLoadComplete
    # TODO : should this be state?
    @initialLoadComplete = true
    @forceUpdate()


  onError: (evt) =>
    return unless @initialLoadComplete # ignore error on initial load of blank image
    return if @notFound   # of if already noted
    @notFound = true
    @forceUpdate()
