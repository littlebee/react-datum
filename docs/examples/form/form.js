"use strict";

var Rd = ReactDatum;

// Say you have this model:

var kittenModel = new Backbone.Model({
  id: "234345654",
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

// For demonstration purposes only - stub out save and pretend to save
kittenModel.save = function (attrs, options) {
  options.success(kittenModel, "success", options);
  return true;
};

// To make it into a form, just add the <Rd.Form>

var KittenForm = React.createClass({
  displayName: "KittenCard",
  render: function render() {
    return React.createElement(
      "div",
      { className: "kitten-card" },
      React.createElement(
        Rd.Model,
        { model: kittenModel },
        React.createElement(
          "h3",
          null,
          "Adopt ",
          React.createElement(Rd.Text, { attr: "name" }),
          " Today!"
        ),
        React.createElement(
          Rd.Form,
          null,
          React.createElement(
            "div",
            null,
            React.createElement(Rd.LazyPhoto, { attr: "imgUrl" })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(Rd.Number, { attr: "id", label: "Id:" })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(Rd.Text, { attr: "name", label: "Name:", setOnChange: true, required: true }),
            " (",
            React.createElement(Rd.Text, { attr: "title" }),
            ")"
          ),
          React.createElement(
            "label",
            null,
            "Say something about ",
            React.createElement(Rd.Text, { attr: "name", readonly: true }),
            ": "
          ),
          React.createElement(
            "div",
            null,
            React.createElement(Rd.Text, { attr: "description", className: "wide-input" })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(Rd.Email, { attr: "sponsorEmail", label: "Adoption Sponsor:", displayLink: true })
          ),
          React.createElement(
            "label",
            null,
            "Leave a Comment!"
          ),
          React.createElement(
            "div",
            null,
            React.createElement(Rd.Text, { attr: "comment", className: "wide-input" })
          )
        )
      )
    );
  }
});

window.Demo = KittenForm;