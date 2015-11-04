
React = require('react')
ContextualData = require('./contextualData')


###
  Model react component provides a model context to all children
###
module.exports = class Model extends ContextualData
  @displayName: "widgets.react.Model"

  # this is the class of thing being placed in the context.
  dataType:  Backbone.Model
  # this is the key in @context children should use to access thing
  contextKey: 'model'


  @propTypes: _.extend {}, ContextualData.propTypes,
    model: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Backbone.Model)
      React.PropTypes.func
    ]).isRequired


  @childContextTypes: _.extend {}, ContextualData.childContextTypes,
    model: React.PropTypes.instanceOf(Backbone.Model)
