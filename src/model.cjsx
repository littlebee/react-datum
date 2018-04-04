
React = require('./lib/reactLegacy')
Backbone = require('backbone')
_ = require('underscore')

ContextualData = require('./contextualData')


# see ./model.md
module.exports = class Model extends ContextualData
  @displayName: "react-datum.Model"

  # this is the class of thing being placed in the context.
  dataType:  Backbone.Model
  # this is the key in @context children should use to access thing
  contextKey: 'model'

  @modelPropType: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(Backbone.Model)
    React.PropTypes.object
  ])

  @propTypes: _.extend {}, ContextualData.propTypes,
    model: @modelPropType.isRequired


  @childContextTypes: _.extend {}, ContextualData.childContextTypes,
    model: @modelPropType


  update: ->
    super