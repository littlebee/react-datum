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
###
module.exports = class Options 
  ###
    Use to set a ReactDatum option.  Available options and defaults:
    
      ReactBootstrap: Defaults to global 'ReactBootstrap' if it exists.
        If set this option will use ReactBootstrap for popovers such as when
        a Datum is ellipsized and for validation errors. 
        If not set, ReactDatum will use the HTML5 title tooltips for popovers
        
      errorIconClass: default: null.  Icon css class to use for indicating 
        validation errors. If not set, a red unicode exclamation point is used.  
      
    Examples:
    ```
      ReactDatum = require('react-datum')
      
      // use the version of react bootstrap I got somewhere above
      ReactDatum.Options.set('ReactBootstrap', loadedBootstrapLib)
      
      // use the fontawesome 4.5 exclamation sign icon for errors
      ReactDatum.Options.set('errorIconClass', 'fa fa-exclamation-circle')
    
    ```
  ###
  @set: (option, value) ->
    extension = if _.isObject(option)
      option
    else
      {option, value}
  
    _.extend __options, extension
    return __options
    
  ###
    Get a previously set option or it's default if not set
  ###
  @get: (option=null) ->
    return _.extend({}, __options) unless option?
    return __options[option]
    
    
