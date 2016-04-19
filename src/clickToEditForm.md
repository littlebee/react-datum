
This component is an extension of **Form** that initially presents an
"Edit" button that the user can click to switch between display and input.

**Datum** children are initialized readonly, when the user clicks edit, the
'inputMode' context variable is set to 'edit' and all children are rerendered.

See react-datum **Form** component for more props.  All **Form** properties are
supported by **ClickToEditForm**

Note that the readonly prop is observed.  If @props.readonly == true then the
edit button will not render and the form acts like a static container.  This
is for programatic setting of the form to readonly