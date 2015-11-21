

var Rd = ReactDatum

// KITTEN_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
kittenCollection = new Backbone.Collection(KITTEN_DATA)

var TilegridDisplay = React.createClass({
  displayName:"TilegridDisplay",
  render: function(){
    return (
      <Rd.Collection collection={kittenCollection}>
        <div className="grid">
          <Rd.CollectionStats itemDisplayName="Kittens"/>
          <Rd.Tilegrid>
            <Rd.LazyPhoto attr="imageUrl"/>
            <h5><Rd.Text attr="name"/></h5>
            <Rd.Email attr="contactEmail" label="Contact Email: "/>
          </Rd.Tilegrid>
        </div>
        <div className="preview">
          <Rd.SelectedModel placeholder="Select a kitten to see information here">
            <Rd.LazyPhoto attr="imageUrl"/>
            <h3>Adopt <Rd.Text attr="name" readonly/> Today!</h3>
            <Rd.link attr="petfinderUrl">Show <Rd.Text attr="name" readonly/> on Petfinder.com</Rd.link>
            <Rd.email attr="contactEmail" label="Email contact" displayAsLink readonly/>
            <Rd.ClickToEditForm className='kitten-form'>
              <div><Rd.Text attr="name" label="Name:" setOnChange required/></div>
              <label>Say something about <Rd.Text attr="name" ellipsize={false} readonly/>: </label>
              <div><Rd.Text attr="description" className="wide-input"/></div>
              <div><Rd.Email attr="sponsorEmail" label="Adoption Sponsor:" displayLink/></div>
              <label>Leave a Comment!</label>
              <div><Rd.Text attr="comment" className="wide-input"/></div>
            </Rd.ClickToEditForm>
          </Rd.SelectedModel>
        </div>
      </Rd.Collection>
    )
  }
})

ReactDOM.render(React.createElement(TilegridDisplay), document.getElementById('demo'))
