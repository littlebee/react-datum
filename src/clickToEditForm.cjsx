App.namespace 'App.views.widgets.react', require: [
  'react'
  'react-dom'

  'views/widgets/react/form'

], (x, [React, ReactDom, loadedLibs...]) ->

  class x.ClickToEditForm extends x.Form
    @displayName: "widgets.react.ClickToEditForm"

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
      return <button className="btn-primary" onClick={@onEditClick}>Edit</button>


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
