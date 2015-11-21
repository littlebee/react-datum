

var Rd = ReactDatum

// KITTEN_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
kittenCollection = new Backbone.Collection(KITTEN_DATA)

var TilegridDisplay = React.createClass({
  displayName:"TilegridDisplay",
  render: function(){
    return (
      React.createElement(Rd.Collection, {collection: kittenCollection}, 
        React.createElement("div", {className: "grid"}, 
          React.createElement(Rd.CollectionStats, {itemDisplayName: "Kittens"}), 
          React.createElement(Rd.Tilegrid, null, 
            React.createElement(Rd.LazyPhoto, {attr: "imageUrl"}), 
            React.createElement("h5", null, React.createElement(Rd.Text, {attr: "name"})), 
            React.createElement(Rd.Email, {attr: "contactEmail", label: "Contact Email: "})
          )
        ), 
        React.createElement("div", {className: "preview"}, 
          React.createElement(Rd.SelectedModel, {placeholder: "Select a kitten to see information here"}, 
            React.createElement(Rd.LazyPhoto, {attr: "imageUrl"}), 
            React.createElement("h3", null, "Adopt ", React.createElement(Rd.Text, {attr: "name", readonly: true}), " Today!"), 
            React.createElement(Rd.link, {attr: "petfinderUrl"}, "Show ", React.createElement(Rd.Text, {attr: "name", readonly: true}), " on Petfinder.com"), 
            React.createElement(Rd.email, {attr: "contactEmail", label: "Email contact", displayAsLink: true, readonly: true}), 
            React.createElement(Rd.ClickToEditForm, {className: "kitten-form"}, 
              React.createElement("div", null, React.createElement(Rd.Text, {attr: "name", label: "Name:", setOnChange: true, required: true})), 
              React.createElement("label", null, "Say something about ", React.createElement(Rd.Text, {attr: "name", ellipsize: false, readonly: true}), ": "), 
              React.createElement("div", null, React.createElement(Rd.Text, {attr: "description", className: "wide-input"})), 
              React.createElement("div", null, React.createElement(Rd.Email, {attr: "sponsorEmail", label: "Adoption Sponsor:", displayLink: true})), 
              React.createElement("label", null, "Leave a Comment!"), 
              React.createElement("div", null, React.createElement(Rd.Text, {attr: "comment", className: "wide-input"}))
            )
          )
        )
      )
    )
  }
})

ReactDOM.render(React.createElement(TilegridDisplay), document.getElementById('demo'))
