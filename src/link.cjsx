
React = require('react')
_ = require('underscore')

Datum = require('./datum')


###
  For rendering links like <a href="...">.

  The 'attr' prop should return a url from the model and is the href of the link.

  Optionally, a 'nameAttr' prop can also be specified to display between the <a></a>
  tags.  If 'nameAttr' prop is not specified, the children of the link are rendered
###
module.exports = class Link extends Datum
  @displayName: "widgets.react.Link"

  @propTypes: _.extend {}, Datum.propTypes,
    nameAttr: React.PropTypes.string

  subClassName: 'link'
  target: '_blank'

  # TODO add validations.

  render: ->
    super      # for debugging


  renderValue: () ->
    <a href={@_getHref()} target={@target}>
      {@_getTagContent()}
    </a>


  # Datum default renderForInput should should work

  _getHref: ->
    @getModelValue()

  _getTagContent: ->
    if @props.nameAttr?
      return @getModel().get(@props.nameAttr)
    else if @props.children && @props.children.length > 0
      return @props.children
    else
      return @getModelValue()
