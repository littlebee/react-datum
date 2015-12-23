
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

kittenModel.save = function(attrs, options) {
  options.success(kittenModel, "success", options)
  return true
}

// To make it into a form, just add the <Rd.Form>

var KittenForm = React.createClass({
  displayName:"KittenCard",
  render: function(){
    return (
      <div className='kitten-card'>
        <Rd.Model model={kittenModel}>
          <h3>Adopt <Rd.Text attr="name"/> Today!</h3>
          <Rd.Form>
            <div><Rd.LazyPhoto attr="imgUrl"/></div>
            <div><Rd.Text attr="name" label="Name:" setOnChange required/> (<Rd.Text attr="title"/>)</div>
            <label>Say something about <Rd.Text attr="name" readonly/>: </label>
            <div><Rd.Text attr="description" className="wide-input"/></div>
            <div><Rd.Email attr="sponsorEmail" label="Adoption Sponsor:" displayLink/></div>
            <label>Leave a Comment!</label>
            <div><Rd.Text attr="comment" className="wide-input"/></div>
          </Rd.Form>
        </Rd.Model>
      </div>
    )
  }
})

window.Demo = KittenForm
