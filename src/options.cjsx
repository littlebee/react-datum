_ = require('underscore')

# use ReactDatum.Options.set and .get to access please
__options = {
  # use global ReactBootstrap (if it exists)
  ReactBootstrap: window?.ReactBootstrap || null
  errorIconClass: null
}

###
  These are global options used to control various aspects
  of ReactDatum rendering and functionality.

  Currently supported configurable options:

    ReactBootstrap: Defaults to global 'ReactBootstrap' if it exists.
      If set this option will use ReactBootstrap for popovers such as when
      a Datum is ellipsized and for validation errors. 
      If not set, ReactDatum will use the HTML5 title tooltips for popovers
      
    RbOverlayProps: 
      You can change the placement, trigger, etc used for popovers when using
      ReactBootstrap.
      
    errorIconClass: default: null.  Icon css class to use for indicating 
      validation errors. If not set, a red unicode exclamation point is used.  
  

###
module.exports = class Options 
  
  ###
    These are defaulted onto whatever is provided via ReactDatum.Options.set().  
    
  ###
  @_defaults:
    errorIconClass: null
    ReactBootstrap: null
    RbOverlayProps: 
      trigger: ['hover','focus']
      placement: 'right'  
    LazyPhoto:
      notFoundUrl: "http://zulily.github.io/react-datum/img/petals.png"
      loadingUrl: "http://zulily.github.io/react-datum/img/blank.jpg"
        
        
      
  
  @_options: _.extend {}, @_defaults
  
  
  ###
    Use to set a ReactDatum option.  Arguments can be either `(key, value)` or `({key: value, key: value})`
      
    Example:
    ```
      ReactDatum = require('react-datum')
      
      // use the version of react bootstrap I got somewhere 
      ReactDatum.Options.set('ReactBootstrap', loadedBootstrapLib)
      
      // use the fontawesome 4.5 exclamation sign icon for errors
      ReactDatum.Options.set('errorIconClass', 'fa fa-exclamation-circle')
    
      // change the placement of the popover (if using ReactBootstrap)
      ReactDatum.Options.set({RbOverlayProps: {placement: 'bottom'}})
    ```
  ###
  @set: (option, value) ->
    
    _options = Options._options
    
    extension = {}
    if _.isObject(option)
      extension = option
    else
      extension[option] = value
  
    for key, value of extension
      # this allows the user to specify a single attribute within the options[key], 
      # like say RbOverlayProps.placement
      if @_options[key]? && _.isObject(@_options[key]) && _.isObject(value) 
        _.extend @_options[key], value
      else
        @_options[key] = value
      
    return @_options
    

  ###
    Get a previously set option or it's default if not set.  Returns full set of options if no option arg 
    is provided.
  ###
  @get: (option=null) ->
    return _.extend({}, @_options) unless option?
    return @_options[option]
    
    
