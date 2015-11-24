
var Rd = ReactDatum

// This is the source for the left-right iframe viewer used to
// view examples on our github.io pages 
// http://zulily.github.io/react-datum/docs/examples

var examplesCollection = new Backbone.Collection([{
  id: "model",
  name: "Model Demo",
  relativePath: "model/model.html",
  description: "This demo shows how simple it is to create a display only form.", 
  thumbnailUrl: "http://zulily.github.io/react-datum/docs/img/react-datum_model-example.png",
},{
  id: "form",
  name: "Form Demo",
  relativePath: "form/form.html",
  description: "This demo shows how to create an input form that saves a Backbone model when "+
    "the user presses save.",
  thumbnailUrl: "http://zulily.github.io/react-datum/docs/img/react-datum_form-example.png",
},{
  id: "bigKittens",
  name: "Big Kittens Demo!",
  relativePath: "tilegrid/tilegrid.html",
  description: "This demo shows the pieces all come together to make a function CRUD app. " +
    "<br>...with Kittens!",
},{
  id: "examplesView",
  name: "Demos Within Demos",
  relativePath: "examplesView.html",
  description: "<p>This demo is this demo viewer (how fucking meta and deep is that shit?!?).</p> " +
    "<p>The demo viewer you are looking at right now, is really just a ReactDatum.Tilegrid, a few "+
    "datums and a custom iframe component.  If you scroll past the the static data, you "+
    "can see a nice example of how to make use of a contextually provided model in a custom "+
    "react component</p> " +
    "<p>Be careful you don't fall in the rabbit hole by clicking too deep. :)</p>",
}])

var DemoIframe = React.createClass({
  propTypes: {
    model: React.PropTypes.instanceOf(Backbone.Model)
  }, 
  contextTypes: {
    model: React.PropTypes.instanceOf(Backbone.Model)
  },
  render: function() {
    model = this.getModel()
    return <iframe src={model.get('relativePath')}/>
  },
  
  getModel: function() {
    return this.props.model || this.context.model
  },
})


ExamplesView = React.createClass({
  
  render: function() {
    return (
      <Rd.Collection collection={examplesCollection}>
        <Rd.Tilegrid>
          <Rd.LazyPhoto attr="thumbnailUrl"/>
          <h4><Rd.Text attr="name"/></h4>
          <div><Rd.Text attr="description" ellipsizeAt={false} displayAsHtml/></div>
        </Rd.Tilegrid>
        <div className="content-pane">
          <Rd.SelectedModel placeholder="Select a demo from the list on the left">
            <DemoIframe/>  
          </Rd.SelectedModel>
        </div>
      </Rd.Collection>
    )
  }
  
})

window.Demo = ExamplesView