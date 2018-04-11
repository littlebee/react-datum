(function() {
  var Datum, Link, React, _,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('../lib/reactLegacy');

  _ = require('underscore');

  Datum = require('./datum');


  /*
    see ./link.md
   */

  module.exports = Link = (function(superClass) {
    extend(Link, superClass);

    function Link() {
      return Link.__super__.constructor.apply(this, arguments);
    }

    Link.displayName = "react-datum.Link";

    Link.propTypes = _.extend({}, Datum.propTypes, {
      nameAttr: React.PropTypes.string,
      target: React.PropTypes.string,
      ellipsizeAt: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
      reverseEllipsis: React.PropTypes.bool,
      hideProtocol: React.PropTypes.bool
    });

    Link.defaultProps = _.extend({}, Datum.defaultProps, {
      ellipsizeAt: 35,
      target: '_blank',
      hideProtocol: false
    });

    Link.prototype.subClassName = 'link';

    Link.prototype.renderValueForDisplay = function() {
      return React.createElement("a", {
        "href": this._getHref(),
        "target": this.props.target
      }, this._getTagContent());
    };

    Link.prototype._getHref = function() {
      return this.getModelValue();
    };

    Link.prototype._removeHttpForDisplay = function() {
      var index, value;
      value = this.getModelValue();
      if (value.indexOf('://') >= 3) {
        index = value.indexOf('://') + 3;
        value = value.slice(index);
      }
      return value;
    };

    Link.prototype._getTagContent = function() {
      var contentValue, value;
      if (this.props.nameAttr != null) {
        contentValue = this.getModel().get(this.props.nameAttr);
        if (_.isArray(contentValue)) {
          contentValue = contentValue.map(function(v) {
            return v.toString();
          }).join(', ');
        }
        return this.renderEllipsizedValue(contentValue);
      } else if (this.props.children != null) {
        return React.createElement("span", null, this.props.children);
      } else {
        if (this.props.hideProtocol) {
          value = this._removeHttpForDisplay();
        } else {
          value = this.getModelValue();
        }
        return this.renderEllipsizedValue(value);
      }
    };

    return Link;

  })(Datum);

}).call(this);
