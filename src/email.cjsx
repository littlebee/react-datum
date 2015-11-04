
React = require('react')
Datum = require('./datum')

###
  For rendering and input of email addresses mailto: links like <a href="mailto:">.

  *Props*

  attr  - attribute on model should return an email address from the model
  displayLink - if true a mailto:// link is rendered for display

###
class Email extends Datum
  @displayName: "widgets.react.Email"

  @propTypes: _.extend {}, x.Datum.propTypes,
    displayLink: React.PropTypes.bool

  constructor: (props) ->
    super
    @addValidations @validateEmail


  renderValue: ->
    value = @getValueToRender()
    value = @_ellipsize(value)
    return if @props.displayLink
      <a href={@getMailToHref(value)}>{value}</a>
    else
      value


  getMailToHref: (value) ->
    return "mailto:#{value}"


  validateEmail: (value) =>
    return true if value.match /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    return "Invalid email address.  Should be like 'bob@zulily.com'"
