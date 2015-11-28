
### ReactDatum.Form 

 - provides a form context to all of the datums within.  

Adding the **ReactDatum.Form** component, you can easily convert a group of datums into an editable form with save and cancel buttons.  By default, when children of a Form component all datums will render in their input presentation `inputMode='edit'`.

<img alt="Screenshot from doc/examples/form/form.html" src="https://gitlab.corp.zulily.com/bwilkerson/react-datum/raw/master/img/react-datum_form-example.png" align="right"/>

```javascript
var kittenCard = React.createClass({
  displayName:"KittenCard",
  render: function(){
    return (
      <div className='kitten-card'>
        <ReactDatum.Model model={kittenModel}>
          <h3>Adopt <ReactDatum.Text attr="name"/> Today!</h3>
          <ReactDatum.Form>
            <div><ReactDatum.LazyPhoto attr="imgUrl"/></div>
            <div><ReactDatum.Text attr="name" label="Name" setOnChange/> (<ReactDatum.Text attr="title"/>)</div>
            <label>Say something about <ReactDatum.Text attr="name" readonly/>: </label>
            <div><ReactDatum.Text attr="description" className="wide-input"/></div>
            <div><ReactDatum.Email attr="sponsorEmail" label="Adoption Sponsor" displayLink/></div>
            <label>Leave a Comment!</label>
            <div><ReactDatum.Text attr="comment" className="wide-input"/></div>
          </ReactDatum.Form>
        </ReactDatum.Model>
      </div>
    )
  }
})
```

The **ReactDatum.Form** component adds save and cancel buttons.  When the user presses save, model.save() is called. All of the attributes were set() when the user entered new values If cancel is clicked, the model and subsequently, the form are reset back to the state of the last model.save().

By wrapping the datums in the **ReactDatum.Form** tag, they implicitedly recieve `inputMode='edit'` props that make them all render as inputs.  Almost all.  Some Datums, like **ReactDatum.LazyPhoto**, only have a display presentation, no update.  If given an `inputMode='edit'` they will ignore, and continue showing their display (`inputMode='readonly'``) representation.  




