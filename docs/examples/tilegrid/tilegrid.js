

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
            React.createElement("h4", null, React.createElement(Rd.Text, {attr: "name"})), 
            React.createElement(Rd.Email, {attr: "breed"})
          )
        ), 
        React.createElement("div", {className: "preview"}, 
          React.createElement(Rd.SelectedModel, {placeholder: "Select a kitten to see information here"}, 
            React.createElement(Rd.LazyPhoto, {attr: "imageUrl"}), 
            React.createElement("div", {className: "top-right"}, 
              React.createElement("h3", null, "Adopt ", React.createElement(Rd.Text, {attr: "name", readonly: true}), " Today!"), 
              React.createElement("div", null, React.createElement(Rd.Link, {attr: "petfinderUrl"}, "Show ", React.createElement(Rd.Text, {attr: "name", readonly: true}), " on Petfinder.com")), 
              React.createElement("div", null, React.createElement(Rd.Email, {attr: "contactEmail", label: "Email now:", displayAsLink: true, readonly: true}))
            ), 
            React.createElement(Rd.ClickToEditForm, {className: "kitten-form"}, 
              React.createElement("div", null, React.createElement(Rd.Text, {attr: "name", label: "Name: ", setOnChange: true, required: true})), 
              React.createElement("div", null, React.createElement(Rd.Email, {attr: "contactEmail", label: "Sponsor Email: "})), 
              React.createElement("div", null, React.createElement(Rd.Text, {attr: "description", className: "wide-input", ellipsizeAt: false, displayAsHtml: true}))
            )
          )
        )
      )
    )
  }
})

ReactDOM.render(React.createElement(TilegridDisplay), document.getElementById('demo'))
