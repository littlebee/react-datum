"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rd = ReactDatum;

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

var KittenCard = function (_React$Component) {
  _inherits(KittenCard, _React$Component);

  function KittenCard() {
    _classCallCheck(this, KittenCard);

    return _possibleConstructorReturn(this, (KittenCard.__proto__ || Object.getPrototypeOf(KittenCard)).apply(this, arguments));
  }

  _createClass(KittenCard, [{
    key: "render",
    value: function render() {
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
            "div",
            null,
            React.createElement(Rd.LazyPhoto, { attr: "imgUrl" })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(Rd.Text, { attr: "name", label: "Name:" }),
            " (",
            React.createElement(Rd.Text, { attr: "title" }),
            ")"
          ),
          React.createElement(
            "div",
            null,
            React.createElement(Rd.Email, { attr: "sponsorEmail", label: "Adoption Sponsor:", displayLink: true })
          ),
          React.createElement(Rd.Text, { attr: "description" }),
          React.createElement(
            "h5",
            null,
            "Leave a comment"
          ),
          React.createElement(Rd.Text, { attr: "comment", inputMode: "edit" })
        )
      );
    }
  }]);

  return KittenCard;
}(React.Component);

KittenCard.displayName = "KittenCard";


window.Demo = KittenCard;