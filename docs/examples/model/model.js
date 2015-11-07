

var Rd = ReactDatum

// Say you have this model:

var kittenModel = new Backbone.Model({
  name: "Fluffy",
  title: "His Royal Cuteness",
  description: "He's a cuddler and a lover through and through",
  forAdoption: true,
  ageInMonths: 10,
  createdAt: 1446520828,
  imgUrl: "https://drpem3xzef3kf.cloudfront.net/photos/pets/32707403/1/?bust=1436666804&width=200&no_scale_up=1",
  sponsorEmail: "kindoldcatlady@lotsofcats.com",
  comment: ""
});

// To create the card on the right:

var kittenCard = React.createClass({
  displayName:"KittenCard",
  render: function(){
    return (
      React.createElement("div", {className: "kitten-card"}, 
        React.createElement(Rd.Model, {model: kittenModel}, 
          React.createElement("h3", null, "Adopt ", React.createElement(Rd.Text, {attr: "name"}), " Today!"), 
          React.createElement("div", null, React.createElement(Rd.LazyPhoto, {attr: "imgUrl"})), 
          React.createElement("div", null, React.createElement(Rd.Text, {attr: "name", label: "Name"}), " (", React.createElement(Rd.Text, {attr: "title"}), ")"), 
          React.createElement("div", null, React.createElement(Rd.Email, {attr: "sponsorEmail", label: "Adoption Sponsor", displayLink: true})), 
          React.createElement(Rd.Text, {attr: "description"}), 
          React.createElement("h5", null, "Leave a comment"), 
          React.createElement(Rd.Text, {attr: "comment", inputMode: "edit"})
        )
      )
    )
  }
})
ReactDOM.render(React.createElement(kittenCard), document.getElementById('demo'))
