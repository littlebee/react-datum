
React = require('react')
Backbone = require('backbone')
_ = require('underscore')

###
  This is an abstract base class for contextual data components like
  widgets.react.Collection and widgets.react.Model that provide a
  single contextual data element
###
module.exports = class ContextualData extends React.Component
  #  don't forget your display name so you get semi-intelligent errors from react
  #@displayName: "react-datum.Model"

  ### you need to override these ###

  # this is the class of thing being placed in the context.
  # ex. `Backbone.Model` or `Backbone.Collection`
  dataType:  null
  # this is the key in @context children should use to access thing
  # ex. "model"
  contextKey: null

  ### end of pure virtuals ###

  # you will also possibly want to extend these in your child class.  like this:
  # ```
  #   @proptypes: _.extend {}, ContextualData.propTypes,
  #     collection: React.PropTypes.oneOfType([
  #       React.PropTypes.instanceOf(Backbone.Collection)
  #       React.PropTypes.func
  #     ]).isRequired
  # ```
  @propTypes:
    fetch: React.PropTypes.bool
    fetchOptions: React.PropTypes.object

  # you will also need to similarly extend this, like this:
  #```
  #  @childContextTypes: _.extend {}, ContextualData.childContextTypes,
  #    collection: React.PropTypes.instanceOf(Backbone.Collection)
  #```
  @childContextTypes: {}

  # that's it!  most of the rest should not need to be overridden or extended

  getChildContext: ->
    c = {}
    c[@contextKey] = @dataItem
    return c


  render: ->
    @_initializeDataItem()
    return <div className={@contextKey}>{@renderContent()}</div>


  # some children render a placeholder if dataItem is empty
  renderContent: ->
    @props.children


  componentWillUnmount: ->
    @_unbindEvents()


  _initializeDataItem: () ->
    # we already have a model and the props model hasn't changed
    return unless @_needsReinitializing()

    @_unbindEvents()
    @_setDataItem()
    @_bindEvents()
    @dataItem.fetch(@props.fetchOptions) if @props.fetch


  _needsReinitializing: () ->
    truth = !@dataItem? || @props[@contextKey] != @_lastPropsModel
    @_lastPropsModel = @props[@contextKey]
    return truth


  _setDataItem: () ->
    if _.isFunction(@props[@contextKey])
      @dataItem = new @props[@contextKey]()  # a class
    else
      @dataItem = @props[@contextKey]     # or an instance...


  _bindEvents: () ->
    @dataItem?.on 'all', @_onDataChanged, @


  _unbindEvents: () ->
    @dataItem?.off 'all', @_onDataChanged


  _onDataChanged: () ->
    @forceUpdate()
