(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"), require("Backbone"), require("_"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM", "Backbone", "_"], factory);
	else if(typeof exports === 'object')
		exports["ReactDatum"] = factory(require("React"), require("ReactDOM"), require("Backbone"), require("_"));
	else
		root["ReactDatum"] = factory(root["React"], root["ReactDOM"], root["Backbone"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  // contextual components
	  ClickToEditForm: __webpack_require__(2),
	  Collection: __webpack_require__(9),
	  CollectionStats: __webpack_require__(13),
	  Form: __webpack_require__(4),
	  Model: __webpack_require__(14),
	  SelectedModel: __webpack_require__(15),
	  Datum: __webpack_require__(6),
	  Email: __webpack_require__(16),
	  LazyPhoto: __webpack_require__(17),
	  Link: __webpack_require__(20),
	  Number: __webpack_require__(21),
	  Text: __webpack_require__(22),
	  WholeNumber: __webpack_require__(23),

	  // TODO : i think this will eventually go to a separate npm package so that the core doesn't
	  //    have dependency on react-select
	  CollectionPicker: __webpack_require__(24)

	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var ClickToEditForm, Form, React,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Form = __webpack_require__(4);

	module.exports = ClickToEditForm = (function(superClass) {
	  extend(ClickToEditForm, superClass);

	  ClickToEditForm.displayName = "react-datum.ClickToEditForm";

	  ClickToEditForm.prototype.datumInputMode = 'readonly';

	  function ClickToEditForm(props) {
	    this.stopEditing = bind(this.stopEditing, this);
	    this.onCancelClick = bind(this.onCancelClick, this);
	    this.onSaveSuccess = bind(this.onSaveSuccess, this);
	    this.onEditClick = bind(this.onEditClick, this);
	    ClickToEditForm.__super__.constructor.apply(this, arguments);
	    this.isEditing = false;
	  }

	  ClickToEditForm.prototype.renderButtons = function(options) {
	    if (this.isEditing) {
	      return ClickToEditForm.__super__.renderButtons.apply(this, arguments);
	    }
	    return React.createElement("button", {
	      "key": "edit",
	      "className": "btn btn-primary",
	      "onClick": this.onEditClick
	    }, "Edit");
	  };

	  ClickToEditForm.prototype.onEditClick = function() {
	    this.isEditing = true;
	    this.datumInputMode = 'edit';
	    this.forceUpdate();
	    return _.defer((function(_this) {
	      return function() {
	        return _this.focus();
	      };
	    })(this));
	  };

	  ClickToEditForm.prototype.onSaveSuccess = function() {
	    ClickToEditForm.__super__.onSaveSuccess.apply(this, arguments);
	    return this.stopEditing();
	  };

	  ClickToEditForm.prototype.onCancelClick = function() {
	    this.stopEditing();
	    return ClickToEditForm.__super__.onCancelClick.apply(this, arguments);
	  };

	  ClickToEditForm.prototype.stopEditing = function() {
	    this.isEditing = false;
	    this.datumInputMode = 'readonly';
	    return this.forceUpdate();
	  };

	  return ClickToEditForm;

	})(Form);


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Datum, Form, React, ReactDom, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	React = __webpack_require__(3);

	ReactDom = __webpack_require__(5);

	Datum = __webpack_require__(6);

	Backbone = __webpack_require__(7);

	_ = __webpack_require__(8);

	module.exports = Form = (function(superClass) {
	  extend(Form, superClass);

	  Form.displayName = "react-datum.Form";

	  Form.modelOrObject = function() {
	    return React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Model), React.PropTypes.object]);
	  };

	  Form.propTypes = {
	    model: Form.modelOrObject(),
	    readonly: React.PropTypes.bool,
	    buttonPosition: React.PropTypes.oneOf(['top', 'bottom', 'none']),
	    className: React.PropTypes.string,
	    saveSuccessCallback: React.PropTypes.func,
	    saveErrorCallback: React.PropTypes.func
	  };

	  Form.defaultProps = {
	    readonly: false,
	    buttonPosition: 'bottom',
	    className: 'zform'
	  };

	  Form.contextTypes = {

	    /* can also accept model instance as a prop.  prop has precendence */
	    model: Form.modelOrObject()
	  };

	  Form.childContextTypes = {
	    model: Form.modelOrObject(),
	    inputMode: Datum.contextTypes.inputMode,
	    form: React.PropTypes.object
	  };

	  Form.prototype.datumInputMode = 'edit';

	  function Form(props) {
	    this.onCancelClick = bind(this.onCancelClick, this);
	    this.onSaveError = bind(this.onSaveError, this);
	    this.onSaveSuccess = bind(this.onSaveSuccess, this);
	    this.onSaveClick = bind(this.onSaveClick, this);
	    this.datums = [];
	    this.state = {
	      errorMessage: null,
	      successMessage: null
	    };
	    Form.__super__.constructor.apply(this, arguments);
	  }

	  Form.prototype.getChildContext = function() {
	    return {
	      model: this.getModel(),
	      inputMode: this.getDatumInputMode(),
	      form: this
	    };
	  };

	  Form.prototype.render = function() {
	    if (this.getModel() == null) {
	      return null;
	    }
	    this._saveModelStateAtRender();
	    return React.createElement("div", {
	      "className": this.props.className
	    }, this.renderTopButtons(), this.renderChildren(), this.renderBottomButtons(), this.renderMessages());
	  };

	  Form.prototype.componentDidMount = function() {
	    return this.node = ReactDom.findDOMNode(this);
	  };


	  /*
	    Gives the first editable datum focus
	   */

	  Form.prototype.focus = function() {
	    var firstEditable;
	    firstEditable = _.find(this.datums, function(d) {
	      return d.isEditable();
	    });
	    return firstEditable != null ? firstEditable.focus() : void 0;
	  };

	  Form.prototype.renderChildren = function() {
	    return React.createElement("div", {
	      "className": "form-content"
	    }, this.props.children);
	  };

	  Form.prototype.renderTopButtons = function() {
	    if (this.props.buttonPosition !== 'top') {
	      return;
	    }
	    return this.renderButtonContainer({
	      addClass: "top"
	    });
	  };

	  Form.prototype.renderBottomButtons = function() {
	    if (this.props.buttonPosition !== 'bottom') {
	      return;
	    }
	    return this.renderButtonContainer({
	      addClass: "bottom"
	    });
	  };

	  Form.prototype.renderButtonContainer = function(options) {
	    var className;
	    if (options == null) {
	      options = {};
	    }
	    options = _.defaults(options, {
	      addClass: null
	    });
	    className = "form-buttons";
	    if (options.addClass != null) {
	      className += " " + options.addClass;
	    }
	    return React.createElement("div", {
	      "className": className
	    }, this.renderButtons(options));
	  };

	  Form.prototype.renderButtons = function(options) {
	    return [
	      React.createElement("button", {
	        "key": "save",
	        "ref": "saveButton",
	        "className": 'btn btn-success',
	        "onClick": this.onSaveClick
	      }, "Save"), React.createElement("button", {
	        "key": "cancel",
	        "ref": "cancelButton",
	        "className": 'btn',
	        "onClick": this.onCancelClick
	      }, "Cancel")
	    ];
	  };

	  Form.prototype.renderMessages = function() {
	    return [this.renderSuccessMessage(), this.renderErrorMessage()];
	  };

	  Form.prototype.renderErrorMessage = function() {
	    return this.renderMessage(this.state.errorMessage, 'error');
	  };

	  Form.prototype.renderSuccessMessage = function() {
	    return this.renderMessage(this.state.successMessage, 'success');
	  };

	  Form.prototype.renderMessage = function(message, className) {
	    var fullClassName;
	    if (message == null) {
	      return null;
	    }
	    fullClassName = "datum-form-message-" + className + " " + className;
	    return React.createElement("div", {
	      "key": className,
	      "className": fullClassName
	    }, message);
	  };


	  /*
	    Save the changes from datums on the form to the Backbone model. 
	    
	    Calls model.save after first attempting to validate() the model.  Handles 
	    inconsistencies in model.validate() between versions 0.9.2 - 1.2.2 of Backbone.
	    
	    The user clicking on the save button belonging to the Form will call this Method
	    
	    The options argument is passed on to Backbone model.save()
	   */

	  Form.prototype.save = function(options) {
	    var model;
	    if (options == null) {
	      options = {};
	    }
	    options = _.defaults(options, {
	      validateDatums: true,
	      validateModel: true
	    });
	    this.setState({
	      errorMessage: null,
	      successMessage: null
	    });
	    model = this.getModel();
	    if (options.validateDatums && !this.validateDatums(options)) {
	      this.onSaveError(model, "Correct errors and try again.");
	      return;
	    }
	    if (options.validateModel && !this.validateModel(options)) {
	      this.onSaveError(model, model.validationError);
	      return;
	    }
	    return this.saveModel(options);
	  };


	  /*
	    Validate the datums on the form. 
	    
	    returns false if any are currently invalid
	   */

	  Form.prototype.validateDatums = function(options) {
	    if (options == null) {
	      options = {};
	    }
	    if (this.getInvalidDatums().length > 0) {
	      this.setState({
	        errorMessage: "Please correct errors and try again."
	      });
	      return false;
	    }
	    return true;
	  };


	  /*
	    Calls Backbone model.validate and handles inconsistencies in model.validate() 
	    between versions 0.9.2 - 1.2.2 of Backbone.
	   */

	  Form.prototype.validateModel = function(options) {
	    var error, model;
	    if (options == null) {
	      options = {};
	    }
	    model = this.getModel();
	    if (model == null) {
	      return;
	    }
	    try {
	      if (!model.isValid()) {
	        if (model.validationError != null) {
	          return false;
	        }
	      }
	    } catch (error) {
	      null;
	    }
	    return true;
	  };

	  Form.prototype.preceedOriginalCallback = function(obj, attr, newCallback) {
	    var originalCallback;
	    originalCallback = obj[attr];
	    return obj[attr] = function() {
	      newCallback.apply(this, arguments);
	      return originalCallback != null ? originalCallback.apply(this, argumentsk) : void 0;
	    };
	  };


	  /*  
	    calls Backbone model.save and calls success and error handlers. 
	    
	    You should probably call Form.save() above instead.  It will also validate the model 
	    and datums.
	   */

	  Form.prototype.saveModel = function(options) {
	    var model, saved;
	    if (options == null) {
	      options = {};
	    }
	    model = this.getModel();
	    if (model == null) {
	      return;
	    }
	    this.preceedOriginalCallback(options, 'success', this.onSaveSuccess);
	    this.preceedOriginalCallback(options, 'error', this.onSaveError);
	    return saved = model.save({}, options);
	  };

	  Form.prototype.onSaveClick = function(evt) {
	    return this.save();
	  };

	  Form.prototype.onSaveSuccess = function(model, response, options) {
	    if (options == null) {
	      options = {};
	    }
	    this._saveModelState();
	    if ((this.props.saveSuccessCallback != null) && _.isFunction(this.props.saveSuccessCallback)) {
	      return this.props.saveSuccessCallback(model, response, options);
	    } else {
	      return this.setState({
	        successMessage: "Successfully saved!",
	        successAt: Date.now()
	      });
	    }
	  };

	  Form.prototype.onSaveError = function(model, response, options) {
	    if (options == null) {
	      options = {};
	    }
	    if ((this.props.saveErrorCallback != null) && _.isFunction(this.props.saveErrorCallback)) {
	      return this.props.saveErrorCallback(model, response, options);
	    } else {
	      response = (response == null) || _.isString(response) ? response : JSON.stringify(response);
	      return this.setState({
	        errorMessage: "Unable to save. " + response || "Reason unknown."
	      });
	    }
	  };

	  Form.prototype.onCancelClick = function(evt) {
	    this.setState({
	      errorMessage: null,
	      successMessage: null
	    });
	    this._restoreModelState();
	    return this._resetDatums();
	  };

	  Form.prototype.getModel = function() {
	    return this.props.model || this.context.model;
	  };

	  Form.prototype.getDatumInputMode = function() {
	    if (this.props.readonly) {
	      return 'readonly';
	    } else {
	      return this.datumInputMode;
	    }
	  };

	  Form.prototype.getInvalidDatums = function() {
	    return _.filter(this.datums, function(d) {
	      return !d.validate();
	    });
	  };


	  /*
	    This method is called by the datum children when they mount
	   */

	  Form.prototype.addDatum = function(datumComponent) {
	    if (indexOf.call(this.datums, datumComponent) < 0) {
	      return this.datums.push(datumComponent);
	    }
	  };


	  /*
	    This method is called by the datum children when they unmount
	   */

	  Form.prototype.removeDatum = function(datumComponent) {
	    var index;
	    index = this.datums.indexOf(datumComponent);
	    if (index < 0) {
	      console.error("form.removeDatum called for datumComponent (" + datumComponent.constructor.displayName + ") that we don't know about?");
	      return;
	    }
	    return this.datums = this.datums.slice(0, index).concat(this.datums.slice(index + 1, this.datums.length));
	  };

	  Form.prototype._saveModelStateAtRender = function() {
	    var model;
	    model = this.getModel();
	    if (model === this._savedModel) {
	      return;
	    }
	    return this._saveModelState();
	  };

	  Form.prototype._saveModelState = function() {
	    this._savedModel = this.getModel();
	    return this._savedAttrs = this._savedModel.toJSON();
	  };

	  Form.prototype._restoreModelState = function() {
	    var model;
	    model = this.getModel();
	    if (model !== this._savedModel) {
	      return;
	    }
	    model.set(this._savedAttrs, {
	      silent: true
	    });
	    return model.trigger('sync', model);
	  };

	  Form.prototype._resetDatums = function() {
	    var datum, i, len, ref, results;
	    ref = this.datums;
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      datum = ref[i];
	      results.push(datum.cancelEdit());
	    }
	    return results;
	  };

	  return Form;

	})(React.Component);


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Datum, OverlayTrigger, Popover, React, ReactDOM, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	ReactDOM = __webpack_require__(5);

	Backbone = __webpack_require__(7);

	_ = __webpack_require__(8);

	if (typeof ReactBootstrap !== "undefined" && ReactBootstrap !== null) {
	  Popover = ReactBootstrap.Popover;
	  OverlayTrigger = ReactBootstrap.OverlayTrigger;
	}


	/*
	  see ./datum.md
	 */

	module.exports = Datum = (function(superClass) {
	  extend(Datum, superClass);

	  Datum.displayName = "react-datum.Datum";

	  Datum.propTypes = {
	    className: React.PropTypes.string,
	    model: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Model), React.PropTypes.object]),
	    attr: React.PropTypes.string.isRequired,
	    label: React.PropTypes.string,
	    ellipsizeAt: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
	    placeholder: React.PropTypes.string,
	    inputMode: React.PropTypes.oneOf(['readonly', 'edit']),
	    noPopover: React.PropTypes.bool,
	    setOnChange: React.PropTypes.bool,
	    readonly: React.PropTypes.bool,
	    required: React.PropTypes.bool
	  };

	  Datum.defaultProps = {
	    ellipsizeAt: 35
	  };

	  Datum.contextTypes = {
	    model: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Model), React.PropTypes.object]),
	    inputMode: React.PropTypes.oneOf(['readonly', 'edit', 'inlineEdit']),
	    form: React.PropTypes.object
	  };

	  Datum.prototype.subClassName = null;

	  Datum.prototype.className = 'datum';

	  Datum.inlineEditor = null;

	  Datum.prototype.validations = [];

	  function Datum(props) {
	    this.validateRequired = bind(this.validateRequired, this);
	    this.focus = bind(this.focus, this);
	    this.onInputRef = bind(this.onInputRef, this);
	    this.onChange = bind(this.onChange, this);
	    this.addValidations = bind(this.addValidations, this);
	    Datum.__super__.constructor.call(this, props);
	    this.state = {
	      errors: []
	    };
	    this.addValidations(this.validateRequired);
	  }


	  /*
	      React life cycle methods
	   */

	  Datum.prototype.componentDidMount = function() {
	    var ref, ref1;
	    return (ref = this.context) != null ? (ref1 = ref.form) != null ? typeof ref1.addDatum === "function" ? ref1.addDatum(this) : void 0 : void 0 : void 0;
	  };

	  Datum.prototype.componentWillReceiveProps = function(nextProps) {
	    var model;
	    return model = nextProps.model || this.context.model;
	  };

	  Datum.prototype.componentWillUnmount = function() {
	    var ref, ref1;
	    return (ref = this.context) != null ? (ref1 = ref.form) != null ? typeof ref1.removeDatum === "function" ? ref1.removeDatum(this) : void 0 : void 0 : void 0;
	  };


	  /*
	    Rendering methods
	   */

	  Datum.prototype.render = function() {
	    return this.renderDatumWrapper((function(_this) {
	      return function() {
	        if (_this.isEditable()) {
	          return _this.renderForInput();
	        } else {
	          return _this.renderForDisplay();
	        }
	      };
	    })(this));
	  };

	  Datum.prototype.renderDatumWrapper = function(contentFn) {
	    return React.createElement("span", {
	      "className": this.getFullClassName(),
	      "data-zattr": this.props.attr
	    }, contentFn());
	  };

	  Datum.prototype.renderForDisplay = function() {
	    return React.createElement("span", null, this.renderLabel(), this.renderValueOrPlaceholder(), this.renderIcons());
	  };

	  Datum.prototype.renderLabel = function() {
	    if (this.props.label != null) {
	      return React.createElement("label", null, this.props.label, " ");
	    } else {
	      return null;
	    }
	  };

	  Datum.prototype.renderValueOrPlaceholder = function() {
	    var displayValue;
	    if (this.getModelValue() != null) {
	      displayValue = this.renderValueForDisplay();
	      return this.renderWrappedDisplayValue(displayValue);
	    } else {
	      return this.renderPlaceholder();
	    }
	  };


	  /*
	    In most cases, this is the method you want to override in a custom datum to 
	    alter the way the model attribute is displayed when inputMode='readonly'
	    
	    This method is only called if the model value is not null.
	   */

	  Datum.prototype.renderValueForDisplay = function() {
	    return this.getValueForDisplay();
	  };

	  Datum.prototype.renderWrappedDisplayValue = function(value) {
	    return React.createElement("span", {
	      "className": "datum-display-value"
	    }, value);
	  };

	  Datum.prototype.renderPlaceholder = function() {
	    var placeholder;
	    placeholder = this.props.placeholder;
	    if (placeholder == null) {
	      return null;
	    }
	    return React.createElement("span", {
	      "className": "placeholder"
	    }, placeholder);
	  };


	  /*
	    Note that this method is not called by Datum directly.  It is 
	    provided here so that any Datum extensions can ellipsize whatever
	    part of their rendering neccessary and have a consistent prop and 
	    method for doing so.
	   */

	  Datum.prototype.renderEllipsizedValue = function(value, options) {
	    var ellipsizeAt, ellipsizedValue, popover;
	    if (options == null) {
	      options = {};
	    }
	    if (value == null) {
	      return value;
	    }
	    ellipsizeAt = this.getEllipsizeAt();
	    if (value && _.isString(value) && ellipsizeAt && value.length > ellipsizeAt) {
	      ellipsizedValue = value.slice(0, ellipsizeAt - 3) + '...';
	      if (this.props.noPopover) {
	        value = ellipsizedValue;
	      } else {
	        if (Popover != null) {
	          popover = React.createElement(Popover, {
	            "id": 'datumTextEllisize'
	          }, value);
	          value = React.createElement(OverlayTrigger, {
	            "trigger": ['hover', 'focus'],
	            "placement": "bottom",
	            "overlay": popover
	          }, React.createElement("span", null, ellipsizedValue));
	        } else {
	          value = React.createElement("span", {
	            "title": value
	          }, ellipsizedValue);
	        }
	      }
	    }
	    return value;
	  };

	  Datum.prototype.renderForInput = function() {
	    return React.createElement("span", {
	      "className": "datum-input",
	      "data-value": this.getValueForInput()
	    }, this.renderLabel(), this.renderInput(), this.renderIcons());
	  };


	  /*
	    In most cases this is the method you want to override to alter the presentation of the datum when
	    inputMode='edit'
	   */

	  Datum.prototype.renderInput = function() {
	    var placeholder, value;
	    placeholder = this.props.placeholder || "";
	    value = this.getValueForInput();
	    return React.createElement("input", {
	      "type": "text",
	      "placeholder": placeholder,
	      "value": value,
	      "onChange": this.onChange,
	      "ref": this.onInputRef
	    });
	  };

	  Datum.prototype.renderIcons = function() {
	    var error, errors, i, len, popover, ref;
	    if (this.isEditing() && this.state.errors.length > 0) {
	      errors = [];
	      if (Popover != null) {
	        ref = this.state.errors;
	        for (i = 0, len = ref.length; i < len; i++) {
	          error = ref[i];
	          errors.push(React.createElement("div", null, error));
	        }
	        popover = React.createElement(Popover, {
	          "id": 'datumInvalid',
	          "bsStyle": 'danger'
	        }, errors);
	        return React.createElement(OverlayTrigger, {
	          "trigger": ['hover', 'focus'],
	          "placement": "bottom",
	          "overlay": popover
	        }, React.createElement("span", {
	          "className": "error validation"
	        }, "!"));
	      } else {
	        errors = this.state.errors.join('\n');
	        return React.createElement("span", {
	          "className": "error validation",
	          "title": errors
	        }, "!");
	      }
	    }
	    return null;
	  };

	  Datum.prototype.isEditable = function() {
	    var inputMode;
	    inputMode = this.getInputMode();
	    if (inputMode === "edit" || (inputMode === "inlineEdit" && this.isEditing())) {
	      return true;
	    }
	  };

	  Datum.prototype.isEditing = function() {
	    var inputMode;
	    inputMode = this.getInputMode();
	    return inputMode === 'edit' || (inputMode === 'inlineEdit' && this.constructor.inlineEditor === this);
	  };

	  Datum.prototype.cancelEdit = function() {
	    return this.setState({
	      errors: []
	    });
	  };

	  Datum.prototype.addValidations = function(validations) {
	    if (!_.isArray(validations)) {
	      validations = [validations];
	    }
	    return this.validations = this.validations.concat(validations);
	  };

	  Datum.prototype.getInputMode = function() {
	    if (this.props.readonly) {
	      return "readonly";
	    }
	    return this.props.inputMode || this.context.inputMode || "readonly";
	  };

	  Datum.prototype.getValueForDisplay = function() {
	    return this.getModelValue();
	  };

	  Datum.prototype.getValueForInput = function() {
	    return this.getModelValue();
	  };

	  Datum.prototype.getModel = function() {
	    var ref, ref1;
	    return ((ref = this.props) != null ? ref.model : void 0) || ((ref1 = this.context) != null ? ref1.model : void 0) || new Backbone.Model();
	  };


	  /*
	    do not override this method to return a component element or jsx.  it's bad
	   */

	  Datum.prototype.getModelValue = function() {
	    var model, value;
	    if (!(model = this.getModel())) {
	      return null;
	    }
	    value = model instanceof Backbone.Model ? model.get(this.props.attr) : model[this.props.attr];
	    return value;
	  };

	  Datum.prototype.setModelValue = function(value, options) {
	    var ref;
	    if (options == null) {
	      options = {};
	    }
	    return (ref = this.getModel()) != null ? ref.set(this.props.attr, value, options) : void 0;
	  };

	  Datum.prototype.saveModel = function() {
	    var ref;
	    return (ref = this.getModel()) != null ? ref.save() : void 0;
	  };

	  Datum.prototype.getEllipsizeAt = function() {
	    return this.props.ellipsizeAt;
	  };

	  Datum.prototype.getFullClassName = function() {
	    var className;
	    className = this.subClassName != null ? this.className + " " + this.subClassName : this.className;
	    if (this.props.required) {
	      className += " required";
	    }
	    if (this.state.errors.length > 0) {
	      className += " invalid";
	    }
	    if (this.props.className != null) {
	      className += " " + this.props.className;
	    }
	    return className;
	  };

	  Datum.prototype.shouldSetOnChange = function() {
	    return this.props.setOnChange === true || (this.getInputMode() === 'inlineEdit' && !this.props.setOnChange === false);
	  };

	  Datum.prototype.onChange = function(event) {
	    var currentValue;
	    currentValue = event.target.value;
	    this.validate(currentValue);
	    if (this.shouldSetOnChange()) {
	      return this.setModelValue(currentValue);
	    } else {
	      return this.setModelValue(currentValue, {
	        silent: true
	      });
	    }
	  };

	  Datum.prototype.onInputRef = function(input) {
	    return this.inputComponent = input;
	  };

	  Datum.prototype.focus = function() {
	    var node;
	    if (this.inputComponent != null) {
	      node = ReactDOM.findDOMNode(this.inputComponent);
	      node.focus();
	      return node.select();
	    }
	  };

	  Datum.prototype.validate = function(value) {
	    var errors, i, len, ref, valid, validation;
	    if (value == null) {
	      value = this.getModelValue();
	    }
	    if (!this.isEditable()) {
	      return true;
	    }
	    this.setState({
	      errors: []
	    });
	    errors = [];
	    ref = this.validations;
	    for (i = 0, len = ref.length; i < len; i++) {
	      validation = ref[i];
	      valid = validation(value);
	      if (valid !== true) {
	        errors.push(valid);
	      }
	    }
	    this.setState({
	      errors: errors
	    });
	    return errors.length === 0;
	  };

	  Datum.prototype.validateRequired = function(value) {
	    if (!this.props.required) {
	      return true;
	    }
	    if (!(_.isNull(value) || _.isEmpty(value) || _.isUndefined(value))) {
	      return true;
	    }
	    return "This input is required";
	  };

	  return Datum;

	})(React.Component);


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Collection, ContextualData, React, SelectableCollection, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Backbone = __webpack_require__(7);

	_ = __webpack_require__(8);

	SelectableCollection = __webpack_require__(10);

	ContextualData = __webpack_require__(12);

	module.exports = Collection = (function(superClass) {
	  extend(Collection, superClass);

	  function Collection() {
	    return Collection.__super__.constructor.apply(this, arguments);
	  }

	  Collection.displayName = "react-datum.Collection";

	  Collection.prototype.dataType = Backbone.Collection;

	  Collection.prototype.contextKey = 'collection';

	  Collection.propTypes = _.extend({}, ContextualData.propTypes, {
	    collection: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Collection), React.PropTypes.func]).isRequired
	  });

	  Collection.childContextTypes = _.extend({}, ContextualData.childContextTypes, {
	    collection: React.PropTypes.instanceOf(Backbone.Collection)
	  });

	  Collection.prototype._setDataItem = function() {
	    Collection.__super__._setDataItem.apply(this, arguments);
	    this.collection = this.dataItem;
	    if (!this.collection.hasSelectableCollectionMixin) {
	      SelectableCollection.applyTo(this.collection);
	    }
	    return this.collection;
	  };

	  return Collection;

	})(ContextualData);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(11);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var SelectableCollection, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	_ = __webpack_require__(8);

	module.exports = SelectableCollection = (function() {
	  function SelectableCollection() {
	    this.setActiveModel = bind(this.setActiveModel, this);
	    this.setActiveModelById = bind(this.setActiveModelById, this);
	    this.setActiveIndex = bind(this.setActiveIndex, this);
	    this.getActiveModel = bind(this.getActiveModel, this);
	    this.selectNone = bind(this.selectNone, this);
	    this.selectAll = bind(this.selectAll, this);
	    this.selectModelByIndex = bind(this.selectModelByIndex, this);
	    this.selectModelById = bind(this.selectModelById, this);
	    this.selectModel = bind(this.selectModel, this);
	  }


	  /*
	    This method is used to mix SelectableCollection features into a Backbone Collection
	   */

	  SelectableCollection.applyTo = function(collection) {
	    if (this.hasSelectableCollectionMixin) {
	      return;
	    }
	    this.warnIfReplacingMethods(collection);
	    return _.extend(collection, this.prototype);
	  };

	  SelectableCollection.warnIfReplacingMethods = function(collection) {
	    var intersect;
	    intersect = _.intersection(_.keys(collection), _.keys(this.prototype));
	    if (!(intersect.length > 0)) {
	      return;
	    }
	    return console.error("Warning: using SelectableCollection mixin will replace the following methods: " + intersect.join(', '));
	  };

	  SelectableCollection.prototype.hasSelectableCollectionMixin = true;

	  SelectableCollection.prototype.getSelectedModels = function() {
	    return _.filter(this.models, function(m) {
	      return m.selected;
	    });
	  };

	  SelectableCollection.prototype.selectModel = function(model, selected, options) {
	    if (selected == null) {
	      selected = true;
	    }
	    if (options == null) {
	      options = {};
	    }
	    options = _.defaults(options, {
	      silent: false
	    });
	    if (model == null) {
	      console.warn("SelectableCollection: selectModel called on null model");
	      return false;
	    }
	    if (selected === "toggle") {
	      model.selected = (model.selected == null) || model.selected === false;
	    } else {
	      model.selected = selected;
	    }
	    if (!options.silent) {
	      this.trigger('selectionsChanged');
	    }
	    return model.selected;
	  };

	  SelectableCollection.prototype.selectModelById = function(id, selected, options) {
	    if (selected == null) {
	      selected = true;
	    }
	    if (options == null) {
	      options = {};
	    }
	    return this.selectModel(this.get(id), selected, options);
	  };

	  SelectableCollection.prototype.selectModelByIndex = function(index, selected, options) {
	    if (selected == null) {
	      selected = true;
	    }
	    if (options == null) {
	      options = {};
	    }
	    return this.selectModel(this.models[index], selected, options);
	  };

	  SelectableCollection.prototype.selectAll = function(options) {
	    var i, len, model, ref;
	    if (options == null) {
	      options = {};
	    }
	    options = _.defaults(options, {
	      silent: false
	    });
	    ref = this.models;
	    for (i = 0, len = ref.length; i < len; i++) {
	      model = ref[i];
	      if (model == null) {
	        continue;
	      }
	      this.selectModel(model, true, {
	        silent: true
	      });
	    }
	    if (!options.silent) {
	      return this.trigger('selectionsChanged');
	    }
	  };

	  SelectableCollection.prototype.selectNone = function(options) {
	    var i, len, model, ref;
	    if (options == null) {
	      options = {};
	    }
	    options = _.defaults(options, {
	      silent: false
	    });
	    ref = this.getSelectedModels();
	    for (i = 0, len = ref.length; i < len; i++) {
	      model = ref[i];
	      if (model == null) {
	        continue;
	      }
	      this.selectModel(model, false, {
	        silent: true
	      });
	    }
	    this.trigger('activeModelChanged', null);
	    if (!options.silent) {
	      return this.trigger('selectionsChanged');
	    }
	  };

	  SelectableCollection.prototype.getActiveModel = function() {
	    return this.activeModel;
	  };

	  SelectableCollection.prototype.setActiveIndex = function(index, options) {
	    if (options == null) {
	      options = {};
	    }
	    return this.setActiveModel(this.models[index]);
	  };

	  SelectableCollection.prototype.setActiveModelById = function(modelId, options) {
	    if (options == null) {
	      options = {};
	    }
	    return this.setActiveModel(this.get(modelId), options);
	  };

	  SelectableCollection.prototype.setActiveModel = function(model, options) {
	    var currentActive;
	    if (options == null) {
	      options = {};
	    }
	    options = _.defaults(options, {
	      active: true,
	      silent: false
	    });
	    currentActive = this.getActiveModel();
	    if (currentActive != null) {
	      currentActive.active = false;
	    }
	    this.selectModel(model, options);
	    if (model != null) {
	      model.active = options.active;
	    }
	    this.activeModel = model;
	    if (!options.silent) {
	      return this.trigger('activeModelChanged', model);
	    }
	  };

	  return SelectableCollection;

	})();


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, ContextualData, React, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Backbone = __webpack_require__(7);

	_ = __webpack_require__(8);


	/*
	  This is an abstract base class for contextual data components like ReactDatum.Collection 
	  and ReactDatum.Model that provide a single contextual data element.
	  
	  The ReactDatum.ContextualData base class also provides the listener to model or collection
	  events and rendering of child components on changes.
	  
	  You shouldn't need to use this class directly.
	 */

	module.exports = ContextualData = (function(superClass) {
	  extend(ContextualData, superClass);

	  function ContextualData() {
	    return ContextualData.__super__.constructor.apply(this, arguments);
	  }


	  /* you need to override these */

	  ContextualData.prototype.dataType = null;

	  ContextualData.prototype.contextKey = null;

	  ContextualData.propTypes = {
	    fetch: React.PropTypes.bool,
	    fetchOptions: React.PropTypes.object
	  };

	  ContextualData.childContextTypes = {};

	  ContextualData.prototype.getChildContext = function() {
	    var c;
	    c = {};
	    c[this.contextKey] = this.dataItem;
	    return c;
	  };

	  ContextualData.prototype.render = function() {
	    this._initializeDataItem();
	    return React.createElement("div", {
	      "className": this.contextKey
	    }, this.renderContent());
	  };

	  ContextualData.prototype.renderContent = function() {
	    return this.props.children;
	  };

	  ContextualData.prototype.componentWillUnmount = function() {
	    return this._unbindEvents();
	  };

	  ContextualData.prototype._initializeDataItem = function() {
	    if (!this._needsReinitializing()) {
	      return;
	    }
	    this._unbindEvents();
	    this._setDataItem();
	    this._bindEvents();
	    if (this.props.fetch) {
	      return this.dataItem.fetch(this.props.fetchOptions);
	    }
	  };

	  ContextualData.prototype._needsReinitializing = function() {
	    var truth;
	    truth = (this.dataItem == null) || this.props[this.contextKey] !== this._lastPropsModel;
	    this._lastPropsModel = this.props[this.contextKey];
	    return truth;
	  };

	  ContextualData.prototype._setDataItem = function() {
	    if (_.isFunction(this.props[this.contextKey])) {
	      return this.dataItem = new this.props[this.contextKey]();
	    } else {
	      return this.dataItem = this.props[this.contextKey];
	    }
	  };

	  ContextualData.prototype._bindEvents = function() {
	    var ref;
	    return (ref = this.dataItem) != null ? ref.on('all', this._onDataChanged, this) : void 0;
	  };

	  ContextualData.prototype._unbindEvents = function() {
	    var ref;
	    return (ref = this.dataItem) != null ? ref.off('all', this._onDataChanged) : void 0;
	  };

	  ContextualData.prototype._onDataChanged = function() {
	    return this.forceUpdate();
	  };

	  return ContextualData;

	})(React.Component);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, CollectionStats, React,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Backbone = __webpack_require__(7);

	module.exports = CollectionStats = (function(superClass) {
	  extend(CollectionStats, superClass);

	  function CollectionStats() {
	    return CollectionStats.__super__.constructor.apply(this, arguments);
	  }

	  CollectionStats.displayName = "react-datum.CollectionStats";

	  CollectionStats.propTypes = {
	    collection: React.PropTypes.instanceOf(Backbone.Collection),
	    itemDisplayName: React.PropTypes.string
	  };

	  CollectionStats.defaultProps = {
	    itemDisplayName: "item"
	  };

	  CollectionStats.contextTypes = {
	    collection: React.PropTypes.instanceOf(Backbone.Collection)
	  };

	  CollectionStats.prototype.render = function() {
	    this.collection = this.props.collection || this.context.collection;
	    if (this.collection == null) {
	      throw this.constructor.displayName + " needs a collection prop or react-datum Collection context parent";
	    }
	    return React.createElement("div", {
	      "className": 'collection-stats'
	    }, this._renderFound(), this._renderSelected(), this._renderViewing());
	  };

	  CollectionStats.prototype._renderFound = function() {
	    var base, displayName, things, total;
	    total = (typeof (base = this.collection).getTotalRows === "function" ? base.getTotalRows() : void 0) || this.collection.models.length;
	    displayName = this.props.itemDisplayName;
	    things = (function() {
	      switch (false) {
	        case (typeof inflection !== "undefined" && inflection !== null ? inflection.inflect : void 0) == null:
	          return inflection.inflect(this.props.itemDisplayName, total);
	        case displayName.plural == null:
	          return displayName.plural(total);
	        default:
	          return displayName;
	      }
	    }).call(this);
	    return React.createElement("span", {
	      "className": "found stats fade in"
	    }, "Found ", this._renderCount(total), " ", things);
	  };

	  CollectionStats.prototype._renderSelected = function() {
	    if (!this.collection.isSelectable) {
	      return null;
	    }
	    return React.createElement("span", {
	      "className": "selected stats fade in"
	    }, ", ", this._renderCount(this.collection.getSelectedModels().length), " selected");
	  };

	  CollectionStats.prototype._renderViewing = function() {
	    var bottomIndex, ref, ref1, topIndex;
	    topIndex = this.collection.topDisplayIndex || ((ref = this.collection.statsModel) != null ? ref.get('topDisplayIndex') : void 0);
	    bottomIndex = this.collection.bottomDisplayIndex || ((ref1 = this.collection.statsModel) != null ? ref1.get('bottomDisplayIndex') : void 0);
	    if (!((topIndex != null) && bottomIndex)) {
	      return null;
	    }
	    return React.createElement("span", {
	      "className": "viewing stats fade in"
	    }, "Viewing ", this._renderCount(topIndex, 'top-index'), " - ", this._renderCount(bottomIndex, 'bottom-index'));
	  };

	  CollectionStats.prototype._renderCount = function(value, addClass) {
	    var className;
	    if (addClass == null) {
	      addClass = "";
	    }
	    className = ["count", addClass].join(' ');
	    return React.createElement("span", {
	      "className": className
	    }, value);
	  };

	  return CollectionStats;

	})(React.Component);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, ContextualData, Model, React, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Backbone = __webpack_require__(7);

	_ = __webpack_require__(8);

	ContextualData = __webpack_require__(12);

	module.exports = Model = (function(superClass) {
	  extend(Model, superClass);

	  function Model() {
	    return Model.__super__.constructor.apply(this, arguments);
	  }

	  Model.displayName = "react-datum.Model";

	  Model.prototype.dataType = Backbone.Model;

	  Model.prototype.contextKey = 'model';

	  Model.propTypes = _.extend({}, ContextualData.propTypes, {
	    model: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Model), React.PropTypes.func]).isRequired
	  });

	  Model.childContextTypes = _.extend({}, ContextualData.childContextTypes, {
	    model: React.PropTypes.instanceOf(Backbone.Model)
	  });

	  return Model;

	})(ContextualData);


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, ContextualData, React, SelectedModel,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Backbone = __webpack_require__(7);

	ContextualData = __webpack_require__(12);

	module.exports = SelectedModel = (function(superClass) {
	  extend(SelectedModel, superClass);

	  function SelectedModel() {
	    this._onSelectionsChanged = bind(this._onSelectionsChanged, this);
	    return SelectedModel.__super__.constructor.apply(this, arguments);
	  }

	  SelectedModel.displayName = "react-datum.SelectedModel";

	  SelectedModel.prototype.dataType = Backbone.Model;

	  SelectedModel.prototype.contextKey = 'model';

	  SelectedModel.proptypes = {
	    collection: React.PropTypes.instanceOf(Backbone.Collection),
	    placeholder: React.PropTypes.node
	  };

	  SelectedModel.contextTypes = {
	    collection: React.PropTypes.instanceOf(Backbone.Collection)
	  };

	  SelectedModel.childContextTypes = {
	    model: React.PropTypes.instanceOf(Backbone.Model)
	  };

	  SelectedModel.prototype.renderContent = function() {
	    if (this.dataItem != null) {
	      return SelectedModel.__super__.renderContent.apply(this, arguments);
	    }
	    return React.createElement("div", {
	      "className": "large-placeholder"
	    }, this.props.placeholder);
	  };

	  SelectedModel.prototype._needsReinitializing = function() {
	    var truth;
	    truth = SelectedModel.__super__._needsReinitializing.call(this) || this.context.collection !== this._lastContextCollection;
	    this._lastContextCollection = this.context.collection;
	    return truth;
	  };

	  SelectedModel.prototype._setDataItem = function() {
	    var base;
	    this.collection = this.props.collection || this.context.collection;
	    return this.dataItem = typeof (base = this.collection).getSelectedModels === "function" ? base.getSelectedModels()[0] : void 0;
	  };

	  SelectedModel.prototype._bindEvents = function(model) {
	    var ref;
	    SelectedModel.__super__._bindEvents.apply(this, arguments);
	    return (ref = this.collection) != null ? ref.on("selectionsChanged", this._onSelectionsChanged) : void 0;
	  };

	  SelectedModel.prototype._unbindEvents = function() {
	    var ref;
	    SelectedModel.__super__._unbindEvents.apply(this, arguments);
	    return (ref = this.collection) != null ? ref.off("selectionsChanged", this._onSelectionsChanged) : void 0;
	  };

	  SelectedModel.prototype._onSelectionsChanged = function() {
	    this._unbindEvents();
	    this._setDataItem();
	    this._bindEvents();
	    return this.forceUpdate();
	  };

	  return SelectedModel;

	})(ContextualData);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, Email, React, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	_ = __webpack_require__(8);

	Datum = __webpack_require__(6);


	/*
	  For rendering and input of email addresses.  Can render mailto: links like 
	  `<a href="mailto:">` in display mode
	  
	  Validates that email address is a semi valid email based on matching 
	  `/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/`
	 */

	module.exports = Email = (function(superClass) {
	  extend(Email, superClass);

	  Email.displayName = "react-datum.Email";

	  Email.propTypes = _.extend({}, Datum.propTypes, {
	    displayAsLink: React.PropTypes.bool
	  });

	  function Email(props) {
	    this.validateEmail = bind(this.validateEmail, this);
	    Email.__super__.constructor.apply(this, arguments);
	    this.addValidations(this.validateEmail);
	  }

	  Email.prototype.renderValueForDisplay = function() {
	    var value;
	    value = Email.__super__.renderValueForDisplay.apply(this, arguments);
	    if (this.props.displayAsLink) {
	      return React.createElement("a", {
	        "href": this.getMailToHref(value)
	      }, value);
	    } else {
	      return value;
	    }
	  };

	  Email.prototype.getMailToHref = function(value) {
	    return "mailto:" + value;
	  };

	  Email.prototype.validateEmail = function(value) {
	    if (value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
	      return true;
	    }
	    return "Invalid email address.  Should be like 'bob@zulily.com'";
	  };

	  return Email;

	})(Datum);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, LazyPhoto, React,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Datum = __webpack_require__(6);


	/*
	  This is a lazy loading image.

	  To prevent a page heavily loaded with images preventing other content from loading, a small
	  blank image is downloaded and rendered first and then onLoad the real image src is used and
	  rerender.

	  On error a notFoundUrl is set as the image src to prevent broken image display.

	  The model attribute specified in @props.attr should return a fully qualified
	  url.  The image is only rendered if it's visible and in view. Otherwise the placeholder
	  image is rendered.
	 */

	module.exports = LazyPhoto = (function(superClass) {
	  extend(LazyPhoto, superClass);

	  function LazyPhoto() {
	    this.onError = bind(this.onError, this);
	    this.onLoad = bind(this.onLoad, this);
	    return LazyPhoto.__super__.constructor.apply(this, arguments);
	  }

	  LazyPhoto.displayName = "react-datum.LazyPhoto";

	  LazyPhoto.prototype.notFoundUrl = __webpack_require__(18);

	  LazyPhoto.prototype.loadingUrl = __webpack_require__(19);

	  LazyPhoto.prototype.subClassName = 'lazy-image';

	  LazyPhoto.prototype.notFound = false;

	  LazyPhoto.prototype.initialLoadComplete = false;

	  LazyPhoto.prototype.isEditable = function() {
	    return false;
	  };

	  LazyPhoto.prototype.renderForDisplay = function() {
	    var modelValue, source;
	    modelValue = this.getModelValue();
	    if (!modelValue || modelValue !== this.lastModelValue) {
	      this.notFound = this.initialLoadComplete = !((modelValue != null ? modelValue.length : void 0) > 0);
	      this.lastModelValue = modelValue;
	    }
	    source = (function() {
	      switch (false) {
	        case !this.notFound:
	          return this.notFoundUrl;
	        case !this.initialLoadComplete:
	          return modelValue;
	        default:
	          return this.loadingUrl;
	      }
	    }).call(this);
	    return React.createElement("img", {
	      "src": source,
	      "onLoad": this.onLoad,
	      "onError": this.onError
	    });
	  };

	  LazyPhoto.prototype.onLoad = function(evt) {
	    if (this.initialLoadComplete) {
	      return;
	    }
	    this.initialLoadComplete = true;
	    return this.forceUpdate();
	  };

	  LazyPhoto.prototype.onError = function(evt) {
	    if (!this.initialLoadComplete) {
	      return;
	    }
	    if (this.notFound) {
	      return;
	    }
	    this.notFound = true;
	    return this.forceUpdate();
	  };

	  return LazyPhoto;

	})(Datum);


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABoCAYAAAAHIFUvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEZCNjk5NUI5RjE2MTFFMkE2MjE4QzNGRDJGMzREOEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEZCNjk5NUM5RjE2MTFFMkE2MjE4QzNGRDJGMzREOEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RkI2OTk1OTlGMTYxMUUyQTYyMThDM0ZEMkYzNEQ4RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RkI2OTk1QTlGMTYxMUUyQTYyMThDM0ZEMkYzNEQ4RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmtML+gAAA1VSURBVHja7F09cttKEm6rlJs+gaFoQ0EnEHwCUfEGgk5AKtxIZPJeKPIEhKr2xaZOIPgEhrN9keATCD6BF3B1P7ZHPb8cSICtrpoyzRIHM/1N/07P4M0f//0f/CKUtm2Gn5dtq8cw6P/8+18//f/wFwFj2rabtp20LWnb57Z9aFs1tokc/AJg5G372LartjUIwrpt9yg1r4A8MxibtpVt27LvFwjO6EAZMyBTBANQOlTqvpuMDZSxApIyMAqNrdji9wTK5BWQfmiCYBCDbw1/u2a/+fgKSD90zVRQhfZDRwXako6yts1/R0AmOHneYqoqztRbh98UCpiT3w2QKa7KBBnQ6e/vbXvEz4s9jOyNYCdsdKcslpvfDZBTBKTA4OwIP5PkXGPg9ojMSRz7TRRpqxyj8VJwlSe/EyCZwuSOaZcMGL5aO/XzgEbaBszMwmhfUELV5QYl/REl/yP2lw8RkImBsQTMB2Fl5wjMwqIKOX31GNcnQYpdF9cGmf8ZJTrHOXYe3Lu2neNCOxsiICkDxrRaTxRp4UZXihkkoH3yVI0FXNAskHtFxTUYcB6xbAAHb7CApA4MutRE2JkAyr6RdqWxSdL47zUqdIVArDSaYRIjI9CHyuro2PHvVwiMxBibN1TuOdZEkIp7YaU3qGavBElTF0wyNEBCVnShASV3UC2xKFeify5ZRw7gTyJJcm+AJAGgLB3ijlDQTXaFwJDG9MEgFdJY3g85deJr5BbCSkyQYbVhVYaoJ1r9iQb0LUpt49j/6dBVVkcXAb+RmDBDQBoHJrsCUhlSKZVGhUKP0vosgKQBA60F1ZUi07Z7AHIsOASJEMw1GFc0nppgMlRAakt07ep51cKk7wKDO2kFrzVjuwT/4oizmAyMDUgleC8helWSkq3CLFcblShjKLGfqSA124Cx5oYAdBCANB6eko62Sj9vNUC5uMVTAexEWCiXgWBwdfVliDZkKzDEN55olH5S5oqWno7DhTK2UlBhBYTVcV1bVPYgAFkL37lkc1W603zPI+appV/uWDRMClRAbgOlI4mcPegFEGlblfa0J3tIGu//SqPDweBU6LynOoCR0kZXNVQJ0cUTqSYiNlGpMZYF7LLFMw3Q3K29NDB9HTA/Kc1yG4NxIYCksCsYWOC/GTzdlLrSGNiNh6R8MhjLS9jtRF5rmKaCZwLdJ6MwFWxeEQMQl9reBAdw5uBq1rhSOBM2gu5NHfNEtYMkAi6KW+Z2T3GshcV7asBvXyXXgH8Vw+W1SUiGev8B9WXmCN417Hb/tgb19eAIsG0Vk6RsmH7f4Pc2V9YXjI3G1kWRDh0gHZPuse2T/qZihgqlQTL09wj2xLCCXRh3ibZggf1dWphUKSrRRnMNGCF5L2eVleBDM2REiQ/8pog2BVVvmVs5MUjMPez20knkE2WyOTJ0pUgTeS4u6qDAfhuHv28cI2vypnKN7SHPLUG+HSsudYP2r2YZAiO9wQM7c+zsi5CicDX0F5a44Jy5shn+veoMNAgMD9Q2sVch0neN5HJNoYuflsy4zzzSONzG/pifemCHVNZ7nPQq0Jem2OAIGV9qvJ6UrS4qDTphz+76OUX78hknfdeTa14ZpJpKfRJBCqmc6R5tbObxTG5jxd9yCQGQN/BDiU41JQoTXHfh+qYbBLtkUj4T1FONkr3Gz7nF7vlS9/yrVlIqDkjX+aNFhEOIYgRej7vSxCjPTdz+XTDprXHhfGJ21OZpcZVbouovNW51wtoxi+s6vizfsEOfG1zVfZzNUwPC2MCHUqZIQh3g9pIqu4OA9H1nQ/78628qsz3lgCSo25qeQKGapwmC8QHGQynaNMm4r/ZRwdyot8BsDpQVUrD4IIs8KSqpqSD+MYU+STrsswW5ejGYWjB+9HUgIN4wUGIfcGmYUb8eCSA8bqIU/jlEPAffgkHx2fpA8CiWiifimzZ3BSWkCOIlbMxc8RCLmA9AMDrbVLTqq5ZSJyvF4E7RtuSR1dcVhJUKPbd0cDBi21XuKCx1uSwQRJISdjGBKUYgHVmPsRMH44d0mADR1SdRFEunn0IMcwK72xe+DRiQWU9g0OLeMF4v1UjdxVW1RZuUiOT+PC/RP2UBUYkqa6h3kSTo5p5A3EtsMlzI3HZ2Ufo/GRLbBlWFg/poMcCubmwN9tT4EGgKYUVzthyWqu63HAyTylKZeMJc4lAjLp0zHCq9jyS9qcH2inspPtczLdADy5XcjwmETjXdwviuSVrCLvV+x1Syy/5Jxxfa7k4NvBFtk+99WQ2CsmIPT1jgRIMuYdxETg1lrK/Z95VBGiaO2kLrKBzuKY6gGHGXVTQmokrHOezKjfZJ+axsqt8HkImjuiIJoexn8wtIC6lr2iH0zTCUCIRVc7jWZS1gV32SOgA3ZfHKBkZ4s5sGmAIdnCN0203b3SWCeAIe2w2HDmppX4bm2MrIruRLUs1saVQ6jBAUUmWIrhT/GHZVGQ8uenQERA5NxoJeAuor8zCbWICYwKCjAiE7ZBm6hB9dderAQMjBrYKTOwVrn3keeoBRIxP3CexKNrjFSADRRdmuEf/UR10fCKtALYZueoiyFyOwJTEz3J1EfXaRLFVCrhUDXkDEQmI2uBkCPFSaIy/Is/rKpJnHXRQMkk05NTCddmGNubxDRVXNmVRc9ZB3StF+DDk+uUEAXDK9lWIvgAWPVMmpEj8mYVRZNwyMDz2BQbZpOXBVFVrByZ2ec4Oa18ZzB0yNZPA8JUDFwO3HFzBfpOYbr5D9LRXQxVqFA2Y7+gIjZ2A0A5cOUj2hXpUJGLriSfXengCSwe5EUxVZ9DeK1zaG10jUsDsAFDvlQ6kUsp/zP//6O1UBuUCxignGFN28XMjtjIFIivu4N54XDHLb/Q8gXyHsSgkdEFSmnyiG7nxEUTlJyURYWDGIm4eslZKMu71v4Wlpvq/BNh3W4dWKupwQL4ZoBiJJS5wTqd5jiFu1T3y5R1vyg/dUdcLPcpTwc5JMKgVKcIAZmJOPqqOQ4LNOld9SAHbLAq3tAECZKyql6kG9kwd60tVm8TIguth4BnFKR/ngc5A3dmp4mh/LmF3rI8ZIFbtmI6nwfO+qdyI8jtD1f9Z+vjpQVvMCDc6+3tASvQk6/qx6LPz+20KTXumDKHI+wzF9x0ZXw84FtXsuSAQdS/O5Kt0ESklCYCuU4xcG2B5cw+5AYwP683e2+wwzZNC7HtIr6gHSDJmbCXNZs7nY9oYqnHvpoc5Slv/qePvjWNsbj9fmke3IhMHUbCCp4GURuRTJLZBJLtuemae9eUSgpX6uNQuogN3rk2wFg6oqpGrOjt4jT1QHZt0CseBelo8rWFuYpFtJPlmAt2wB2ICjcbkcnSZmZMIcSmw5PD3QmaOmuMI5bMB+oULmoHoLlIpGSp3EjMz3AQPAfks0PecMQeHxwsShX7AwSbo4mZ55gzYl9MAOOTHvdGo75osl58KkQ/JjmQV0ip5PFFVIl+frYh5+L33p4KpvhIAwZ8/bOthYKqz7BLuXlBkpFiBioizAZ7d5VwTGSumXkpY3FlBIl7tQN/Yv8PSispx5iVt4ehXhxMOlfkKxVNZM4/r6BndnFg8pBX3GmPYwyI6pdBrgUq80z5pr+qng57qBFwNkKujKRYR+OANypucbS1LQ9HYF1xpc7jxInmEv77KKAUgK8a5cTTT988mbruTjW8NzA8C+105Jh4tS6OHtDTEAyTQupC9daHz5jcLw2mKQt8oqnniqRl2/lw5jHgQgE43a8AVVCjhzxXNzuRnoVnE2+LFmLiG+KY8KnmahBykhp4rtCJGOjTB56XIBFyehVGwMJUu/aVxY3xxd02feLfY1sSFXpS6E1Xor+PY+Z09KRYKnwkIJyWo3gg1LhwxISK3vtTDpQtDPPvHMF8FmSNF3yPUehUVlDwaQ2pNplIRUaY2gqKrA572FlUbXbx2yCy7z7G3zLCYgPmDo8l41M5yJQQ25qBZpAUgqNeQul7shA1Jp1IRJMqRqDn57RBZBWqVFsAX5PVehV6APEpBvHoPMDGDErAurLZ6SFChuPPuvhwqI62pZgLxX0sdNO7ZXvy41mYLNS0vJQcTVWBqk4rPGo1lqwNgXnNRhcRQGUFxsylcHaXwxQKRBJWgwVRVFbq3pirymhwBMXTCXBklxqVgshwqIOlmqXnxg7iblmKgS3OV4l8rAt57xjYvELUB+nThderl4btUVC5A72N2BNYPdnkXH+G5nj793vPHoMzQifu+RQShBX/pE5T55BFffiXyqTl6CHhV97loa9KDEMT4lRVOQTz/VsNt0a1ikv1d5qe7u96HSOsCOqPszPlJJ0XwnzW9QnREINewOgdJ++6fYEz4cOCArXK3E4DOHtMWF4hzss4JLeOaj20OXEHVjKHdwSaeKWz2qGyMORjDGEn7eGDJd7pwzaVJ/9wpIROJ72hcO6qqGcR0QGh0gwCL6RCMl9Ga2kFdwvwISaE+I0dKL6W+gv5PEr4AY0jRHzAXlEfdk7GCMERBgUpCgmqJbQEcPxlgBIVDohNbFrwJGR/8XYAA/IBnrVTxJagAAAABJRU5ErkJggg=="

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAaCAYAAABctMd+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAtSURBVHja7MxBDQAACAQgtX/nM4UPNwhAJ6krU4fkcrlcLpfLv+QLAAD//wMANGkDMYhC/1cAAAAASUVORK5CYII="

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, Link, React, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	_ = __webpack_require__(8);

	Datum = __webpack_require__(6);


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
	    target: React.PropTypes.string
	  });

	  Link.defaultProps = _.extend({}, Datum.defaultProps, {
	    target: '_blank'
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

	  Link.prototype._getTagContent = function() {
	    if (this.props.nameAttr != null) {
	      return this.getModel().get(this.props.nameAttr);
	    } else if (this.props.children && this.props.children.length > 0) {
	      return React.createElement("span", null, this.props.children);
	    } else {
	      return this.getModelValue();
	    }
	  };

	  return Link;

	})(Datum);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, Number, ONE_MILLION, ONE_THOUSAND, React, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	_ = __webpack_require__(8);

	Datum = __webpack_require__(6);

	ONE_MILLION = 1000000;

	ONE_THOUSAND = 1000;


	/*
	  For real numbers.

	  Only allows `/^\-?[0-9]*\.?[0-9]*$/` on input
	 */

	module.exports = Number = (function(superClass) {
	  extend(Number, superClass);

	  Number.displayName = "react-datum.Number";

	  Number.propTypes = _.extend({}, Datum.propTypes, {
	    format: React.PropTypes.oneOf(['abbreviate', 'money', 'comma']),
	    minValue: React.PropTypes.number,
	    maxValue: React.PropTypes.number
	  });

	  Number.prototype.charactersMustMatch = /^\-?[0-9]*\.?[0-9]*$/;

	  function Number(props) {
	    this.validateMax = bind(this.validateMax, this);
	    this.validateMin = bind(this.validateMin, this);
	    this.onChange = bind(this.onChange, this);
	    Number.__super__.constructor.apply(this, arguments);
	    this.addValidations([this.validateMin, this.validateMax]);
	  }

	  Number.prototype.isAcceptableInput = function(value) {
	    return value.match(this.charactersMustMatch);
	  };

	  Number.prototype.renderValueForDisplay = function() {
	    var dataValue, decimal, ref, wholeNumber;
	    dataValue = this.getModelValue();
	    switch (this.props.format) {
	      case 'abbreviate':
	        if (dataValue > ONE_MILLION) {
	          (dataValue / ONE_MILLION) + "M";
	        } else if (dataValue > ONE_THOUSAND) {
	          (dataValue / ONE_THOUSAND) + "K";
	        } else {
	          dataValue;
	        }
	        break;
	      case 'comma':
	        ref = dataValue.toString().split('.'), wholeNumber = ref[0], decimal = ref[1];
	        dataValue = wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	        if (decimal != null) {
	          dataValue += '.' + decimal;
	        }
	        break;
	      case 'money':
	        dataValue = dataValue.toString().replace(/(.*\.\d$)/, '$10');
	        if (!(dataValue.indexOf('.') >= 0)) {
	          dataValue += ".00";
	        }
	        dataValue = "$" + dataValue;
	        break;
	      default:
	        dataValue;
	    }
	    return dataValue;
	  };

	  Number.prototype.renderPlaceHolder = function() {
	    if (this.props.placeholder != null) {
	      Number.__super__.renderPlaceHolder.apply(this, arguments);
	    }
	    return React.createElement("span", null, "0");
	  };

	  Number.prototype.onChange = function(event) {
	    var inputValue;
	    inputValue = event.target.value;
	    if (this.isAcceptableInput(inputValue)) {
	      return Number.__super__.onChange.apply(this, arguments);
	    }
	  };

	  Number.prototype.validateMin = function(value) {
	    if (this.props.minValue == null) {
	      return true;
	    }
	    if (value >= this.props.minValue) {
	      return true;
	    }
	    return "The value must be equal or greater than " + this.props.minValue;
	  };

	  Number.prototype.validateMax = function(value) {
	    if (this.props.maxValue == null) {
	      return true;
	    }
	    if (value <= this.props.maxValue) {
	      return true;
	    }
	    return "The value must be equal or less than " + this.props.maxValue;
	  };

	  return Number;

	})(Datum);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, React, Text, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	_ = __webpack_require__(8);

	Datum = __webpack_require__(6);


	/*
	  see ./text.md
	 */

	module.exports = Text = (function(superClass) {
	  extend(Text, superClass);

	  function Text() {
	    return Text.__super__.constructor.apply(this, arguments);
	  }

	  Text.displayName = "react-datum.Text";

	  Text.propTypes = _.extend({}, Datum.propTypes, {
	    displayAsHtml: React.PropTypes.bool,
	    ellipsizeAt: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool])
	  });

	  Text.defaultProps = _.extend({}, Datum.defaultProps, {
	    ellipsizeAt: 35
	  });

	  Text.prototype.render = function() {
	    return Text.__super__.render.apply(this, arguments);
	  };

	  Text.prototype.renderValueForDisplay = function() {
	    return this.renderEllipsizedValue(Text.__super__.renderValueForDisplay.apply(this, arguments));
	  };

	  Text.prototype.renderWrappedDisplayValue = function(value) {
	    if (this.props.displayAsHtml) {
	      return React.createElement("span", {
	        "className": "datum-display-value",
	        "dangerouslySetInnerHTML": this.getMarkup(value)
	      });
	    } else {
	      return Text.__super__.renderWrappedDisplayValue.apply(this, arguments);
	    }
	  };

	  Text.prototype.getMarkup = function(value) {
	    return {
	      __html: value
	    };
	  };

	  return Text;

	})(Datum);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Number, React, WholeNumber,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Number = __webpack_require__(21);


	/*
	  For whole numbers (no decimal input allowed).
	 */

	module.exports = WholeNumber = (function(superClass) {
	  extend(WholeNumber, superClass);

	  function WholeNumber() {
	    return WholeNumber.__super__.constructor.apply(this, arguments);
	  }

	  WholeNumber.displayName = "react-datum.WholeNumber";

	  WholeNumber.prototype.charactersMustMatch = /^\-?[0-9]*$/;

	  return WholeNumber;

	})(Number);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, CollectionPicker, Datum, React, Select, Strhelp, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Backbone = __webpack_require__(7);

	_ = __webpack_require__(8);

	Strhelp = __webpack_require__(25);

	Datum = __webpack_require__(6);

	Select = __webpack_require__(27);

	Select.Async = __webpack_require__(32);

	module.exports = CollectionPicker = (function(superClass) {
	  extend(CollectionPicker, superClass);

	  function CollectionPicker() {
	    this.groupSuggestionModels = bind(this.groupSuggestionModels, this);
	    this.filterSuggestionModels = bind(this.filterSuggestionModels, this);
	    this.onLoadOptions = bind(this.onLoadOptions, this);
	    this.onChange = bind(this.onChange, this);
	    this.getOptionValuesForReactSelect = bind(this.getOptionValuesForReactSelect, this);
	    return CollectionPicker.__super__.constructor.apply(this, arguments);
	  }

	  CollectionPicker.displayName = "react-datum.CollectionPicker";

	  CollectionPicker.propTypes = _.extend({}, Datum.propTypes, {
	    collection: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Collection), React.PropTypes.string, React.PropTypes.array]),
	    displayAttr: React.PropTypes.string,
	    optionDisplayAttr: React.PropTypes.string,
	    optionSaveAttr: React.PropTypes.string.isRequired,
	    displayComponent: React.PropTypes.node,
	    asyncSuggestionCallback: React.PropTypes.func,
	    multi: React.PropTypes.bool
	  });

	  CollectionPicker.defaultProps = _.extend({}, Datum.defaultProps, {
	    optionSaveAttr: 'id'
	  });

	  CollectionPicker.contextTypes = _.extend({}, Datum.contextTypes, {
	    collection: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Collection), React.PropTypes.string])
	  });

	  CollectionPicker.prototype.subClassName = "collection-picker";

	  CollectionPicker.prototype.renderValueForDisplay = function() {
	    var collection, modelValues;
	    collection = this.getCollection();
	    if (this.props.multi) {
	      modelValues = this.getModelValues();
	      return modelValues.map((function(_this) {
	        return function(modelValue) {
	          return _this.renderCollectionDisplayValue(modelValue, collection);
	        };
	      })(this));
	    } else {
	      return this.renderCollectionDisplayValue(this.getModelValue(), collection);
	    }
	  };

	  CollectionPicker.prototype.renderCollectionDisplayValue = function(modelId, collection) {
	    var modelValue;
	    if (collection == null) {
	      collection = this.getCollection();
	    }
	    modelValue = this.getCollectionModelDisplayValue(modelId, collection);
	    if (modelValue) {
	      modelValue = this.renderEllipsizedValue(modelValue);
	    }
	    return React.createElement("span", {
	      "key": modelValue,
	      "className": "collection-picker-display-value"
	    }, modelValue || this.renderPlaceholder() || "unknown");
	  };

	  CollectionPicker.prototype.renderInput = function() {
	    return React.createElement(Select.Async, React.__spread({}, this.getSelectAsyncOptions()));
	  };

	  CollectionPicker.prototype.getCollection = function() {
	    var collection;
	    collection = this.props.collection || this.context.collection;
	    if (collection == null) {
	      throw this.constructor.displayName + " requires a collection prop or context";
	    }
	    if (!(collection instanceof Backbone.Collection)) {
	      return new Backbone.Collection(collection);
	    }
	    return collection;
	  };

	  CollectionPicker.prototype._getCollectionModelById = function(modelOrId) {
	    var model, ref;
	    if (_.isNumber(modelOrId)) {
	      return model = (ref = this.getCollection()) != null ? ref.get(modelOrId, {
	        add: true
	      }) : void 0;
	    } else {
	      return model = modelOrId;
	    }
	  };

	  CollectionPicker.prototype.getCollectionModelDisplayValue = function(modelId, collection) {
	    var model;
	    if (!modelId) {
	      return null;
	    }
	    model = this._getCollectionModelById(modelId);
	    if ((model != null) && !_.isFunction(model.toString) && (this.props.displayAttr == null)) {
	      throw this.constructor.displayName + ": You need to specify a displayAttr prop or model must have toString() method";
	    }
	    if (this.props.displayAttr != null) {
	      return model != null ? model.get(this.props.displayAttr) : void 0;
	    } else {
	      return typeof model.toString === "function" ? model.toString() : void 0;
	    }
	  };

	  CollectionPicker.prototype.getOptionDisplayValue = function(modelId, collection) {
	    var model;
	    if (!modelId) {
	      return null;
	    }
	    model = this._getCollectionModelById(modelId);
	    if ((model != null) && !_.isFunction(model.toString) && (this.props.optionDisplayAttr == null)) {
	      throw this.constructor.displayName + ": You need to specify an optionDisplayAttr prop or model must have toString() method";
	    }
	    if (this.props.optionDisplayAttr != null) {
	      return model != null ? model.get(this.props.optionDisplayAttr) : void 0;
	    } else {
	      return typeof model.toString === "function" ? model.toString() : void 0;
	    }
	  };

	  CollectionPicker.prototype.getOptionSaveValue = function(modelId, collection) {
	    var model;
	    model = this._getCollectionModelById(modelId);
	    if ((model != null) && (this.props.optionsSaveAttr == null)) {
	      return model.id;
	    }
	    return model != null ? model.get(this.props.optionSaveAttr) : void 0;
	  };

	  CollectionPicker.prototype.getModelValues = function() {
	    var modelValue, modelValues;
	    modelValue = this.getModelValue();
	    modelValues = (function() {
	      switch (false) {
	        case !_.isString(modelValue):
	          return modelValue.split(',');
	        case !_.isArray(modelValue):
	          return modelValue;
	        default:
	          return [modelValue];
	      }
	    })();
	    return modelValues;
	  };

	  CollectionPicker.prototype.getSelectAsyncOptions = function() {
	    var collection, value;
	    collection = this.getCollection();
	    value = this.props.multi ? this.getModelValues() : this.getModelValue();
	    return _.extend({}, this.props, {
	      loadOptions: this.onLoadOptions,
	      placeholder: this.props.placeholder || this.renderPlaceholder(),
	      value: value,
	      onChange: this.onChange,
	      ref: this.onInputRef,
	      options: this.getOptionValuesForReactSelect(collection.models),
	      labelKey: "label",
	      valueKey: "value",
	      ref: "reactSelect"
	    });
	  };

	  CollectionPicker.prototype.getOptionValuesForReactSelect = function(models) {
	    if (models == null) {
	      return [];
	    }
	    return _.map(models, (function(_this) {
	      return function(m) {
	        return {
	          label: _this.getCollectionModelDisplayValue(m),
	          value: _this.getOptionSaveValue(m)
	        };
	      };
	    })(this));
	  };

	  CollectionPicker.prototype.onChange = function(optionsSelected) {
	    var values;
	    if (this.props.multi) {
	      values = _.pluck(optionsSelected, 'value');
	      if (!this.props.setAsArray) {
	        values = values.join(',');
	      }
	      return CollectionPicker.__super__.onChange.call(this, {
	        target: {
	          value: values
	        }
	      });
	    } else {
	      return CollectionPicker.__super__.onChange.call(this, {
	        target: {
	          value: optionsSelected.value
	        }
	      });
	    }
	  };

	  CollectionPicker.prototype.onLoadOptions = function(userInput, callback) {
	    var base, chainedCallback, collection, filteredModels;
	    collection = this.getCollection();
	    chainedCallback = (function(_this) {
	      return function(error, models) {
	        var optionsForReactSelect;
	        if (arguments.length < 2) {
	          models = error;
	          error = false;
	        }
	        models = _this.groupSuggestionModels(userInput, models);
	        optionsForReactSelect = _this.getOptionValuesForReactSelect(models);
	        return callback(null, {
	          options: optionsForReactSelect
	        });
	      };
	    })(this);
	    filteredModels = typeof collection.filterForPicker === "function" ? collection.filterForPicker(userInput, chainedCallback, this.props.asyncOptions) : void 0;
	    filteredModels || (filteredModels = typeof (base = this.props).asyncSuggestionCallback === "function" ? base.asyncSuggestionCallback(collection, userInput, chainedCallback, this.props.asyncOptions) : void 0);
	    filteredModels || (filteredModels = this.filterSuggestionModels(collection, userInput, chainedCallback, this.props.asyncOptions));
	    if (typeof filterModels === "undefined" || filterModels === null) {
	      chainedCallback(collection.models);
	    }
	  };


	  /* weak string compare userInput to suggestion model's display value */

	  CollectionPicker.prototype.filterSuggestionModels = function(collection, userInput, callback) {
	    var filteredModels;
	    filteredModels = _.filter(collection.models, (function(_this) {
	      return function(model) {
	        return Strhelp.weaklyHas(_this.getOptionDisplayValue(model), userInput);
	      };
	    })(this));
	    filteredModels = filteredModels.sort((function(_this) {
	      return function(a, b) {
	        return Strhelp.weaklyCompare(_this.getOptionDisplayValue(a), _this.getOptionDisplayValue(b));
	      };
	    })(this));
	    if (typeof callback === "function") {
	      callback(filteredModels);
	    }
	    return filteredModels;
	  };

	  CollectionPicker.prototype.groupSuggestionModels = function(userInput, models) {
	    var bottomHits, i, len, model, topHits;
	    topHits = [];
	    bottomHits = [];
	    for (i = 0, len = models.length; i < len; i++) {
	      model = models[i];
	      if (Strhelp.weaklyStartsWith(this.getOptionDisplayValue(model), userInput)) {
	        topHits.push(model);
	      } else {
	        bottomHits.push(model);
	      }
	    }
	    return topHits.concat(bottomHits);
	  };

	  return CollectionPicker;

	})(Datum);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(26);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var StringHelpers, _;

	_ = __webpack_require__(8);

	module.exports = StringHelpers = (function() {
	  function StringHelpers() {}

	  StringHelpers.trim = function(str) {
	    return str.replace(/^\s+|\s+$/g, "");
	  };

	  StringHelpers.startsWith = function(str, otherStr) {
	    return str.slice(0, otherStr.length) === otherStr;
	  };

	  StringHelpers.has = function(str, otherStr) {
	    return str.indexOf(otherStr) !== -1;
	  };

	  StringHelpers.weakValue = function(str, options) {
	    if (options == null) {
	      options = {};
	    }
	    _.defaults(options, {
	      ignoreCase: true,
	      useLocale: false,
	      trim: true
	    });
	    if (options.trim) {
	      str = this.trim(str);
	    }
	    if (options.ignoreCase) {
	      if (options.useLocale) {
	        return str = str.toLocaleLowerCase();
	      } else {
	        return str = str.toLowerCase();
	      }
	    }
	  };

	  StringHelpers.weaklyEqual = function(str, otherStr, options) {
	    if (options == null) {
	      options = {};
	    }
	    return this.weakValue(str, options) === this.weakValue(otherStr, options);
	  };

	  StringHelpers.weaklyCompare = function(str, otherStr, options) {
	    if (options == null) {
	      options = {};
	    }
	    return this.weakValue(str, options).localeCompare(this.weakValue(otherStr, options));
	  };

	  StringHelpers.weaklyHas = function(str, otherStr) {
	    return this.weakValue(str).indexOf(this.weakValue(otherStr)) !== -1;
	  };

	  StringHelpers.weaklyStartsWith = function(str, otherStr) {
	    return this.startsWith(this.weakValue(str), this.weakValue(otherStr));
	  };

	  return StringHelpers;

	})();


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(5);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactInputAutosize = __webpack_require__(28);

	var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

	var _classnames = __webpack_require__(29);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _stripDiacritics = __webpack_require__(31);

	var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

	var _Async = __webpack_require__(32);

	var _Async2 = _interopRequireDefault(_Async);

	var _Option = __webpack_require__(33);

	var _Option2 = _interopRequireDefault(_Option);

	var _Value = __webpack_require__(34);

	var _Value2 = _interopRequireDefault(_Value);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function stringifyValue(value) {
		if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
			return JSON.stringify(value);
		} else {
			return value;
		}
	}

	var Select = _react2.default.createClass({

		statics: { Async: _Async2.default },

		displayName: 'Select',

		propTypes: {
			addLabelText: _react2.default.PropTypes.string, // placeholder displayed when you want to add a label on a multi-value input
			allowCreate: _react2.default.PropTypes.bool, // whether to allow creation of new entries
			autofocus: _react2.default.PropTypes.bool, // autofocus the component on mount
			backspaceRemoves: _react2.default.PropTypes.bool, // whether backspace removes an item if there is no text input
			className: _react2.default.PropTypes.string, // className for the outer element
			clearAllText: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.node]), // title for the "clear" control when multi: true
			clearValueText: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.node]), // title for the "clear" control
			clearable: _react2.default.PropTypes.bool, // should it be possible to reset value
			delimiter: _react2.default.PropTypes.string, // delimiter to use to join multiple values for the hidden field value
			disabled: _react2.default.PropTypes.bool, // whether the Select is disabled or not
			escapeClearsValue: _react2.default.PropTypes.bool, // whether escape clears the value when the menu is closed
			filterOption: _react2.default.PropTypes.func, // method to filter a single option (option, filterString)
			filterOptions: _react2.default.PropTypes.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
			ignoreAccents: _react2.default.PropTypes.bool, // whether to strip diacritics when filtering
			ignoreCase: _react2.default.PropTypes.bool, // whether to perform case-insensitive filtering
			inputProps: _react2.default.PropTypes.object, // custom attributes for the Input
			isLoading: _react2.default.PropTypes.bool, // whether the Select is loading externally or not (such as options being loaded)
			labelKey: _react2.default.PropTypes.string, // path of the label value in option objects
			matchPos: _react2.default.PropTypes.string, // (any|start) match the start or entire string when filtering
			matchProp: _react2.default.PropTypes.string, // (any|label|value) which option property to filter on
			scrollMenuIntoView: _react2.default.PropTypes.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
			menuBuffer: _react2.default.PropTypes.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
			menuStyle: _react2.default.PropTypes.object, // optional style to apply to the menu
			menuContainerStyle: _react2.default.PropTypes.object, // optional style to apply to the menu container
			multi: _react2.default.PropTypes.bool, // multi-value input
			name: _react2.default.PropTypes.string, // generates a hidden <input /> tag with this field name for html forms
			newOptionCreator: _react2.default.PropTypes.func, // factory to create new options when allowCreate set
			noResultsText: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.node]), // placeholder displayed when there are no matching search results
			onBlur: _react2.default.PropTypes.func, // onBlur handler: function (event) {}
			onChange: _react2.default.PropTypes.func, // onChange handler: function (newValue) {}
			onFocus: _react2.default.PropTypes.func, // onFocus handler: function (event) {}
			onInputChange: _react2.default.PropTypes.func, // onInputChange handler: function (inputValue) {}
			onValueClick: _react2.default.PropTypes.func, // onClick handler for value labels: function (value, event) {}
			onMenuScrollToBottom: _react2.default.PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
			optionComponent: _react2.default.PropTypes.func, // option component to render in dropdown
			optionRenderer: _react2.default.PropTypes.func, // optionRenderer: function (option) {}
			options: _react2.default.PropTypes.array, // array of options
			placeholder: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.node]), // field placeholder, displayed when there's no value
			searchable: _react2.default.PropTypes.bool, // whether to enable searching feature or not
			simpleValue: _react2.default.PropTypes.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
			style: _react2.default.PropTypes.object, // optional style to apply to the control
			tabIndex: _react2.default.PropTypes.string, // optional tab index of the control
			value: _react2.default.PropTypes.any, // initial field value
			valueComponent: _react2.default.PropTypes.func, // value component to render
			valueKey: _react2.default.PropTypes.string, // path of the label value in option objects
			valueRenderer: _react2.default.PropTypes.func, // valueRenderer: function (option) {}
			wrapperStyle: _react2.default.PropTypes.object },

		// optional style to apply to the component wrapper
		getDefaultProps: function getDefaultProps() {
			return {
				addLabelText: 'Add "{label}"?',
				allowCreate: false,
				backspaceRemoves: true,
				clearAllText: 'Clear all',
				clearValueText: 'Clear value',
				clearable: true,
				delimiter: ',',
				disabled: false,
				escapeClearsValue: true,
				filterOptions: true,
				ignoreAccents: true,
				ignoreCase: true,
				inputProps: {},
				isLoading: false,
				labelKey: 'label',
				matchPos: 'any',
				matchProp: 'any',
				scrollMenuIntoView: true,
				menuBuffer: 0,
				multi: false,
				noResultsText: 'No results found',
				optionComponent: _Option2.default,
				placeholder: 'Select...',
				searchable: true,
				simpleValue: false,
				valueComponent: _Value2.default,
				valueKey: 'value'
			};
		},
		getInitialState: function getInitialState() {
			return {
				inputValue: '',
				isFocused: false,
				isLoading: false,
				isOpen: false,
				isPseudoFocused: false
			};
		},
		componentDidMount: function componentDidMount() {
			if (this.props.autofocus) {
				this.focus();
			}
		},
		componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
			if (prevState.inputValue !== this.state.inputValue && this.props.onInputChange) {
				this.props.onInputChange(this.state.inputValue);
			}
			if (this._scrollToFocusedOptionOnUpdate && this.refs.focused && this.refs.menu) {
				this._scrollToFocusedOptionOnUpdate = false;
				var focusedDOM = _reactDom2.default.findDOMNode(this.refs.focused);
				var menuDOM = _reactDom2.default.findDOMNode(this.refs.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();
				if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				}
			}
			if (this.props.scrollMenuIntoView && this.refs.menuContainer) {
				var menuContainerRect = this.refs.menuContainer.getBoundingClientRect();
				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollTo(0, window.scrollY + menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false });
			}
		},
		focus: function focus() {
			if (!this.refs.input) return;
			this.refs.input.focus();
		},
		handleMouseDown: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();

			// for the non-searchable select, toggle the menu
			if (!this.props.searchable) {
				this.focus();
				return this.setState({
					isOpen: !this.state.isOpen
				});
			}

			if (this.state.isFocused) {
				// if the input is focused, ensure the menu is open
				this.setState({
					isOpen: true,
					isPseudoFocused: false
				});
			} else {
				// otherwise, focus the input and open the menu
				this._openAfterFocus = true;
				this.focus();
			}
		},
		handleMouseDownOnArrow: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			// If the menu isn't open, let the event bubble to the main handleMouseDown
			if (!this.state.isOpen) {
				return;
			}
			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();
			// close the menu
			this.closeMenu();
		},
		closeMenu: function closeMenu() {
			this.setState({
				isOpen: false,
				isPseudoFocused: this.state.isFocused && !this.props.multi,
				inputValue: ''
			});
		},
		handleInputFocus: function handleInputFocus(event) {
			var isOpen = this.state.isOpen || this._openAfterFocus;
			if (this.props.onFocus) {
				this.props.onFocus(event);
			}
			this.setState({
				isFocused: true,
				isOpen: isOpen
			});
			this._openAfterFocus = false;
		},
		handleInputBlur: function handleInputBlur(event) {
			if (this.refs.menu && document.activeElement.isEqualNode(this.refs.menu)) {
				return;
			}

			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			this.setState({
				inputValue: '',
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			});
		},
		handleInputChange: function handleInputChange(event) {
			this.setState({
				isOpen: true,
				isPseudoFocused: false,
				inputValue: event.target.value
			});
		},
		handleKeyDown: function handleKeyDown(event) {
			if (this.props.disabled) return;
			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					return;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen) {
						return;
					}
					this.selectFocusedOption();
					break;
				case 13:
					// enter
					if (!this.state.isOpen) return;
					this.selectFocusedOption();
					break;
				case 27:
					// escape
					if (this.state.isOpen) {
						this.closeMenu();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
					}
					break;
				case 38:
					// up
					this.focusPreviousOption();
					break;
				case 40:
					// down
					this.focusNextOption();
					break;
				// case 188: // ,
				// 	if (this.props.allowCreate && this.props.multi) {
				// 		event.preventDefault();
				// 		event.stopPropagation();
				// 		this.selectFocusedOption();
				// 	} else {
				// 		return;
				// 	}
				// break;
				default:
					return;
			}
			event.preventDefault();
		},
		handleValueClick: function handleValueClick(option, event) {
			if (!this.props.onValueClick) return;
			this.props.onValueClick(option, event);
		},
		handleMenuScroll: function handleMenuScroll(event) {
			if (!this.props.onMenuScrollToBottom) return;
			var target = event.target;

			if (target.scrollHeight > target.offsetHeight && !(target.scrollHeight - target.offsetHeight - target.scrollTop)) {
				this.props.onMenuScrollToBottom();
			}
		},
		getOptionLabel: function getOptionLabel(op) {
			return op[this.props.labelKey];
		},
		getValueArray: function getValueArray() {
			var value = this.props.value;
			if (this.props.multi) {
				if (typeof value === 'string') value = value.split(this.props.delimiter);
				if (!Array.isArray(value)) {
					if (value === null || value === undefined) return [];
					value = [value];
				}
				return value.map(this.expandValue).filter(function (i) {
					return i;
				});
			}
			var expandedValue = this.expandValue(value);
			return expandedValue ? [expandedValue] : [];
		},
		expandValue: function expandValue(value) {
			if (typeof value !== 'string' && typeof value !== 'number') return value;
			var _props = this.props;
			var options = _props.options;
			var valueKey = _props.valueKey;

			if (!options) return;
			for (var i = 0; i < options.length; i++) {
				if (options[i][valueKey] === value) return options[i];
			}
		},
		setValue: function setValue(value) {
			var _this = this;

			if (!this.props.onChange) return;
			if (this.props.simpleValue && value) {
				value = this.props.multi ? value.map(function (i) {
					return i[_this.props.valueKey];
				}).join(this.props.delimiter) : value[this.props.valueKey];
			}
			this.props.onChange(value);
		},
		selectValue: function selectValue(value) {
			if (this.props.multi) {
				this.addValue(value);
				this.setState({
					inputValue: ''
				});
			} else {
				this.setValue(value);
				this.setState({
					isOpen: false,
					inputValue: '',
					isPseudoFocused: this.state.isFocused
				});
			}
		},
		addValue: function addValue(value) {
			var valueArray = this.getValueArray();
			this.setValue(valueArray.concat(value));
		},
		popValue: function popValue() {
			var valueArray = this.getValueArray();
			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(valueArray.slice(0, valueArray.length - 1));
		},
		removeValue: function removeValue(value) {
			var valueArray = this.getValueArray();
			this.setValue(valueArray.filter(function (i) {
				return i !== value;
			}));
			this.focus();
		},
		clearValue: function clearValue(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, ignore it.
			if (event && event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();
			this.setValue(null);
			this.setState({
				isOpen: false,
				inputValue: ''
			}, this.focus);
		},
		focusOption: function focusOption(option) {
			this.setState({
				focusedOption: option
			});
		},
		focusNextOption: function focusNextOption() {
			this.focusAdjacentOption('next');
		},
		focusPreviousOption: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		},
		focusAdjacentOption: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.filter(function (i) {
				return !i.disabled;
			});
			this._scrollToFocusedOptionOnUpdate = true;
			if (!this.state.isOpen) {
				this.setState({
					isOpen: true,
					inputValue: '',
					focusedOption: this._focusedOption || options[dir === 'next' ? 0 : options.length - 1]
				});
				return;
			}
			if (!options.length) return;
			var focusedIndex = -1;
			for (var i = 0; i < options.length; i++) {
				if (this._focusedOption === options[i]) {
					focusedIndex = i;
					break;
				}
			}
			var focusedOption = options[0];
			if (dir === 'next' && focusedIndex > -1 && focusedIndex < options.length - 1) {
				focusedOption = options[focusedIndex + 1];
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedOption = options[focusedIndex - 1];
				} else {
					focusedOption = options[options.length - 1];
				}
			}
			this.setState({
				focusedOption: focusedOption
			});
		},
		selectFocusedOption: function selectFocusedOption() {
			// if (this.props.allowCreate && !this.state.focusedOption) {
			// 	return this.selectValue(this.state.inputValue);
			// }
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			}
		},
		renderLoading: function renderLoading() {
			if (!this.props.isLoading) return;
			return _react2.default.createElement(
				'span',
				{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
				_react2.default.createElement('span', { className: 'Select-loading' })
			);
		},
		renderValue: function renderValue(valueArray, isOpen) {
			var _this2 = this;

			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;
			if (!valueArray.length) {
				return !this.state.inputValue ? _react2.default.createElement(
					'div',
					{ className: 'Select-placeholder' },
					this.props.placeholder
				) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;
			if (this.props.multi) {
				return valueArray.map(function (value, i) {
					return _react2.default.createElement(
						ValueComponent,
						{
							disabled: _this2.props.disabled || value.clearableValue === false,
							key: 'value-' + i + '-' + value[_this2.props.valueKey],
							onClick: onClick,
							onRemove: _this2.removeValue,
							value: value
						},
						renderLabel(value)
					);
				});
			} else if (!this.state.inputValue) {
				if (isOpen) onClick = null;
				return _react2.default.createElement(
					ValueComponent,
					{
						disabled: this.props.disabled,
						onClick: onClick,
						value: valueArray[0]
					},
					renderLabel(valueArray[0])
				);
			}
		},
		renderInput: function renderInput(valueArray) {
			var className = (0, _classnames2.default)('Select-input', this.props.inputProps.className);
			if (this.props.disabled || !this.props.searchable) {
				return _react2.default.createElement('div', _extends({}, this.props.inputProps, {
					className: className,
					tabIndex: this.props.tabIndex || 0,
					onBlur: this.handleInputBlur,
					onFocus: this.handleInputFocus,
					ref: 'input',
					style: { border: 0, width: 1, display: 'inline-block' } }));
			}
			return _react2.default.createElement(_reactInputAutosize2.default, _extends({}, this.props.inputProps, {
				className: className,
				tabIndex: this.props.tabIndex,
				onBlur: this.handleInputBlur,
				onChange: this.handleInputChange,
				onFocus: this.handleInputFocus,
				minWidth: '5',
				ref: 'input',
				value: this.state.inputValue
			}));
		},
		renderClear: function renderClear() {
			if (!this.props.clearable || !this.props.value || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
			return _react2.default.createElement(
				'span',
				{ className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText, 'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText, onMouseDown: this.clearValue, onTouchEnd: this.clearValue },
				_react2.default.createElement('span', { className: 'Select-clear', dangerouslySetInnerHTML: { __html: '&times;' } })
			);
		},
		renderArrow: function renderArrow() {
			return _react2.default.createElement(
				'span',
				{ className: 'Select-arrow-zone', onMouseDown: this.handleMouseDownOnArrow },
				_react2.default.createElement('span', { className: 'Select-arrow', onMouseDown: this.handleMouseDownOnArrow })
			);
		},
		filterOptions: function filterOptions(excludeOptions) {
			var _this3 = this;

			var filterValue = this.state.inputValue;
			var options = this.props.options || [];
			if (typeof this.props.filterOptions === 'function') {
				return this.props.filterOptions.call(this, options, filterValue, excludeOptions);
			} else if (this.props.filterOptions) {
				if (this.props.ignoreAccents) {
					filterValue = (0, _stripDiacritics2.default)(filterValue);
				}
				if (this.props.ignoreCase) {
					filterValue = filterValue.toLowerCase();
				}
				if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
					return i[_this3.props.valueKey];
				});
				return options.filter(function (option) {
					if (excludeOptions && excludeOptions.indexOf(option[_this3.props.valueKey]) > -1) return false;
					if (_this3.props.filterOption) return _this3.props.filterOption.call(_this3, option, filterValue);
					if (!filterValue) return true;
					var valueTest = String(option[_this3.props.valueKey]);
					var labelTest = String(option[_this3.props.labelKey]);
					if (_this3.props.ignoreAccents) {
						if (_this3.props.matchProp !== 'label') valueTest = (0, _stripDiacritics2.default)(valueTest);
						if (_this3.props.matchProp !== 'value') labelTest = (0, _stripDiacritics2.default)(labelTest);
					}
					if (_this3.props.ignoreCase) {
						if (_this3.props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
						if (_this3.props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
					}
					return _this3.props.matchPos === 'start' ? _this3.props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || _this3.props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : _this3.props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || _this3.props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
				});
			} else {
				return options;
			}
		},
		renderMenu: function renderMenu(options, valueArray, focusedOption) {
			var _this4 = this;

			if (options && options.length) {
				var _ret = (function () {
					var Option = _this4.props.optionComponent;
					var renderLabel = _this4.props.optionRenderer || _this4.getOptionLabel;
					return {
						v: options.map(function (option, i) {
							var isSelected = valueArray && valueArray.indexOf(option) > -1;
							var isFocused = option === focusedOption;
							var optionRef = isFocused ? 'focused' : null;
							var optionClass = (0, _classnames2.default)({
								'Select-option': true,
								'is-selected': isSelected,
								'is-focused': isFocused,
								'is-disabled': option.disabled
							});
							return _react2.default.createElement(
								Option,
								{
									className: optionClass,
									isDisabled: option.disabled,
									isFocused: isFocused,
									key: 'option-' + i + '-' + option[_this4.props.valueKey],
									onSelect: _this4.selectValue,
									onFocus: _this4.focusOption,
									option: option,
									isSelected: isSelected,
									ref: optionRef
								},
								renderLabel(option)
							);
						})
					};
				})();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			} else {
				return _react2.default.createElement(
					'div',
					{ className: 'Select-noresults' },
					this.props.noResultsText
				);
			}
		},
		renderHiddenField: function renderHiddenField(valueArray) {
			var _this5 = this;

			if (!this.props.name) return;
			var value = valueArray.map(function (i) {
				return stringifyValue(i[_this5.props.valueKey]);
			}).join(this.props.delimiter);
			return _react2.default.createElement('input', { type: 'hidden', ref: 'value', name: this.props.name, value: value, disabled: this.props.disabled });
		},
		getFocusableOption: function getFocusableOption(selectedOption) {
			var options = this._visibleOptions;
			if (!options.length) return;
			var focusedOption = this.state.focusedOption || selectedOption;
			if (focusedOption && options.indexOf(focusedOption) > -1) return focusedOption;
			for (var i = 0; i < options.length; i++) {
				if (!options[i].disabled) return options[i];
			}
		},
		render: function render() {
			var valueArray = this.getValueArray();
			var options = this._visibleOptions = this.filterOptions(this.props.multi ? valueArray : null);
			var isOpen = this.state.isOpen;
			if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOption = this._focusedOption = this.getFocusableOption(valueArray[0]);
			var className = (0, _classnames2.default)('Select', this.props.className, {
				'Select--multi': this.props.multi,
				'is-disabled': this.props.disabled,
				'is-focused': this.state.isFocused,
				'is-loading': this.props.isLoading,
				'is-open': isOpen,
				'is-pseudo-focused': this.state.isPseudoFocused,
				'is-searchable': this.props.searchable,
				'has-value': valueArray.length
			});
			return _react2.default.createElement(
				'div',
				{ ref: 'wrapper', className: className, style: this.props.wrapperStyle },
				this.renderHiddenField(valueArray),
				_react2.default.createElement(
					'div',
					{ ref: 'control', className: 'Select-control', style: this.props.style, onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
					this.renderValue(valueArray, isOpen),
					this.renderInput(valueArray),
					this.renderLoading(),
					this.renderClear(),
					this.renderArrow()
				),
				isOpen ? _react2.default.createElement(
					'div',
					{ ref: 'menuContainer', className: 'Select-menu-outer', style: this.props.menuContainerStyle },
					_react2.default.createElement(
						'div',
						{ ref: 'menu', className: 'Select-menu', style: this.props.menuStyle, onScroll: this.handleMenuScroll, onMouseDown: this.handleMouseDownOnMenu },
						this.renderMenu(options, !this.props.multi ? valueArray : null, focusedOption)
					)
				) : null
			);
		}
	});

	exports.default = Select;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}return target;
	};

	var React = __webpack_require__(3);

	var sizerStyle = { position: 'absolute', visibility: 'hidden', height: 0, width: 0, overflow: 'scroll', whiteSpace: 'nowrap' };

	var nextFrame = typeof window !== 'undefined' ? (function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	})().bind(window) : undefined; // If window is undefined, then we can't define a nextFrame function

	var AutosizeInput = React.createClass({
		displayName: 'AutosizeInput',

		propTypes: {
			value: React.PropTypes.any, // field value
			defaultValue: React.PropTypes.any, // default field value
			onChange: React.PropTypes.func, // onChange handler: function(newValue) {}
			style: React.PropTypes.object, // css styles for the outer element
			className: React.PropTypes.string, // className for the outer element
			minWidth: React.PropTypes.oneOfType([// minimum width for input element
			React.PropTypes.number, React.PropTypes.string]),
			inputStyle: React.PropTypes.object, // css styles for the input element
			inputClassName: React.PropTypes.string // className for the input element
		},
		getDefaultProps: function getDefaultProps() {
			return {
				minWidth: 1
			};
		},
		getInitialState: function getInitialState() {
			return {
				inputWidth: this.props.minWidth
			};
		},
		componentDidMount: function componentDidMount() {
			this.copyInputStyles();
			this.updateInputWidth();
		},
		componentDidUpdate: function componentDidUpdate() {
			this.queueUpdateInputWidth();
		},
		copyInputStyles: function copyInputStyles() {
			if (!this.isMounted() || !window.getComputedStyle) {
				return;
			}
			var inputStyle = window.getComputedStyle(this.refs.input);
			var widthNode = this.refs.sizer;
			widthNode.style.fontSize = inputStyle.fontSize;
			widthNode.style.fontFamily = inputStyle.fontFamily;
			widthNode.style.fontWeight = inputStyle.fontWeight;
			widthNode.style.fontStyle = inputStyle.fontStyle;
			widthNode.style.letterSpacing = inputStyle.letterSpacing;
			if (this.props.placeholder) {
				var placeholderNode = this.refs.placeholderSizer;
				placeholderNode.style.fontSize = inputStyle.fontSize;
				placeholderNode.style.fontFamily = inputStyle.fontFamily;
				placeholderNode.style.fontWeight = inputStyle.fontWeight;
				placeholderNode.style.fontStyle = inputStyle.fontStyle;
				placeholderNode.style.letterSpacing = inputStyle.letterSpacing;
			}
		},
		queueUpdateInputWidth: function queueUpdateInputWidth() {
			nextFrame(this.updateInputWidth);
		},
		updateInputWidth: function updateInputWidth() {
			if (!this.isMounted() || typeof this.refs.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = undefined;
			if (this.props.placeholder) {
				newInputWidth = Math.max(this.refs.sizer.scrollWidth, this.refs.placeholderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.refs.sizer.scrollWidth + 2;
			}
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		},
		getInput: function getInput() {
			return this.refs.input;
		},
		focus: function focus() {
			this.refs.input.focus();
		},
		select: function select() {
			this.refs.input.select();
		},
		render: function render() {
			var escapedValue = (this.props.value || '').replace(/\&/g, '&amp;').replace(/ /g, '&nbsp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
			var wrapperStyle = this.props.style || {};
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';
			var inputStyle = _extends({}, this.props.inputStyle);
			inputStyle.width = this.state.inputWidth;
			inputStyle.boxSizing = 'content-box';
			var placeholder = this.props.placeholder ? React.createElement('div', { ref: 'placeholderSizer', style: sizerStyle }, this.props.placeholder) : null;
			return React.createElement('div', { className: this.props.className, style: wrapperStyle }, React.createElement('input', _extends({}, this.props, { ref: 'input', className: this.props.inputClassName, style: inputStyle })), React.createElement('div', { ref: 'sizer', style: sizerStyle, dangerouslySetInnerHTML: { __html: escapedValue } }), placeholder);
		}
	});

	module.exports = AutosizeInput;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = ({}).hasOwnProperty;

		function classNames() {
			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if ("function" === 'function' && _typeof(__webpack_require__(30)) === 'object' && __webpack_require__(30)) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	})();

/***/ },
/* 30 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

	module.exports = function stripDiacritics(str) {
		for (var i = 0; i < map.length; i++) {
			str = str.replace(map[i].letters, map[i].base);
		}
		return str;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _Select = __webpack_require__(27);

	var _Select2 = _interopRequireDefault(_Select);

	var _stripDiacritics = __webpack_require__(31);

	var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var requestId = 0;

	function initCache(cache) {
		if (cache && (typeof cache === 'undefined' ? 'undefined' : _typeof(cache)) !== 'object') {
			cache = {};
		}
		return cache ? cache : null;
	}

	function updateCache(cache, input, data) {
		if (!cache) return;
		cache[input] = data;
	}

	function getFromCache(cache, input) {
		if (!cache) return;
		for (var i = input.length; i >= 0; --i) {
			var cacheKey = input.slice(0, i);
			if (cache[cacheKey] && (input === cacheKey || cache[cacheKey].complete)) {
				return cache[cacheKey];
			}
		}
	}

	function thenPromise(promise, callback) {
		if (!promise || typeof promise.then !== 'function') return;
		return promise.then(function (data) {
			callback(null, data);
		}, function (err) {
			callback(err);
		});
	}

	var Async = _react2.default.createClass({
		displayName: 'Async',

		propTypes: {
			cache: _react2.default.PropTypes.any, // object to use to cache results, can be null to disable cache
			loadOptions: _react2.default.PropTypes.func.isRequired, // function to call to load options asynchronously
			ignoreAccents: _react2.default.PropTypes.bool, // whether to strip diacritics when filtering (shared with Select)
			ignoreCase: _react2.default.PropTypes.bool, // whether to perform case-insensitive filtering (shared with Select)
			isLoading: _react2.default.PropTypes.bool, // overrides the isLoading state when set to true
			loadingPlaceholder: _react2.default.PropTypes.string, // replaces the placeholder while options are loading
			minimumInput: _react2.default.PropTypes.number, // the minimum number of characters that trigger loadOptions
			noResultsText: _react2.default.PropTypes.string, // placeholder displayed when there are no matching search results (shared with Select)
			placeholder: _react2.default.PropTypes.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
			_react2.default.PropTypes.string, _react2.default.PropTypes.node]),
			searchingText: _react2.default.PropTypes.string, // message to display while options are loading
			searchPromptText: _react2.default.PropTypes.string },
		// label to prompt for search input
		getDefaultProps: function getDefaultProps() {
			return {
				cache: true,
				ignoreAccents: true,
				ignoreCase: true,
				loadingPlaceholder: 'Loading...',
				minimumInput: 0,
				searchingText: 'Searching...',
				searchPromptText: 'Type to search'
			};
		},
		getInitialState: function getInitialState() {
			return {
				cache: initCache(this.props.cache),
				isLoading: false,
				options: []
			};
		},
		componentWillMount: function componentWillMount() {
			this._lastInput = '';
		},
		componentDidMount: function componentDidMount() {
			this.loadOptions('');
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (nextProps.cache !== this.props.cache) {
				this.setState({
					cache: initCache(nextProps.cache)
				});
			}
		},
		focus: function focus() {
			this.refs.select.focus();
		},
		resetState: function resetState() {
			this._currentRequestId = -1;
			this.setState({
				isLoading: false,
				options: []
			});
		},
		getResponseHandler: function getResponseHandler(input) {
			var _this = this;

			var _requestId = this._currentRequestId = requestId++;
			return function (err, data) {
				if (err) throw err;
				if (!_this.isMounted()) return;
				updateCache(_this.state.cache, input, data);
				if (_requestId !== _this._currentRequestId) return;
				_this.setState({
					isLoading: false,
					options: data && data.options || []
				});
			};
		},
		loadOptions: function loadOptions(input) {
			if (this.props.ignoreAccents) input = (0, _stripDiacritics2.default)(input);
			if (this.props.ignoreCase) input = input.toLowerCase();
			this._lastInput = input;
			if (input.length < this.props.minimumInput) {
				return this.resetState();
			}
			var cacheResult = getFromCache(this.state.cache, input);
			if (cacheResult) {
				return this.setState({
					options: cacheResult.options
				});
			}
			this.setState({
				isLoading: true
			});
			var responseHandler = this.getResponseHandler(input);
			return thenPromise(this.props.loadOptions(input, responseHandler), responseHandler);
		},
		render: function render() {
			var noResultsText = this.props.noResultsText;
			var _state = this.state;
			var isLoading = _state.isLoading;
			var options = _state.options;

			if (this.props.isLoading) isLoading = true;
			var placeholder = isLoading ? this.props.loadingPlaceholder : this.props.placeholder;
			if (!options.length) {
				if (this._lastInput.length < this.props.minimumInput) noResultsText = this.props.searchPromptText;
				if (isLoading) noResultsText = this.props.searchingText;
			}
			return _react2.default.createElement(_Select2.default, _extends({}, this.props, {
				ref: 'select',
				isLoading: isLoading,
				noResultsText: noResultsText,
				onInputChange: this.loadOptions,
				options: options,
				placeholder: placeholder
			}));
		}
	});

	module.exports = Async;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(29);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Option = _react2.default.createClass({
		displayName: 'Option',

		propTypes: {
			className: _react2.default.PropTypes.string, // className (based on mouse position)
			isDisabled: _react2.default.PropTypes.bool, // the option is disabled
			isFocused: _react2.default.PropTypes.bool, // the option is focused
			isSelected: _react2.default.PropTypes.bool, // the option is selected
			onSelect: _react2.default.PropTypes.func, // method to handle click on option element
			onFocus: _react2.default.PropTypes.func, // method to handle mouseEnter on option element
			onUnfocus: _react2.default.PropTypes.func, // method to handle mouseLeave on option element
			option: _react2.default.PropTypes.object.isRequired },
		// object that is base for that option
		blockEvent: function blockEvent(event) {
			event.preventDefault();
			event.stopPropagation();
			if (event.target.tagName !== 'A' || !('href' in event.target)) {
				return;
			}
			if (event.target.target) {
				window.open(event.target.href, event.target.target);
			} else {
				window.location.href = event.target.href;
			}
		},
		handleMouseDown: function handleMouseDown(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onSelect(this.props.option, event);
		},
		handleMouseEnter: function handleMouseEnter(event) {
			this.props.onFocus(this.props.option, event);
		},
		handleMouseMove: function handleMouseMove(event) {
			if (this.props.focused) return;
			this.props.onFocus(this.props.option, event);
		},
		render: function render() {
			var option = this.props.option;

			var className = (0, _classnames2.default)(this.props.className, option.className);

			return option.disabled ? _react2.default.createElement(
				'div',
				{ className: className,
					onMouseDown: this.blockEvent,
					onClick: this.blockEvent },
				this.props.children
			) : _react2.default.createElement(
				'div',
				{ className: className,
					style: option.style,
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					title: option.title },
				this.props.children
			);
		}
	});

	module.exports = Option;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(29);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Value = _react2.default.createClass({

		displayName: 'Value',

		propTypes: {
			disabled: _react2.default.PropTypes.bool, // disabled prop passed to ReactSelect
			onClick: _react2.default.PropTypes.func, // method to handle click on value label
			onRemove: _react2.default.PropTypes.func, // method to handle removal of the value
			value: _react2.default.PropTypes.object.isRequired },

		// the option object for this value
		handleMouseDown: function handleMouseDown(event) {
			if (event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			if (this.props.onClick) {
				event.stopPropagation();
				this.props.onClick(this.props.value, event);
				return;
			}
			if (this.props.value.href) {
				event.stopPropagation();
			}
		},
		onRemove: function onRemove(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onRemove(this.props.value);
		},
		renderRemoveIcon: function renderRemoveIcon() {
			if (this.props.disabled || !this.props.onRemove) return;
			return _react2.default.createElement(
				'span',
				{ className: 'Select-value-icon',
					onMouseDown: this.onRemove,
					onTouchEnd: this.onRemove },
				'×'
			);
		},
		renderLabel: function renderLabel() {
			var className = 'Select-value-label';
			return this.props.onClick || this.props.value.href ? _react2.default.createElement(
				'a',
				{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				this.props.children
			) : _react2.default.createElement(
				'span',
				{ className: className },
				this.props.children
			);
		},
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)('Select-value', this.props.value.className),
					style: this.props.value.style,
					title: this.props.value.title
				},
				this.renderRemoveIcon(),
				this.renderLabel()
			);
		}
	});

	module.exports = Value;

/***/ }
/******/ ])
});
;