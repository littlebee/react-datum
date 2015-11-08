

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
      <div className='kitten-card'>
        <Rd.Model model={kittenModel}>
          <h3>Adopt <Rd.Text attr="name"/> Today!</h3>
          <div><Rd.LazyPhoto attr="imgUrl"/></div>
          <div><Rd.Text attr="name" label="Name:"/> (<Rd.Text attr="title"/>)</div>
          <div><Rd.Email attr="sponsorEmail" label="Adoption Sponsor:" displayLink/></div>
          <Rd.Text attr="description"/>
          <h5>Leave a comment</h5>
          <Rd.Text attr="comment" inputMode="edit"/>
        </Rd.Model>
      </div>
    )
  }
})
ReactDOM.render(React.createElement(kittenCard), document.getElementById('demo'))
