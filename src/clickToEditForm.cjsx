
React = require('react')
Form = require('./form')

###
  **ClickToEditForm** is an extension of **Form** that initially presents an
  "Edit" button that the user can click to switch between display and input.

  **Datum** children are initialized readonly, when the user clicks edit, the
  'inputMode' context variable is set to 'edit' and all children are rerendered.

  See react-datum **Form** component for more props.  All **Form&& properties are
  supported by **ClickToEditForm**

###
module.exports = class ClickToEditForm extends Form
  @displayName: "react-datum.ClickToEditForm"

  # override default for Form is all input, we start out readonly and then
  # switch to 'edit' mode when the user clicks edit button
  datumInputMode: 'readonly'

  constructor: (props) ->
    super
    @isEditing = false


  # override: only calls super if in edit mode, else renders single edit button
  renderButtons: (options) ->
    if @isEditing
      return super
    return <button key="edit" className="btn-primary" onClick={@onEditClick}>Edit</button>


  onEditClick: () =>
    @isEditing = true
    @datumInputMode = 'edit'
    @forceUpdate()
    _.defer => @focus()



  onSaveSuccess: () =>
    super
    @stopEditing()


  onCancelClick: () =>
    @stopEditing()
    super


  stopEditing: () =>
    @isEditing = false
    @datumInputMode = 'readonly'
    @forceUpdate()
