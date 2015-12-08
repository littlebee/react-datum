

var Rd = ReactDatum

// KITTEN_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
kittenCollection = new Backbone.Collection(KITTEN_DATA)

// Stub out Model.save and mock a success reponse for static examples
Backbone.Model.save = function(attrs, options={}) {
  options.success(this);
  return true
} 

var TilegridDisplay = React.createClass({
  displayName:"TilegridDisplay",
  render: function(){
    return (
      <Rd.Collection collection={kittenCollection}>
        <div className="grid">
          <Rd.CollectionStats itemDisplayName="Kittens"/>
          <Rd.Tilegrid>
            <Rd.LazyPhoto attr="imageUrl"/>
            <h4><Rd.Text attr="name"/></h4>
            <Rd.Email attr="breed"/>
          </Rd.Tilegrid>
        </div>
        <div className="preview">
          <Rd.SelectedModel placeholder="Select a kitten to see information here">
            <Rd.LazyPhoto attr="imageUrl"/>
            <div className='top-right'>
              <h3>Adopt <Rd.Text attr="name" readonly/> Today!</h3>
              <div><Rd.Link attr="petfinderUrl">Show <Rd.Text attr="name" readonly/> on Petfinder.com</Rd.Link></div>
              <div><Rd.Email attr="contactEmail" label="Email now:" displayAsLink readonly/></div>
            </div>
            <Rd.ClickToEditForm className='kitten-form'>
              <div><Rd.Text attr="name" label="Name: " setOnChange required/></div>
              <div><Rd.Email attr="contactEmail" label="Sponsor Email: "/></div>
              <div><Rd.Text attr="description" className="wide-input" ellipsizeAt={false} displayAsHtml/></div>
            </Rd.ClickToEditForm>
          </Rd.SelectedModel>
        </div>
      </Rd.Collection>
    )
  }
})

window.Demo = TilegridDisplay
