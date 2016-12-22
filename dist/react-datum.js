(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("backbone"), require("underscore"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "backbone", "underscore"], factory);
	else if(typeof exports === 'object')
		exports["ReactDatum"] = factory(require("react"), require("react-dom"), require("backbone"), require("underscore"));
	else
		root["ReactDatum"] = factory(root["React"], root["ReactDOM"], root["Backbone"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
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

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var ReactDatum = {
	  // contextual components
	  ClickToEditForm: __webpack_require__(3),
	  ContextualData: __webpack_require__(11),
	  Collection: __webpack_require__(12),
	  CollectionStats: __webpack_require__(15),
	  Form: __webpack_require__(5),
	  Model: __webpack_require__(16),
	  SelectedModel: __webpack_require__(17),

	  // Datums
	  Datum: __webpack_require__(7),
	  Email: __webpack_require__(18),
	  LazyPhoto: __webpack_require__(19),
	  Link: __webpack_require__(20),
	  Number: __webpack_require__(21),
	  Percent: __webpack_require__(22),
	  Text: __webpack_require__(23),
	  Label: __webpack_require__(24),
	  WholeNumber: __webpack_require__(25),

	  // react-select 
	  ReactSelect: __webpack_require__(26),
	  SelectOption: __webpack_require__(39),

	  // Global options
	  Options: __webpack_require__(10),

	  // TODO : i think this will eventually go to a separate npm package so that the core doesn't
	  //    have dependency on react-select
	  CollectionPicker: __webpack_require__(40)

	};
	if (window) window.ReactDatum = ReactDatum;

	if (module) module.exports = ReactDatum;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var ClickToEditForm, Form, React,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	Form = __webpack_require__(5);

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
	    if (this.props.readonly) {
	      return React.createElement("span", null);
	    } else {
	      return React.createElement("button", {
	        "key": "edit",
	        "className": "btn btn-primary",
	        "onClick": this.onEditClick
	      }, "Edit");
	    }
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
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Datum, Form, React, ReactDom, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	React = __webpack_require__(4);

	ReactDom = __webpack_require__(6);

	Datum = __webpack_require__(7);

	Backbone = __webpack_require__(8);

	_ = __webpack_require__(9);

	module.exports = Form = (function(superClass) {
	  extend(Form, superClass);

	  Form.displayName = "react-datum.Form";

	  Form.modelOrObject = function() {
	    return React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Model), React.PropTypes.object]);
	  };

	  Form.propTypes = {
	    model: Form.modelOrObject(),
	    modelSaveMethod: React.PropTypes.string,
	    readonly: React.PropTypes.bool,
	    buttonPosition: React.PropTypes.oneOf(['top', 'bottom', 'none']),
	    className: React.PropTypes.string,
	    saveSuccessCallback: React.PropTypes.func,
	    saveErrorCallback: React.PropTypes.func
	  };

	  Form.defaultProps = {
	    readonly: false,
	    buttonPosition: 'bottom',
	    className: 'form',
	    modelSaveMethod: 'save'
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
	      "className": "form " + this.datumInputMode + " " + this.props.className
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
	    return saved = model[this.props.modelSaveMethod]({}, options);
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
	    return model.set(this._savedAttrs);
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
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Datum, Options, React, ReactDOM, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	ReactDOM = __webpack_require__(6);

	Backbone = __webpack_require__(8);

	_ = __webpack_require__(9);

	Options = __webpack_require__(10);

	module.exports = Datum = (function(superClass) {
	  extend(Datum, superClass);

	  Datum.displayName = "react-datum.Datum";

	  Datum.propTypes = {
	    className: React.PropTypes.string,
	    model: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Model), React.PropTypes.object]),
	    attr: React.PropTypes.string,
	    label: React.PropTypes.node,
	    tooltip: React.PropTypes.string,
	    placeholder: React.PropTypes.node,
	    inputMode: React.PropTypes.oneOf(['readonly', 'edit', 'inlineEdit']),
	    getMetadata: React.PropTypes.func,
	    noPopover: React.PropTypes.bool,
	    setOnChange: React.PropTypes.bool,
	    setOnBlur: React.PropTypes.bool,
	    saveOnSet: React.PropTypes.bool,
	    modelSaveMethod: React.PropTypes.string,
	    modelSaveOptions: React.PropTypes.object,
	    savedIndicatorTimeout: React.PropTypes.number,
	    readonly: React.PropTypes.bool,
	    required: React.PropTypes.bool,
	    style: React.PropTypes.object,
	    asDiv: React.PropTypes.bool,
	    onChange: React.PropTypes.func,
	    value: React.PropTypes.node
	  };

	  Datum.defaultProps = {
	    setOnBlur: true,
	    setOnChange: false,
	    saveOnSet: false,
	    modelSaveMethod: 'save',
	    savedIndicatorTimeout: 5000
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
	    this.getInputComponent = bind(this.getInputComponent, this);
	    this.setValue = bind(this.setValue, this);
	    this.onInputKeyDown = bind(this.onInputKeyDown, this);
	    this.onDocumentKeydown = bind(this.onDocumentKeydown, this);
	    this.onDocumentClick = bind(this.onDocumentClick, this);
	    this.onModelSaveError = bind(this.onModelSaveError, this);
	    this.onModelSaveSuccess = bind(this.onModelSaveSuccess, this);
	    this.onBlur = bind(this.onBlur, this);
	    this.onChange = bind(this.onChange, this);
	    this.onEditClick = bind(this.onEditClick, this);
	    this.addValidations = bind(this.addValidations, this);
	    Datum.__super__.constructor.call(this, props);
	    this.initializeState();
	    this.addValidations(this.validateRequired);
	  }

	  Datum.prototype.initializeState = function() {
	    return this.state = {
	      errors: [],
	      isDirty: false,
	      saving: false,
	      saved: null
	    };
	  };

	  Datum.prototype.componentWillMount = function() {
	    return this.initializeState();
	  };

	  Datum.prototype.componentDidMount = function() {
	    var modelValue, ref, ref1;
	    if ((ref = this.context) != null) {
	      if ((ref1 = ref.form) != null) {
	        if (typeof ref1.addDatum === "function") {
	          ref1.addDatum(this);
	        }
	      }
	    }
	    modelValue = this.getModelValue();
	    document.addEventListener('click', this.onDocumentClick);
	    return document.addEventListener('keydown', this.onDocumentKeydown);
	  };

	  Datum.prototype.componentWillReceiveProps = function(nextProps) {
	    var newModelValue, prevModelValue;
	    prevModelValue = this.getModelValue(this.props);
	    newModelValue = this.getModelValue(nextProps);
	    if (JSON.stringify(prevModelValue) !== JSON.stringify(newModelValue)) {
	      return this.setState({
	        value: newModelValue
	      });
	    }
	  };

	  Datum.prototype.componentWillUnmount = function() {
	    var ref, ref1;
	    if ((ref = this.context) != null) {
	      if ((ref1 = ref.form) != null) {
	        if (typeof ref1.removeDatum === "function") {
	          ref1.removeDatum(this);
	        }
	      }
	    }
	    if (this.isDirty() && this.shouldSetOnBlur()) {
	      this.setValue(this.state.value, {
	        setModelValue: true
	      });
	    }
	    document.removeEventListener('click', this.onDocumentClick);
	    return document.removeEventListener('keydown', this.onDocumentKeydown);
	  };

	  Datum.prototype.render = function() {
	    return this.renderDatumWrapper((function(_this) {
	      return function() {
	        if (_this.isEditing()) {
	          return _this.renderForInput();
	        } else {
	          return _this.renderForDisplay();
	        }
	      };
	    })(this));
	  };

	  Datum.prototype.renderDatumWrapper = function(contentFn) {
	    var wrapperProps;
	    wrapperProps = {
	      className: this.getFullClassName(),
	      'data-zattr': this.props.attr,
	      style: this.props.style || {}
	    };
	    if (this.props.asDiv) {
	      return React.createElement("div", React.__spread({}, wrapperProps), contentFn());
	    } else {
	      return React.createElement("span", React.__spread({}, wrapperProps), contentFn());
	    }
	  };

	  Datum.prototype.renderForDisplay = function() {
	    return React.createElement("span", null, this.renderLabel(), this.renderValueOrPlaceholder(), this.renderIcons());
	  };

	  Datum.prototype.renderLabel = function() {
	    var label, labelProps, tooltip;
	    labelProps = {};
	    tooltip = this.getPropOrMetadata('tooltip');
	    label = this.getPropOrMetadata('label') != null ? this.renderWithPopover(React.createElement("label", React.__spread({}, labelProps), this.getPropOrMetadata('label')), tooltip, 'datumTooltip', 'datum-tooltip') : null;
	    return label;
	  };


	  /*
	    Override this method only if you need to not render the placeholder.
	   */

	  Datum.prototype.renderValueOrPlaceholder = function() {
	    var displayValue, placeholderValue;
	    if (this.getModelValue() != null) {
	      displayValue = this.renderValueForDisplay();
	      return this.renderWrappedDisplayValue(displayValue);
	    } else {
	      placeholderValue = this.renderPlaceholder();
	      return this.renderWrappedDisplayValue(placeholderValue);
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
	      "className": "datum-display-value",
	      "onClick": this.onEditClick,
	      "style": this.props.style
	    }, value);
	  };

	  Datum.prototype.renderPlaceholder = function() {
	    var placeholder;
	    placeholder = this.getPropOrMetadata('placeholder');
	    if (placeholder == null) {
	      return null;
	    }
	    return React.createElement("span", {
	      "className": "placeholder"
	    }, placeholder);
	  };


	  /*
	    Note that this method is not called by Datum directly.  It is 
	    provided here in the Datum base class so that any Datum extensions 
	    can ellipsize whatever part of their rendering neccessary and have 
	    a consistent prop and method for doing so.
	   */

	  Datum.prototype.renderEllipsizedValue = function(value, options) {
	    var ellipsizeAt, ellipsizedValue;
	    if (options == null) {
	      options = {};
	    }
	    if (value == null) {
	      return value;
	    }
	    ellipsizeAt = this.getEllipsizeAt();
	    if (value && _.isString(value) && ellipsizeAt && value.length > ellipsizeAt) {
	      if (this.props.reverseEllipsis) {
	        ellipsizedValue = '...' + value.slice(value.length - (ellipsizeAt - 3), value.length - 1);
	      } else {
	        ellipsizedValue = value.slice(0, ellipsizeAt - 3) + '...';
	      }
	      return this.renderWithPopover(ellipsizedValue, value, 'datumEllipsizedValue', 'datum-ellipsized');
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
	    inputMode='edit'.
	    
	    If you override this method, be sure to add @onBlur() and @onChange() to your input
	    component
	   */

	  Datum.prototype.renderInput = function() {
	    return React.createElement("input", React.__spread({}, this.getInputComponentOptions()));
	  };

	  Datum.prototype.renderIcons = function() {
	    var className, error, errorIcon, errorIconClass, errors, i, len, ref;
	    if (!(this.state.errors.length > 0)) {
	      return null;
	    }
	    errors = [];
	    className = "error validation";
	    errorIconClass = Options.get('errorIconClass');
	    errorIcon = errorIconClass != null ? React.createElement("i", {
	      "className": errorIconClass
	    }) : '!';
	    if ((this.getReactBootstrap() != null) && !this.props.noPopover) {
	      ref = this.state.errors;
	      for (i = 0, len = ref.length; i < len; i++) {
	        error = ref[i];
	        errors.push(React.createElement("div", null, error));
	      }
	    } else {
	      errors = this.state.errors.join('\n');
	    }
	    return this.renderWithPopover(errorIcon, errors, 'datumInvalid', 'datum-invalid');
	  };

	  Datum.prototype.renderWithPopover = function(value, tooltip, popoverId, valueClass) {
	    var Rb, popover, rValue;
	    if (tooltip == null) {
	      return value;
	    }
	    Rb = this.getReactBootstrap();
	    if ((Rb != null) && !this.props.noPopover) {
	      popover = React.createElement(Rb.Popover, {
	        "id": popoverId
	      }, tooltip);
	      rValue = React.createElement(Rb.OverlayTrigger, React.__spread({
	        "overlay": popover
	      }, Options.get('RbOverlayProps')), React.createElement("span", {
	        "className": valueClass
	      }, value));
	    } else {
	      rValue = React.createElement("span", {
	        "className": valueClass,
	        "title": tooltip
	      }, value);
	    }
	    return rValue;
	  };


	  /*
	    This method can be overriden to provide custom determination of dirty state.
	    dirty meaning, has the input value changed.  The base implementation assumes
	    that the base behavior of setting state.value to null on model.set() happens.
	   */

	  Datum.prototype.isDirty = function() {
	    return this.state.isDirty;
	  };


	  /*
	    This method is called to determine if the inputMode (prop, context) is one
	    of the editable types.  ('edit' or 'inlineEdit')
	    
	    Note that a return of true does NOT indicate that the Datum is in its 
	    edit display.  If the component is an inputMode='inlineEdit', in may be
	    showing it's display presentation.  See also isEditing()
	   */

	  Datum.prototype.isEditable = function() {
	    var inputMode;
	    inputMode = this.getInputMode();
	    if (inputMode === "edit" || inputMode === "inlineEdit") {
	      return true;
	    }
	  };


	  /*
	    This method is called to determine if the Datum is displaying its input
	    presentation.
	   */

	  Datum.prototype.isEditing = function() {
	    var inputMode;
	    inputMode = this.getInputMode();
	    return inputMode === 'edit' || (this.isInlineEdit() && this.constructor.inlineEditor === this);
	  };

	  Datum.prototype.isInlineEdit = function() {
	    return this.getInputMode() === 'inlineEdit';
	  };

	  Datum.prototype.cancelEdit = function() {
	    return this.setState({
	      errors: [],
	      value: this.getModelValue()
	    });
	  };


	  /*
	    When extending Datum, use @addValidations from constructor to add additional validations.
	    'required' validation is automatically added (only invalid if empty and has 'required' prop)
	    
	    For example, see [Number datum](#Number)
	    
	    You can add validations to an individual instance of any Datum extension.
	    
	    `validations` argument should be one or an array of methods that accept the (value) to
	    validate and return true if valid, false if not.
	   */

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

	  Datum.prototype.getInputComponentOptions = function() {
	    var placeholder, value;
	    placeholder = this.getPropOrMetadata('placeholder') || "";
	    value = this.getValueForInput();
	    return {
	      type: "text",
	      placeholder: placeholder,
	      value: value,
	      onChange: this.onChange,
	      onBlur: this.onBlur,
	      onKeyDown: this.onInputKeyDown,
	      ref: this.onInputRef
	    };
	  };


	  /* 
	    This method should return the value for display from the model. You 
	    can extend this method in a custom Datum to coerce or manipulate just
	    the value used for display.   
	    
	    In most cases, you'll probably want to extend the Datum.renderValueForDisplay() 
	    instead
	   */

	  Datum.prototype.getValueForDisplay = function() {
	    return this.getModelValue();
	  };


	  /*
	    Extend this method to coerce or intepret the value from the model
	    that is displayed when in input
	   */

	  Datum.prototype.getValueForInput = function() {
	    if (this.state.value != null) {
	      return this.state.value;
	    } else {
	      return this.getModelValue();
	    }
	  };


	  /*
	    this method returns the value in the input as seen by user
	   */

	  Datum.prototype.getInputValue = function() {
	    return this.state.value;
	  };


	  /*
	    returns the Backbone Model currently associated with the datum.
	   */

	  Datum.prototype.getModel = function(newProps, newContext) {
	    if (newProps == null) {
	      newProps = this.props;
	    }
	    if (newContext == null) {
	      newContext = this.context;
	    }
	    return (newProps != null ? newProps.model : void 0) || (newContext != null ? newContext.model : void 0) || new Backbone.Model();
	  };


	  /*
	    Returns the value set via value prop or the value currently set on the model
	    
	    warning: Do not override this method to return a component element or jsx; bad things will happen.
	   */

	  Datum.prototype.getModelValue = function(newProps, newContext) {
	    var model, value;
	    if (newProps == null) {
	      newProps = this.props;
	    }
	    if (newContext == null) {
	      newContext = this.context;
	    }
	    if (newProps.value !== void 0) {
	      return this.state.shadowValue || newProps.value;
	    }
	    if (!(model = this.getModel(newProps, newContext))) {
	      return null;
	    }
	    value = _.isFunction(model.get) ? model.get(newProps.attr) : model[newProps.attr];
	    return value;
	  };


	  /*
	    Extend this model to interpret the value prior to saving for example a Percent datum
	    that the user enters a value that is 100x what gets saved to model
	    
	    options pass through to model.set()
	   */

	  Datum.prototype.setModelValue = function(value, options) {
	    var model;
	    if (value == null) {
	      value = this.getInputValue();
	    }
	    if (options == null) {
	      options = {};
	    }
	    if (value === void 0) {
	      return;
	    }
	    model = this.getModel();
	    if (model != null) {
	      if (_.isFunction(model.set)) {
	        model.set(this.props.attr, value, options);
	      } else {
	        model[this.props.attr] = value;
	      }
	      if (this.props.saveOnSet) {
	        this.saveModel();
	      }
	    }
	    if (this.props.value !== void 0) {
	      return this.setState({
	        shadowValue: value
	      });
	    }
	  };

	  Datum.prototype.saveModel = function() {
	    var model;
	    model = this.getModel();
	    if (model == null) {
	      return;
	    }
	    if (_.isFunction(model[this.props.modelSaveMethod])) {
	      return this.setState({
	        saving: true
	      }, (function(_this) {
	        return function() {
	          return model[_this.props.modelSaveMethod]({}, _this.getModelSaveOptions());
	        };
	      })(this));
	    } else {
	      return console.error("Datum:setModelValue - saveOnSet true but modelSaveMethod (" + this.props.modelSaveMethod + ") is not a function on model");
	    }
	  };

	  Datum.prototype.getModelSaveOptions = function() {
	    var originalError, originalSuccess, saveOptions;
	    saveOptions = _.extend({}, this.props.modelSaveOptions);
	    originalSuccess = saveOptions.success;
	    originalError = saveOptions.error;
	    saveOptions.success = (function(_this) {
	      return function(model, resp) {
	        _this.onModelSaveSuccess(model, resp);
	        return typeof originalSuccess === "function" ? originalSuccess(model, resp, _this) : void 0;
	      };
	    })(this);
	    saveOptions.error = (function(_this) {
	      return function(model, resp) {
	        _this.onModelSaveError(model, resp);
	        return typeof originalError === "function" ? originalError(model, resp, _this) : void 0;
	      };
	    })(this);
	    return saveOptions;
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
	    if (this.state.saving) {
	      className += " saving";
	    }
	    if (this.state.saved === false) {
	      className += " not-saved";
	    }
	    if (this.state.saved === true) {
	      className += " saved";
	    }
	    if (this.props.className != null) {
	      className += " " + this.props.className;
	    }
	    return className;
	  };

	  Datum.prototype.getPropOrMetadata = function(prop) {
	    var base, ref;
	    if (this.props[prop] !== void 0) {
	      return this.props[prop];
	    }
	    return (typeof (base = this.props).getMetadata === "function" ? base.getMetadata(prop, this) : void 0) || ((ref = this.getModel()) != null ? typeof ref.getDatumMetadata === "function" ? ref.getDatumMetadata(prop, this) : void 0 : void 0) || void 0;
	  };

	  Datum.prototype.getReactBootstrap = function() {
	    return Options.get('ReactBootstrap') || (typeof window !== "undefined" && window !== null ? window.ReactBootstrap : void 0);
	  };

	  Datum.prototype.shouldSetOnChange = function() {
	    return this.props.setOnChange === true || (this.isInlineEdit() && !this.props.setOnChange === false);
	  };

	  Datum.prototype.shouldSetOnBlur = function() {
	    return this.props.setOnBlur === true && !this.shouldSetOnChange() && !this.props.multi;
	  };

	  Datum.prototype.onEditClick = function(synthEvent) {
	    var ref;
	    if (this.inlineToEditMode()) {
	      synthEvent.stopPropagation();
	      return (ref = synthEvent.nativeEvent) != null ? typeof ref.stopImmediatePropagation === "function" ? ref.stopImmediatePropagation() : void 0 : void 0;
	    }
	  };

	  Datum.prototype.onChange = function(event, options) {
	    var ref, ref1, value;
	    if (options == null) {
	      options = {};
	    }
	    options = _.defaults(options, {
	      silent: false,
	      event: event,
	      propsOnChangeValue: null
	    });
	    value = (event != null ? (ref = event.target) != null ? ref.value : void 0 : void 0) != null ? event != null ? (ref1 = event.target) != null ? ref1.value : void 0 : void 0 : event;
	    this.setValue(value, {
	      setModelValue: this.shouldSetOnChange()
	    });
	    if (this.shouldSetOnChange()) {
	      this.inlineToDisplayMode();
	    }
	    if ((this.props.onChange != null) && !options.silent) {
	      return this.props.onChange(options.propsOnChangeValue || value, this, options);
	    }
	  };

	  Datum.prototype.onBlur = function(event) {
	    var value;
	    value = this.getInputValue();
	    if (!this.hasInputValueChanged()) {
	      return;
	    }
	    this.setValue(value, {
	      setModelValue: this.shouldSetOnBlur()
	    });
	    return this.inlineToDisplayMode();
	  };

	  Datum.prototype.onModelSaveSuccess = function(model, resp) {
	    this.setState({
	      saving: false,
	      saved: true
	    });
	    if (this.props.savedIndicatorTimeout != null) {
	      return _.delay(((function(_this) {
	        return function() {
	          return _this.setState({
	            saved: null
	          });
	        };
	      })(this)), this.props.savedIndicatorTimeout);
	    }
	  };

	  Datum.prototype.onModelSaveError = function(model, resp) {
	    var errors;
	    errors = this.state.errors || [];
	    errors.push("Unable to save value. Error: " + resp);
	    this.setState({
	      saving: false,
	      saved: false,
	      errors: errors
	    });
	    if (this.props.savedIndicatorTimeout != null) {
	      return _.delay((function(_this) {
	        return function() {
	          return _this.setState({
	            saved: null
	          });
	        };
	      })(this), this.props.savedIndicatorTimeout);
	    }
	  };

	  Datum.prototype.onDocumentClick = function(evt) {
	    if (this.isInlineEdit() && this.isEditing() && !this.isElementOrParentOf(evt.target, ReactDOM.findDOMNode(this))) {
	      return this.inlineToDisplayMode();
	    }
	  };

	  Datum.prototype.onDocumentKeydown = function(evt) {
	    if (this.isInlineEdit() && this.isEditing() && evt.keyCode === 27) {
	      return this.inlineToDisplayMode();
	    }
	  };

	  Datum.prototype.isElementOrParentOf = function(elementInQuestion, parentElement) {
	    var el;
	    el = elementInQuestion;
	    while (el != null) {
	      if (el === parentElement) {
	        return true;
	      }
	      el = el.parentElement;
	    }
	    return false;
	  };

	  Datum.prototype.hasInputValueChanged = function() {
	    var inputValue;
	    inputValue = this.getInputValue();
	    return inputValue !== void 0 && inputValue !== this.getModelValue();
	  };

	  Datum.prototype.inlineToDisplayMode = function() {
	    if (!this.isInlineEdit()) {
	      return false;
	    }
	    if (this.constructor.inlineEditor === this) {
	      this.constructor.inlineEditor = null;
	      this.forceUpdate();
	    }
	    return true;
	  };

	  Datum.prototype.inlineToEditMode = function() {
	    if (!this.isInlineEdit()) {
	      return false;
	    }
	    if (this.constructor.inlineEditor != null) {
	      this.constructor.inlineEditor.inlineToDisplayMode();
	    }
	    this.constructor.inlineEditor = this;
	    this.forceUpdate();
	    _.defer((function(_this) {
	      return function() {
	        return _this.focus();
	      };
	    })(this));
	    return true;
	  };

	  Datum.prototype.onInputKeyDown = function(event) {
	    var base;
	    return typeof (base = this.props).onKeyDown === "function" ? base.onKeyDown(event) : void 0;
	  };

	  Datum.prototype.setValue = function(newValue, options) {
	    var valid;
	    if (options == null) {
	      options = {};
	    }
	    options = _.defaults(options, {
	      setModelValue: false
	    });
	    valid = this.validate(newValue);
	    if (options.setModelValue) {
	      this.setModelValue(newValue);
	      this.setState({
	        isDirty: false
	      });
	    } else {
	      this.setState({
	        isDirty: true
	      });
	    }
	    return this.setState({
	      value: newValue
	    });
	  };


	  /*
	    This method can be used to get at the inner input component if one exists, only
	    while inputMode=='edit'
	   */

	  Datum.prototype.getInputComponent = function() {
	    return this.inputComponent;
	  };

	  Datum.prototype.onInputRef = function(input) {
	    return this.inputComponent = input;
	  };

	  Datum.prototype.focus = function() {
	    var node;
	    if (this.getInputComponent() != null) {
	      node = ReactDOM.findDOMNode(this.getInputComponent());
	      node.focus();
	      return node.select();
	    }
	  };


	  /*
	    This method is called to validate the value in the input.
	    
	    Note that validations such as props.required also need to apply if the user 
	    hasn't changed the input, so the default value is the coalesce of state.value
	    or model value.  state.value (see getInputValue()) is null if the user has
	    not made changes.
	   */

	  Datum.prototype.validate = function(value) {
	    var errors, i, len, ref, valid, validation;
	    if (value == null) {
	      value = this.getValueForInput();
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
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Options, _, __options;

	_ = __webpack_require__(9);

	__options = {
	  ReactBootstrap: (typeof window !== "undefined" && window !== null ? window.ReactBootstrap : void 0) || null,
	  errorIconClass: null
	};


	/*
	  These are global options used to control various aspects
	  of ReactDatum rendering and functionality.

	  Currently supported configurable options:

	    ReactBootstrap: Defaults to global 'ReactBootstrap' if it exists.
	      If set this option will use ReactBootstrap for popovers such as when
	      a Datum is ellipsized and for validation errors. 
	      If not set, ReactDatum will use the HTML5 title tooltips for popovers
	      
	    RbOverlayProps: 
	      You can change the placement, trigger, etc used for popovers when using
	      ReactBootstrap.
	      
	    errorIconClass: default: null.  Icon css class to use for indicating 
	      validation errors. If not set, a red unicode exclamation point is used.
	 */

	module.exports = Options = (function() {
	  function Options() {}


	  /*
	    These are defaulted onto whatever is provided via ReactDatum.Options.set().
	   */

	  Options._defaults = {
	    errorIconClass: null,
	    ReactBootstrap: null,
	    RbOverlayProps: {
	      trigger: ['hover', 'focus'],
	      placement: 'right'
	    }
	  };

	  Options._options = _.extend({}, Options._defaults);


	  /*
	    Use to set a ReactDatum option.  Arguments can be either `(key, value)` or `({key: value, key: value})`
	      
	    Examples:
	    ```
	      ReactDatum = require('react-datum')
	      
	      // use the version of react bootstrap I got somewhere 
	      ReactDatum.Options.set('ReactBootstrap', loadedBootstrapLib)
	      
	      // use the fontawesome 4.5 exclamation sign icon for errors
	      ReactDatum.Options.set('errorIconClass', 'fa fa-exclamation-circle')
	    
	      // change the placement of the popover (if using ReactBootstrap)
	      ReactDatum.Options.set({RbOverlayProps: {placement: 'bottom'}})
	    ```
	   */

	  Options.set = function(option, value) {
	    var _options, extension, key;
	    _options = Options._options;
	    extension = {};
	    if (_.isObject(option)) {
	      extension = option;
	    } else {
	      extension[option] = value;
	    }
	    for (key in extension) {
	      value = extension[key];
	      if ((this._options[key] != null) && _.isObject(this._options[key]) && _.isObject(value)) {
	        _.extend(this._options[key], value);
	      } else {
	        this._options[key] = value;
	      }
	    }
	    return this._options;
	  };


	  /*
	    Get a previously set option or it's default if not set.  Returns full set of options if no option arg 
	    is provided.
	   */

	  Options.get = function(option) {
	    if (option == null) {
	      option = null;
	    }
	    if (option == null) {
	      return _.extend({}, this._options);
	    }
	    return this._options[option];
	  };

	  return Options;

	})();


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, ContextualData, React, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	Backbone = __webpack_require__(8);

	_ = __webpack_require__(9);


	/*
	  This is an abstract base class for contextual data components like ReactDatum.Collection 
	  and ReactDatum.Model that provide a single contextual data element.
	  
	  The ReactDatum.ContextualData base class also provides the listener to model or collection
	  events and rendering of child components on changes.
	  
	  You shouldn't need to use this class directly.
	 */

	module.exports = ContextualData = (function(superClass) {
	  extend(ContextualData, superClass);


	  /*
	    This is the class of thing being placed in the context.
	      ex. `Backbone.Model` or `Backbone.Collection`
	   */

	  ContextualData.prototype.dataType = null;


	  /*
	   this is the key in @context children should use to access thing
	    ex. "model"
	   */

	  ContextualData.prototype.contextKey = null;

	  ContextualData.propTypes = {
	    fetch: React.PropTypes.bool,
	    fetchOptions: React.PropTypes.object,
	    placeholder: React.PropTypes.node,
	    className: React.PropTypes.string,
	    debouncedUpdate: React.PropTypes.bool,
	    debounceMs: React.PropTypes.number,
	    debug: React.PropTypes.bool,
	    style: React.PropTypes.object
	  };

	  ContextualData.childContextTypes = {};

	  ContextualData.defaultProps = {
	    fetch: false,
	    fetchOptions: {},
	    placeholder: void 0,
	    style: {},
	    debouncedUpdate: true,
	    debounceMs: 0
	  };

	  function ContextualData(props) {
	    this.update = bind(this.update, this);
	    this.onDataChanged = bind(this.onDataChanged, this);
	    ContextualData.__super__.constructor.call(this, props);
	    this.state = {
	      lastUpdated: null,
	      collectionOrModel: null
	    };
	    this.debouncedUpdate = this.props.debouncedUpdate ? _.debounce(((function(_this) {
	      return function() {
	        return _this.update();
	      };
	    })(this)), this.props.debounceMs) : this.update;
	  }

	  ContextualData.prototype.getChildContext = function() {
	    var c;
	    c = {};
	    c[this.contextKey] = this.state.collectionOrModel;
	    return c;
	  };

	  ContextualData.prototype.render = function() {
	    var className;
	    className = "contextual-data " + this.contextKey;
	    if (this.props.className != null) {
	      className += " " + this.props.className;
	    }
	    return React.createElement("span", {
	      "style": _.extend({}, this.props.style),
	      "className": className
	    }, this.renderContent());
	  };

	  ContextualData.prototype.renderContent = function() {
	    if ((this.state.collectionOrModel != null) || this.props.placeholder === void 0) {
	      return this.props.children;
	    }
	    return this.props.placeholder;
	  };

	  ContextualData.prototype.componentWillUnmount = function() {
	    return this.unbindEvents();
	  };

	  ContextualData.prototype.componentWillMount = function() {
	    return this.initializeCollectionOrModel();
	  };

	  ContextualData.prototype.componentWillReceiveProps = function(newProps) {
	    this.props = newProps;
	    return this.initializeCollectionOrModel();
	  };


	  /*
	    override this model to do a custom fetch method like fetchForUser or some such
	   */

	  ContextualData.prototype.fetchCollectionOrModel = function() {
	    return this.state.collectionOrModel.fetch(this.props.fetchOptions);
	  };


	  /*
	    extend this method to provide additional initialization on the 
	    thing you provide.  You should probably call super
	   */

	  ContextualData.prototype.initializeCollectionOrModel = function() {
	    if (!this.needsReinitializing()) {
	      return;
	    }
	    this.unbindEvents();
	    this.setCollectionOrModel();
	    this.bindEvents();
	    if (this.props.fetch && (this.state.collectionOrModel != null)) {
	      return this.fetchCollectionOrModel();
	    }
	  };


	  /*
	    override this method to input from somewhere other than the context or props being passed in
	   */

	  ContextualData.prototype.getInputCollectionOrModel = function() {
	    return this.props[this.contextKey] || this.context[this.contextKey];
	  };


	  /*
	    override or extend this method to provide something other than what we recieve
	   */

	  ContextualData.prototype.getCollectionOrModelToProvide = function() {
	    return this.getInputCollectionOrModel();
	  };


	  /*
	    extend this method to provide additional tests to determine if initialization is 
	    needed.  You should probably extend this method like so:
	    ```
	      return super() || this._someOtherTest()
	    ```
	   */

	  ContextualData.prototype.needsReinitializing = function() {
	    var collectionOrModel, truth;
	    collectionOrModel = this.getCollectionOrModelToProvide();
	    truth = (this.state.collectionOrModel == null) || collectionOrModel !== this._lastPropsModel;
	    this._lastPropsModel = collectionOrModel;
	    return truth;
	  };

	  ContextualData.prototype.setCollectionOrModel = function() {
	    var collectionOrModel;
	    collectionOrModel = this.getCollectionOrModelToProvide();
	    this.setState({
	      collectionOrModel: collectionOrModel
	    });
	    return this.state.collectionOrModel = collectionOrModel;
	  };

	  ContextualData.prototype.bindEvents = function() {
	    var ref;
	    return (ref = this.state.collectionOrModel) != null ? ref.on('all', this.onDataChanged, this) : void 0;
	  };

	  ContextualData.prototype.unbindEvents = function() {
	    var ref;
	    return (ref = this.state.collectionOrModel) != null ? ref.off('all', this.onDataChanged) : void 0;
	  };

	  ContextualData.prototype.onDataChanged = function() {
	    return this.debouncedUpdate();
	  };

	  ContextualData.prototype.update = function() {
	    if (this.props.debug) {
	      console.log("ContextualData: update on model", this.state.collectionOrModel);
	    }
	    this.setState({
	      lastUpdated: Date.now(),
	      collectionOrModel: this.getCollectionOrModelToProvide()
	    });
	    if (this.props.forceUpdate) {
	      return this.forceUpdate();
	    }
	  };

	  return ContextualData;

	})(React.Component);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Collection, ContextualData, React, SelectableCollection, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	Backbone = __webpack_require__(8);

	_ = __webpack_require__(9);

	SelectableCollection = __webpack_require__(13);

	ContextualData = __webpack_require__(11);

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

	  Collection.prototype.setCollectionOrModel = function() {
	    var collection;
	    Collection.__super__.setCollectionOrModel.apply(this, arguments);
	    collection = this.state.collectionOrModel;
	    if (!((collection == null) || collection.hasSelectableCollectionMixin)) {
	      SelectableCollection.applyTo(collection);
	    }
	    return collection;
	  };

	  return Collection;

	})(ContextualData);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(14);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var SelectableCollection, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	_ = __webpack_require__(9);

	module.exports = SelectableCollection = (function() {
	  function SelectableCollection() {
	    this.setActiveModelById = bind(this.setActiveModelById, this);
	    this.setActiveIndex = bind(this.setActiveIndex, this);
	    this.getActiveModel = bind(this.getActiveModel, this);
	    this.setActiveModel = bind(this.setActiveModel, this);
	    this.selectNone = bind(this.selectNone, this);
	    this.selectAll = bind(this.selectAll, this);
	    this.selectModelByIndex = bind(this.selectModelByIndex, this);
	    this.selectModelById = bind(this.selectModelById, this);
	    this.selectModel = bind(this.selectModel, this);
	  }


	  /*
	    This method is used to mix SelectableCollection features into a Backbone Collection.
	    
	    example:
	    ```javascript
	      kittensCollection = new Backbone.Collection()
	      SelectableCollection.applyTo(kittensCollection)
	    ```
	   */

	  SelectableCollection.applyTo = function(collection) {
	    if (collection.hasSelectableCollectionMixin) {
	      return;
	    }
	    collection.hasSelectableCollection = true;
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


	  /*
	    Collection instance method that returns an array of selected models
	   */

	  SelectableCollection.prototype.getSelectedModels = function() {
	    return _.filter(this.models, function(m) {
	      return m.selected;
	    });
	  };


	  /*
	    Collection instance method that selects a single model.
	   
	    The model will be given a `selected` property of true.
	   
	    The `selected` argument can be one of:
	    `true`    - model argument will be selected
	    `false`   - unselect model
	    "toggle"` - invert current selected state
	    
	    Example: 
	    ```javascript
	      myCollection.selectModel(myModel)
	      console.log(myModel.selected)
	       * => true
	    ```
	   */

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


	  /*
	    Collection instance method that selects a single model by ID.
	    
	    collection.get(id) is used to get the model passed to selectModel method.
	    
	    See also [selectModel method](#selectModel) for options
	   */

	  SelectableCollection.prototype.selectModelById = function(id, selected, options) {
	    if (selected == null) {
	      selected = true;
	    }
	    if (options == null) {
	      options = {};
	    }
	    return this.selectModel(this.get(id), selected, options);
	  };


	  /*
	    Collection instance method that selects a single model by it's zero based index
	    in the collection.
	  
	    See also [selectModel method](#selectModel) for options
	   */

	  SelectableCollection.prototype.selectModelByIndex = function(index, selected, options) {
	    if (selected == null) {
	      selected = true;
	    }
	    if (options == null) {
	      options = {};
	    }
	    return this.selectModel(this.models[index], selected, options);
	  };


	  /*
	    Collection instance method that selects all models in the collection.
	  
	    A single *selectionsChanged* event is triggered unless options.silent==true
	   */

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


	  /*
	    Collection instance method that unselects all models.  Also sets activeModel to null.
	  
	    A *selectionsChanged* event is triggered unless options.silent==true. 
	    A *activeModelChanged* event is also fired
	   */

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
	    if (!options.silent) {
	      this.trigger('selectionsChanged');
	    }
	    return this.setActiveModel(null);
	  };


	  /*
	    Collection instance method that sets the current 'active' Model.  Multiple models may be 
	    selected in the collection, only one model can be 'active'.   The active model is also
	    selected in the collection if not already selected.  
	    
	    SetActiveModel() is an optional feature. Active model can be used, as it is by 
	    [tilegrid](https://github.com/zulily/tilegrid), to provide both multiple selections and
	    a single selection within that set (the last tile added to the selections)
	      
	    pass in null for model argument to unset active model
	   */

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


	  /*
	    Collection instance method that returns the current active model.
	   */

	  SelectableCollection.prototype.getActiveModel = function() {
	    return this.activeModel;
	  };


	  /*
	    Collection instance method that sets the active model by index in collection.
	    
	    see [setActiveModel](#setActiveModel) for options
	   */

	  SelectableCollection.prototype.setActiveIndex = function(index, options) {
	    if (options == null) {
	      options = {};
	    }
	    return this.setActiveModel(this.models[index]);
	  };


	  /*
	    Collection instance method that sets the active model by id in collection.
	    
	    see [setActiveModel](#setActiveModel) for options
	   */

	  SelectableCollection.prototype.setActiveModelById = function(modelId, options) {
	    if (options == null) {
	      options = {};
	    }
	    return this.setActiveModel(this.get(modelId), options);
	  };

	  return SelectableCollection;

	})();


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, CollectionStats, React,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	Backbone = __webpack_require__(8);

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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, ContextualData, Model, React, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	Backbone = __webpack_require__(8);

	_ = __webpack_require__(9);

	ContextualData = __webpack_require__(11);

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, ContextualData, React, SelectedModel,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	Backbone = __webpack_require__(8);

	ContextualData = __webpack_require__(11);

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
	    var superContent;
	    superContent = SelectedModel.__super__.renderContent.apply(this, arguments);
	    if (this.state.collectionOrModel != null) {
	      return superContent;
	    }
	    return React.createElement("div", {
	      "className": "large-placeholder"
	    }, this.props.placeholder);
	  };

	  SelectedModel.prototype.needsReinitializing = function() {
	    var truth;
	    truth = SelectedModel.__super__.needsReinitializing.call(this) || this.context.collection !== this._lastContextCollection;
	    this._lastContextCollection = this.context.collection;
	    return truth;
	  };


	  /*
	    override - We are going to provide a 'model' context (contextKey), but we listen to a 
	    collection
	   */

	  SelectedModel.prototype.getInputCollectionOrModel = function() {
	    return this.props.collection || this.context.collection;
	  };

	  SelectedModel.prototype.getCollectionOrModelToProvide = function() {
	    var collection;
	    collection = this.props.collection || this.context.collection;
	    return collection != null ? typeof collection.getSelectedModels === "function" ? collection.getSelectedModels()[0] : void 0 : void 0;
	  };

	  SelectedModel.prototype.bindEvents = function(model) {
	    var ref;
	    SelectedModel.__super__.bindEvents.apply(this, arguments);
	    return (ref = this.getInputCollectionOrModel()) != null ? ref.on("selectionsChanged", this._onSelectionsChanged) : void 0;
	  };

	  SelectedModel.prototype.unbindEvents = function() {
	    var ref;
	    SelectedModel.__super__.unbindEvents.apply(this, arguments);
	    return (ref = this.getInputCollectionOrModel()) != null ? ref.off("selectionsChanged", this._onSelectionsChanged) : void 0;
	  };

	  SelectedModel.prototype._onSelectionsChanged = function() {
	    this.setCollectionOrModel();
	    return this.forceUpdate();
	  };

	  return SelectedModel;

	})(ContextualData);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, Email, React, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	_ = __webpack_require__(9);

	Datum = __webpack_require__(7);


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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, LazyPhoto, React,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	Datum = __webpack_require__(7);


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

	  LazyPhoto.prototype.notFoundUrl = "http://zulily.github.io/react-datum/img/petals.png";

	  LazyPhoto.prototype.loadingUrl = "http://zulily.github.io/react-datum/img/blank.jpg";

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, Link, React, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	_ = __webpack_require__(9);

	Datum = __webpack_require__(7);


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
	    reverseEllipsis: React.PropTypes.bool
	  });

	  Link.defaultProps = _.extend({}, Datum.defaultProps, {
	    ellipsizeAt: 35,
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
	    var contentValue;
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
	      return this.renderEllipsizedValue(this.getModelValue());
	    }
	  };

	  return Link;

	})(Datum);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, Number, ONE_BILLION, ONE_MILLION, ONE_THOUSAND, RECOGNIZED_FORMATS, React, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	React = __webpack_require__(4);

	_ = __webpack_require__(9);

	Datum = __webpack_require__(7);

	ONE_BILLION = 1000000000;

	ONE_MILLION = 1000000;

	ONE_THOUSAND = 1000;

	RECOGNIZED_FORMATS = ['abbreviate', 'money', 'comma', 'percent'];


	/*
	  For real numbers.

	  Only allows `/^\-?[0-9]*\.?[0-9]*$/` on input
	 */

	module.exports = Number = (function(superClass) {
	  extend(Number, superClass);

	  Number.displayName = "react-datum.Number";

	  Number.propTypes = _.extend({}, Datum.propTypes, {
	    format: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.string]),
	    decimalPlaces: React.PropTypes.number,
	    zeroFill: React.PropTypes.bool,
	    minValue: React.PropTypes.number,
	    maxValue: React.PropTypes.number
	  });

	  Number.defaultProps = _.extend({}, Datum.defaultProps, {
	    decimalPlaces: null,
	    zeroFill: null,
	    format: ['comma']
	  });

	  Number.prototype.charactersMustMatch = /^\-?[0-9]*\.?[0-9]*$/;

	  Number.getComaAddedValue = function(value) {
	    var decimal, ref, wholeNumber;
	    ref = value.toString().split('.'), wholeNumber = ref[0], decimal = ref[1];
	    value = wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    if (decimal != null) {
	      value += '.' + decimal;
	    }
	    return value;
	  };


	  /*
	    fail proof conversion from sting to float that will never return NaN
	   */

	  Number.safelyFloat = function(value) {
	    var error, floatValue;
	    if (value == null) {
	      return 0;
	    }
	    try {
	      floatValue = parseFloat(value);
	    } catch (error) {
	      console.error("unparseable float " + value);
	      return 0;
	    }
	    if (_.isNaN(floatValue)) {
	      return 0;
	    } else {
	      return floatValue;
	    }
	  };

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


	  /*
	    overrides super - adds formatting
	   */

	  Number.prototype.renderValueForDisplay = function() {
	    var formats, value;
	    value = parseFloat(this.getModelValue());
	    formats = this.getFormats();
	    if (indexOf.call(formats, 'percent') >= 0) {
	      value *= 100;
	    }
	    value = this.roundToDecimalPlaces(value, {
	      formats: formats
	    });
	    value = this.abbreviate(value, formats);
	    value = this.addCommas(value, formats);
	    value = this.monitize(value, formats);
	    if (indexOf.call(formats, 'percent') >= 0) {
	      value += "%";
	    }
	    return value;
	  };

	  Number.prototype.renderPlaceHolder = function() {
	    if (this.getPropOrMetadata('placeholder') != null) {
	      Number.__super__.renderPlaceHolder.apply(this, arguments);
	    }
	    return React.createElement("span", null, "0");
	  };

	  Number.prototype.getFormats = function() {
	    var ref;
	    if (_.isArray(this.props.format)) {
	      return this.props.format;
	    } else {
	      return ((ref = this.props.format) != null ? ref.toString().split(' ') : void 0) || [];
	    }
	  };

	  Number.prototype.getValueForInput = function() {
	    return Number.__super__.getValueForInput.apply(this, arguments);
	  };

	  Number.prototype.onChange = function(event) {
	    var inputValue;
	    inputValue = event.target.value;
	    if (this.isAcceptableInput(inputValue)) {
	      return Number.__super__.onChange.apply(this, arguments);
	    }
	  };

	  Number.prototype.validateMin = function(value) {
	    var minValue;
	    minValue = this.getPropOrMetadata('minValue');
	    if (minValue == null) {
	      return true;
	    }
	    if (value >= minValue) {
	      return true;
	    }
	    return "The value must be greater than or equal to " + minValue;
	  };

	  Number.prototype.validateMax = function(value) {
	    var maxValue;
	    maxValue = this.getPropOrMetadata('maxValue');
	    if (maxValue == null) {
	      return true;
	    }
	    if (value <= maxValue) {
	      return true;
	    }
	    return "The value must be less than or equal to " + maxValue;
	  };


	  /*  
	    returns a string with number value input rounded to user requested props.decimalPlaces 
	      and optionally zeroFilled if @props.zeroFill == true
	    note that 'money', when not 'abbreviate'd should zero fill out to two decimal places 
	    unless props indicate otherwise
	   */

	  Number.prototype.roundToDecimalPlaces = function(value, options) {
	    if (options == null) {
	      options = {};
	    }
	    options = _.defaults(options, {
	      formats: this.getFormats(),
	      decimalPlaces: this.props.decimalPlaces,
	      zeroFill: this.props.zeroFill
	    });
	    if (indexOf.call(options.formats, 'money') >= 0) {
	      if (options.decimalPlaces == null) {
	        options.decimalPlaces = 2;
	      }
	      if (options.zeroFill == null) {
	        options.zeroFill = !(indexOf.call(options.formats, 'abbreviate') >= 0);
	      }
	    }
	    if (options.decimalPlaces != null) {
	      value = parseFloat(value).toFixed(options.decimalPlaces);
	      if (!options.zeroFill) {
	        value = parseFloat(value).toString();
	      }
	    }
	    return value;
	  };


	  /*  
	    returns a string with number value abbreviated and rounded to user 
	    requested props.decimalPlaces
	   */

	  Number.prototype.abbreviate = function(value, formats) {
	    var absValue, affix, ref;
	    if (formats == null) {
	      formats = this.getFormats();
	    }
	    if (indexOf.call(formats, 'abbreviate') >= 0) {
	      value = parseFloat(value);
	      absValue = Math.abs(value);
	      ref = absValue >= ONE_BILLION ? [value / ONE_BILLION, "B"] : absValue >= ONE_MILLION ? [value / ONE_MILLION, "M"] : absValue >= ONE_THOUSAND ? [value / ONE_THOUSAND, "K"] : [value, ""], value = ref[0], affix = ref[1];
	      value = "" + (this.roundToDecimalPlaces(value, {
	        formats: formats
	      }));
	      if ((affix != null ? affix.length : void 0) > 0) {
	        value += " " + affix;
	      }
	    }
	    return value;
	  };

	  Number.prototype.addCommas = function(value, formats) {
	    if (formats == null) {
	      formats = this.getFormats();
	    }
	    if (indexOf.call(formats, 'comma') >= 0) {
	      value = Number.getComaAddedValue(value);
	    }
	    return value;
	  };

	  Number.prototype.monitize = function(value, formats) {
	    if (formats == null) {
	      formats = this.getFormats();
	    }
	    if (indexOf.call(formats, 'money') >= 0) {
	      value = "$" + value;
	    }
	    return value;
	  };

	  return Number;

	})(Datum);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Number, Percent, React,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	Number = __webpack_require__(21);


	/*
	  This datum is an extension of [ReactDatum.Number](http://zulily.github.io/react-datum/docs/api/#Number) for
	  display and input of percent values.   
	  
	  - Display value is affixed with '%' 
	  - Display and input value are model value * 100 (model value is assumed to be 
	  fractional value)
	  - User input is assumed to be number percentage (* 100)
	  - props.decimalPlaces is respected for both display and input


	  Number datum has (maybe use to have) a format called  'percent' that will also
	  do a little part of what Percent datum does.  The Percent datum is meant to 
	  supercede 'percent' format to Number datum.
	 */

	module.exports = Percent = (function(superClass) {
	  extend(Percent, superClass);

	  function Percent() {
	    return Percent.__super__.constructor.apply(this, arguments);
	  }

	  Percent.displayName = "react-datum.Percent";


	  /*
	    Model value returned is multiplied by 100.  Internal value for Percent
	    is always the whole number displayed percentage rounded to requested
	    decimal places.
	   */

	  Percent.prototype.getModelValue = function() {
	    var superValue;
	    superValue = Percent.__super__.getModelValue.apply(this, arguments);
	    if (superValue == null) {
	      return superValue;
	    }
	    return this.roundToDecimalPlaces(Number.safelyFloat(superValue) * 100);
	  };


	  /*
	    What get's saved to the model is the user entered value divided by 100
	   */

	  Percent.prototype.setModelValue = function(value, options) {
	    var floatValue;
	    if (value == null) {
	      value = this.getInputValue();
	    }
	    if (options == null) {
	      options = {};
	    }
	    if (value == null) {
	      return;
	    }
	    value || (value = 0);
	    floatValue = Number.safelyFloat(value) / 100;
	    return Percent.__super__.setModelValue.call(this, floatValue, options);
	  };


	  /*
	    Other formats like 'money' and 'abbreviate' are ignored.  Override react-datum.Money
	   */

	  Percent.prototype.getFormats = function() {
	    return [];
	  };


	  /*
	    Renders value for display as nn.n%.
	    
	    Base number has (maybe use to have) a format called  'percent' that will also
	    do this little part of it.  The Percent datum is meant to supercede 'percent' 
	    format to Number datum.
	   */

	  Percent.prototype.renderValueForDisplay = function() {
	    var superVal;
	    superVal = Percent.__super__.renderValueForDisplay.apply(this, arguments);
	    return superVal + '%';
	  };

	  return Percent;

	})(Number);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, React, Text, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	_ = __webpack_require__(9);

	Datum = __webpack_require__(7);


	/*
	  see ./text.md
	 */

	module.exports = Text = (function(superClass) {
	  extend(Text, superClass);

	  Text.displayName = "react-datum.Text";

	  Text.propTypes = _.extend({}, Datum.propTypes, {
	    displayAsHtml: React.PropTypes.bool,
	    ellipsizeAt: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
	    reverseEllipsis: React.PropTypes.bool
	  });

	  Text.defaultProps = _.extend({}, Datum.defaultProps, {
	    ellipsizeAt: 35,
	    reverseEllipsis: false
	  });

	  function Text() {
	    Text.__super__.constructor.apply(this, arguments);
	  }

	  Text.prototype.render = function() {
	    return Text.__super__.render.apply(this, arguments);
	  };

	  Text.prototype.renderValueForDisplay = function() {
	    return this.renderEllipsizedValue(Text.__super__.renderValueForDisplay.apply(this, arguments));
	  };


	  /* 
	    Extends Datum#renderWrappedDisplayValue to provide support for displayAsHtml
	    option.
	   */

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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Label, React, Text, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	_ = __webpack_require__(9);

	Text = __webpack_require__(23);


	/*
	  see ./label.md
	 */

	module.exports = Label = (function(superClass) {
	  extend(Label, superClass);

	  function Label() {
	    return Label.__super__.constructor.apply(this, arguments);
	  }

	  Label.displayName = "react-datum.Label";

	  Label.prototype.render = function() {
	    return Label.__super__.render.apply(this, arguments);
	  };

	  Label.prototype.renderValueForDisplay = function() {
	    var label, labelProps, superVal, tooltip;
	    superVal = Label.__super__.renderValueForDisplay.apply(this, arguments);
	    labelProps = {
	      style: this.props.style
	    };
	    tooltip = this.getPropOrMetadata('tooltip');
	    label = superVal != null ? this.renderWithPopover(React.createElement("label", React.__spread({}, labelProps), superVal), tooltip, 'datumLabelTooltip', 'datum-tooltip') : null;
	    return label;
	  };

	  Label.prototype.getModelValue = function(newProps, newContext) {
	    if (newProps == null) {
	      newProps = this.props;
	    }
	    if (newContext == null) {
	      newContext = this.context;
	    }
	    if (newProps.children != null) {
	      return newProps.children;
	    }
	    return Label.__super__.getModelValue.apply(this, arguments);
	  };

	  return Label;

	})(Text);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var Number, React, WholeNumber,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 Copyright (c) 2016 Jed Watson.
	 Licensed under the MIT License (MIT), see
	 http://jedwatson.github.io/react-select
	*/

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}return target;
	};

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _objectWithoutProperties(obj, keys) {
		var target = {};for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
		}return target;
	}

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
		} else {
			obj[key] = value;
		}return obj;
	}

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(6);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactInputAutosize = __webpack_require__(27);

	var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

	var _classnames = __webpack_require__(28);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _utilsDefaultArrowRenderer = __webpack_require__(30);

	var _utilsDefaultArrowRenderer2 = _interopRequireDefault(_utilsDefaultArrowRenderer);

	var _utilsDefaultFilterOptions = __webpack_require__(31);

	var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

	var _utilsDefaultMenuRenderer = __webpack_require__(33);

	var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

	var _Async = __webpack_require__(34);

	var _Async2 = _interopRequireDefault(_Async);

	var _AsyncCreatable = __webpack_require__(35);

	var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

	var _Creatable = __webpack_require__(36);

	var _Creatable2 = _interopRequireDefault(_Creatable);

	var _Option = __webpack_require__(37);

	var _Option2 = _interopRequireDefault(_Option);

	var _Value = __webpack_require__(38);

	var _Value2 = _interopRequireDefault(_Value);

	function stringifyValue(value) {
		var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
		if (valueType === 'string') {
			return value;
		} else if (valueType === 'object') {
			return JSON.stringify(value);
		} else if (valueType === 'number' || valueType === 'boolean') {
			return String(value);
		} else {
			return '';
		}
	}

	var stringOrNode = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]);

	var instanceId = 1;

	var Select = _react2['default'].createClass({

		displayName: 'Select',

		propTypes: {
			LabelText: _react2['default'].PropTypes.string, // placeholder displayed when you want to add a label on a multi-value input
			'aria-label': _react2['default'].PropTypes.string, // Aria label (for assistive tech)
			'aria-labelledby': _react2['default'].PropTypes.string, // HTML ID of an element that should be used as the label (for assistive tech)
			arrowRenderer: _react2['default'].PropTypes.func, // Create drop-down caret element
			autoBlur: _react2['default'].PropTypes.bool, // automatically blur the component when an option is selected
			autofocus: _react2['default'].PropTypes.bool, // autofocus the component on mount
			autosize: _react2['default'].PropTypes.bool, // whether to enable autosizing or not
			backspaceRemoves: _react2['default'].PropTypes.bool, // whether backspace removes an item if there is no text input
			backspaceToRemoveMessage: _react2['default'].PropTypes.string, // Message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
			className: _react2['default'].PropTypes.string, // className for the outer element
			clearAllText: stringOrNode, // title for the "clear" control when multi: true
			clearValueText: stringOrNode, // title for the "clear" control
			clearable: _react2['default'].PropTypes.bool, // should it be possible to reset value
			delimiter: _react2['default'].PropTypes.string, // delimiter to use to join multiple values for the hidden field value
			disabled: _react2['default'].PropTypes.bool, // whether the Select is disabled or not
			escapeClearsValue: _react2['default'].PropTypes.bool, // whether escape clears the value when the menu is closed
			filterOption: _react2['default'].PropTypes.func, // method to filter a single option (option, filterString)
			filterOptions: _react2['default'].PropTypes.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
			ignoreAccents: _react2['default'].PropTypes.bool, // whether to strip diacritics when filtering
			ignoreCase: _react2['default'].PropTypes.bool, // whether to perform case-insensitive filtering
			inputProps: _react2['default'].PropTypes.object, // custom attributes for the Input
			inputRenderer: _react2['default'].PropTypes.func, // returns a custom input component
			instanceId: _react2['default'].PropTypes.string, // set the components instanceId
			isLoading: _react2['default'].PropTypes.bool, // whether the Select is loading externally or not (such as options being loaded)
			joinValues: _react2['default'].PropTypes.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
			labelKey: _react2['default'].PropTypes.string, // path of the label value in option objects
			matchPos: _react2['default'].PropTypes.string, // (any|start) match the start or entire string when filtering
			matchProp: _react2['default'].PropTypes.string, // (any|label|value) which option property to filter on
			menuBuffer: _react2['default'].PropTypes.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
			menuContainerStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu container
			menuRenderer: _react2['default'].PropTypes.func, // renders a custom menu with options
			menuStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu
			multi: _react2['default'].PropTypes.bool, // multi-value input
			name: _react2['default'].PropTypes.string, // generates a hidden <input /> tag with this field name for html forms
			noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
			onBlur: _react2['default'].PropTypes.func, // onBlur handler: function (event) {}
			onBlurResetsInput: _react2['default'].PropTypes.bool, // whether input is cleared on blur
			onChange: _react2['default'].PropTypes.func, // onChange handler: function (newValue) {}
			onClose: _react2['default'].PropTypes.func, // fires when the menu is closed
			onCloseResetsInput: _react2['default'].PropTypes.bool, // whether input is cleared when menu is closed through the arrow
			onFocus: _react2['default'].PropTypes.func, // onFocus handler: function (event) {}
			onInputChange: _react2['default'].PropTypes.func, // onInputChange handler: function (inputValue) {}
			onInputKeyDown: _react2['default'].PropTypes.func, // input keyDown handler: function (event) {}
			onMenuScrollToBottom: _react2['default'].PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
			onOpen: _react2['default'].PropTypes.func, // fires when the menu is opened
			onValueClick: _react2['default'].PropTypes.func, // onClick handler for value labels: function (value, event) {}
			openAfterFocus: _react2['default'].PropTypes.bool, // boolean to enable opening dropdown when focused
			openOnFocus: _react2['default'].PropTypes.bool, // always open options menu on focus
			optionClassName: _react2['default'].PropTypes.string, // additional class(es) to apply to the <Option /> elements
			optionComponent: _react2['default'].PropTypes.func, // option component to render in dropdown
			optionRenderer: _react2['default'].PropTypes.func, // optionRenderer: function (option) {}
			options: _react2['default'].PropTypes.array, // array of options
			pageSize: _react2['default'].PropTypes.number, // number of entries to page when using page up/down keys
			placeholder: stringOrNode, // field placeholder, displayed when there's no value
			required: _react2['default'].PropTypes.bool, // applies HTML5 required attribute when needed
			resetValue: _react2['default'].PropTypes.any, // value to use when you clear the control
			scrollMenuIntoView: _react2['default'].PropTypes.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
			searchable: _react2['default'].PropTypes.bool, // whether to enable searching feature or not
			simpleValue: _react2['default'].PropTypes.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
			style: _react2['default'].PropTypes.object, // optional style to apply to the control
			tabIndex: _react2['default'].PropTypes.string, // optional tab index of the control
			tabSelectsValue: _react2['default'].PropTypes.bool, // whether to treat tabbing out while focused to be value selection
			value: _react2['default'].PropTypes.any, // initial field value
			valueComponent: _react2['default'].PropTypes.func, // value component to render
			valueKey: _react2['default'].PropTypes.string, // path of the label value in option objects
			valueRenderer: _react2['default'].PropTypes.func, // valueRenderer: function (option) {}
			wrapperStyle: _react2['default'].PropTypes.object, // optional style to apply to the component wrapper
			displayAll: _react2['default'].PropTypes.bool, // Display all the contents in the dropdown, even after selecting few of the entries from it, this is applicable only when multi is true
			singleValue: _react2['default'].PropTypes.bool, // Send only a single value to the Custom Value Component
			allowCreate: _react2['default'].PropTypes.bool },

		// whether to allow creation of new entries
		statics: { Async: _Async2['default'], AsyncCreatable: _AsyncCreatable2['default'], Creatable: _Creatable2['default'] },

		getDefaultProps: function getDefaultProps() {
			return {
				addLabelText: 'Add "{label}"?',
				arrowRenderer: _utilsDefaultArrowRenderer2['default'],
				autosize: true,
				backspaceRemoves: true,
				backspaceToRemoveMessage: 'Press backspace to remove {label}',
				clearable: true,
				clearAllText: 'Clear all',
				clearValueText: 'Clear value',
				delimiter: ',',
				disabled: false,
				escapeClearsValue: true,
				filterOptions: _utilsDefaultFilterOptions2['default'],
				ignoreAccents: true,
				ignoreCase: true,
				inputProps: {},
				isLoading: false,
				joinValues: false,
				labelKey: 'label',
				matchPos: 'any',
				matchProp: 'any',
				menuBuffer: 0,
				menuRenderer: _utilsDefaultMenuRenderer2['default'],
				multi: false,
				noResultsText: 'No results found',
				onBlurResetsInput: true,
				onCloseResetsInput: true,
				openAfterFocus: false,
				optionComponent: _Option2['default'],
				pageSize: 5,
				placeholder: 'Select...',
				required: false,
				scrollMenuIntoView: true,
				searchable: true,
				simpleValue: false,
				tabSelectsValue: true,
				valueComponent: _Value2['default'],
				valueKey: 'value',
				displayAll: false,
				allowCreate: false
			};
		},

		getInitialState: function getInitialState() {
			return {
				inputValue: '',
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false,
				required: false
			};
		},

		componentWillMount: function componentWillMount() {
			this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
			var valueArray = this.getValueArray(this.props.value);

			if (this.props.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], this.props.multi)
				});
			}
		},

		componentDidMount: function componentDidMount() {
			if (this.props.autofocus) {
				this.focus();
			}
		},

		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var valueArray = this.getValueArray(nextProps.value, nextProps);

			if (nextProps.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], nextProps.multi)
				});
			}
		},

		componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
			if (nextState.isOpen !== this.state.isOpen) {
				this.toggleTouchOutsideEvent(nextState.isOpen);
				var handler = nextState.isOpen ? nextProps.onOpen : nextProps.onClose;
				handler && handler();
			}
		},

		componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
			// focus to the selected option
			if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
				var focusedOptionNode = _reactDom2['default'].findDOMNode(this.focused);
				var menuNode = _reactDom2['default'].findDOMNode(this.menu);
				menuNode.scrollTop = focusedOptionNode.offsetTop;
				this.hasScrolledToOption = true;
			} else if (!this.state.isOpen) {
				this.hasScrolledToOption = false;
			}

			if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
				this._scrollToFocusedOptionOnUpdate = false;
				var focusedDOM = _reactDom2['default'].findDOMNode(this.focused);
				var menuDOM = _reactDom2['default'].findDOMNode(this.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();
				if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				}
			}
			if (this.props.scrollMenuIntoView && this.menuContainer) {
				var menuContainerRect = this.menuContainer.getBoundingClientRect();
				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
				this.closeMenu();
			}
		},

		componentWillUnmount: function componentWillUnmount() {
			if (!document.removeEventListener && document.detachEvent) {
				document.detachEvent('ontouchstart', this.handleTouchOutside);
			} else {
				document.removeEventListener('touchstart', this.handleTouchOutside);
			}
		},

		toggleTouchOutsideEvent: function toggleTouchOutsideEvent(enabled) {
			if (enabled) {
				if (!document.addEventListener && document.attachEvent) {
					document.attachEvent('ontouchstart', this.handleTouchOutside);
				} else {
					document.addEventListener('touchstart', this.handleTouchOutside);
				}
			} else {
				if (!document.removeEventListener && document.detachEvent) {
					document.detachEvent('ontouchstart', this.handleTouchOutside);
				} else {
					document.removeEventListener('touchstart', this.handleTouchOutside);
				}
			}
		},

		handleTouchOutside: function handleTouchOutside(event) {
			// handle touch outside on ios to dismiss menu
			if (this.wrapper && !this.wrapper.contains(event.target)) {
				this.closeMenu();
			}
		},

		focus: function focus() {
			if (!this.input) return;
			this.input.focus();

			if (this.props.openAfterFocus) {
				this.setState({
					isOpen: true
				});
			}
		},

		blurInput: function blurInput() {
			if (!this.input) return;
			this.input.blur();
		},

		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},

		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},

		handleTouchEnd: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.handleMouseDown(event);
		},

		handleTouchEndClearValue: function handleTouchEndClearValue(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Clear the value
			this.clearValue(event);
		},

		handleMouseDown: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (event.target.tagName === 'INPUT') {
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
				// On iOS, we can get into a state where we think the input is focused but it isn't really,
				// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
				// Call focus() again here to be safe.
				this.focus();

				var input = this.input;
				if (typeof input.getInput === 'function') {
					// Get the actual DOM input if the ref is an <AutosizeInput /> component
					input = input.getInput();
				}

				// clears the value so that the cursor will be at the end of input when the component re-renders
				input.value = '';

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

		handleMouseDownOnMenu: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();

			this._openAfterFocus = true;
			this.focus();
		},

		closeMenu: function closeMenu() {
			if (this.props.onCloseResetsInput) {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi,
					inputValue: ''
				});
			} else {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi,
					inputValue: this.state.inputValue
				});
			}
			this.hasScrolledToOption = false;
		},

		handleInputFocus: function handleInputFocus(event) {
			if (this.props.disabled) return;
			var isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
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
			// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
			if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
				this.focus();
				return;
			}

			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			var onBlurredState = {
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			};
			if (this.props.onBlurResetsInput) {
				onBlurredState.inputValue = '';
			}
			this.setState(onBlurredState);
		},

		handleInputChange: function handleInputChange(event) {
			var newInputValue = event.target.value;

			if (this.state.inputValue !== event.target.value && this.props.onInputChange) {
				var nextState = this.props.onInputChange(newInputValue);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newInputValue = '' + nextState;
				}
			}

			this.setState({
				isOpen: true,
				isPseudoFocused: false,
				inputValue: newInputValue
			});
		},

		handleKeyDown: function handleKeyDown(event) {
			if (this.props.disabled) return;

			if (typeof this.props.onInputKeyDown === 'function') {
				this.props.onInputKeyDown(event);
				if (event.defaultPrevented) {
					return;
				}
			}

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
					if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
						return;
					}
					this.selectFocusedOption();
					return;
				case 13:
					// enter
					if (!this.state.isOpen) return;
					event.stopPropagation();
					this.selectFocusedOption();
					break;
				case 27:
					// escape
					if (this.state.isOpen) {
						this.closeMenu();
						event.stopPropagation();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
						event.stopPropagation();
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
				case 33:
					// page up
					this.focusPageUpOption();
					break;
				case 34:
					// page down
					this.focusPageDownOption();
					break;
				case 35:
					// end key
					if (event.shiftKey) {
						return;
					}
					this.focusEndOption();
					break;
				case 36:
					// home key
					if (event.shiftKey) {
						return;
					}
					this.focusStartOption();
					break;
				case 188:
					// comma , key
					if (this.props.allowCreate && this.props.multi) {
						event.preventDefault();
						event.stopPropagation();
						this.selectFocusedOption();
					} else {
						return;
					}
					break;

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

		handleRequired: function handleRequired(value, multi) {
			if (!value) return true;
			return multi ? value.length === 0 : Object.keys(value).length === 0;
		},

		getOptionLabel: function getOptionLabel(op) {
			return op[this.props.labelKey];
		},

		/**
	  * Turns a value into an array from the given options
	  * @param	{String|Number|Array}	value		- the value of the select input
	  * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
	  * @returns	{Array}	the value of the select represented in an array
	  */
		getValueArray: function getValueArray(value, nextProps) {
			var _this = this;

			/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
			var props = (typeof nextProps === 'undefined' ? 'undefined' : _typeof(nextProps)) === 'object' ? nextProps : this.props;
			if (props.multi) {
				if (typeof value === 'string') value = value.split(props.delimiter);
				if (!Array.isArray(value)) {
					if (value === null || value === undefined) return [];
					value = [value];
				}
				return value.map(function (value) {
					return _this.expandValue(value, props);
				}).filter(function (i) {
					return i;
				});
			}
			var expandedValue = this.expandValue(value, props);
			return expandedValue ? [expandedValue] : [];
		},

		/**
	  * Retrieve a value from the given options and valueKey
	  * @param	{String|Number|Array}	value	- the selected value(s)
	  * @param	{Object}		props	- the Select component's props (or nextProps)
	  */
		expandValue: function expandValue(value, props) {
			var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
			if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
			var options = props.options;
			var valueKey = props.valueKey;

			var labelKey = props.labelKey;
			if (!options) return;
			for (var i = 0; i < options.length; i++) {
				if (options[i][valueKey] === value) return options[i];
			}
			if (this.props.allowCreate) {
				var newOption = {};
				newOption[valueKey] = value;
				newOption[labelKey] = value;
				return newOption;
			}
		},

		setValue: function setValue(value) {
			var _this2 = this;

			if (this.props.autoBlur) {
				this.blurInput();
			}
			if (!this.props.onChange) return;
			if (this.props.required) {
				var required = this.handleRequired(value, this.props.multi);
				this.setState({ required: required });
			}
			if (this.props.simpleValue && value) {
				value = this.props.multi ? value.map(function (i) {
					return i[_this2.props.valueKey];
				}).join(this.props.delimiter) : value[this.props.valueKey];
			}
			this.props.onChange(value);
		},

		selectValue: function selectValue(value) {
			var _this3 = this;

			//NOTE: update value in the callback to make sure the input value is empty so that there are no styling issues (Chrome had issue otherwise)
			this.hasScrolledToOption = false;
			if (this.props.multi) {
				this.setState({
					inputValue: '',
					focusedIndex: null
				}, function () {
					_this3.addRemoveValue(value);
				});
			} else {
				this.setState({
					isOpen: false,
					inputValue: '',
					isPseudoFocused: this.state.isFocused
				}, function () {
					_this3.setValue(value);
				});
			}
		},

		addRemoveValue: function addRemoveValue(valueObj) {
			var valueArray = this.getValueArray(this.props.value);
			if (!this.arrayContains(valueArray, valueObj.value)) {
				this.setValue(valueArray.concat(valueObj));
			} else {
				this.removeValue(valueObj);
			}
		},

		arrayContains: function arrayContains(values, value) {
			return values.map(function (valueObj) {
				return valueObj.value;
			}).indexOf(value) > -1;
		},

		addValue: function addValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.concat(value));
		},

		popValue: function popValue() {
			var valueArray = this.getValueArray(this.props.value);
			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(valueArray.slice(0, valueArray.length - 1));
		},

		removeValue: function removeValue(value) {
			var valueArray = this.getValueArray(this.props.value);
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
			this.setValue(this.getResetValue());
			this.setState({
				isOpen: false,
				inputValue: ''
			}, this.focus);
		},

		getResetValue: function getResetValue() {
			if (this.props.resetValue !== undefined) {
				return this.props.resetValue;
			} else if (this.props.multi) {
				return [];
			} else {
				return null;
			}
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

		focusPageUpOption: function focusPageUpOption() {
			this.focusAdjacentOption('page_up');
		},

		focusPageDownOption: function focusPageDownOption() {
			this.focusAdjacentOption('page_down');
		},

		focusStartOption: function focusStartOption() {
			this.focusAdjacentOption('start');
		},

		focusEndOption: function focusEndOption() {
			this.focusAdjacentOption('end');
		},

		focusAdjacentOption: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.map(function (option, index) {
				return { option: option, index: index };
			}).filter(function (option) {
				return !option.option.disabled;
			});
			this._scrollToFocusedOptionOnUpdate = true;
			if (!this.state.isOpen) {
				this.setState({
					isOpen: true,
					inputValue: '',
					focusedOption: this._focusedOption || options[dir === 'next' ? 0 : options.length - 1].option
				});
				return;
			}
			if (!options.length) return;
			var focusedIndex = -1;
			for (var i = 0; i < options.length; i++) {
				if (this._focusedOption === options[i].option) {
					focusedIndex = i;
					break;
				}
			}
			if (dir === 'next' && focusedIndex !== -1) {
				focusedIndex = (focusedIndex + 1) % options.length;
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedIndex = focusedIndex - 1;
				} else {
					focusedIndex = options.length - 1;
				}
			} else if (dir === 'start') {
				focusedIndex = 0;
			} else if (dir === 'end') {
				focusedIndex = options.length - 1;
			} else if (dir === 'page_up') {
				var potentialIndex = focusedIndex - this.props.pageSize;
				if (potentialIndex < 0) {
					focusedIndex = 0;
				} else {
					focusedIndex = potentialIndex;
				}
			} else if (dir === 'page_down') {
				var potentialIndex = focusedIndex + this.props.pageSize;
				if (potentialIndex > options.length - 1) {
					focusedIndex = options.length - 1;
				} else {
					focusedIndex = potentialIndex;
				}
			}

			if (focusedIndex === -1) {
				focusedIndex = 0;
			}

			this.setState({
				focusedIndex: options[focusedIndex].index,
				focusedOption: options[focusedIndex].option
			});
		},

		getFocusedOption: function getFocusedOption() {
			return this._focusedOption;
		},

		getInputValue: function getInputValue() {
			return this.state.inputValue;
		},

		selectFocusedOption: function selectFocusedOption() {
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			} else if (this.props.allowCreate && !this.state.focusedOption) {
				return this.selectValue(this.state.inputValue);
			}
		},

		renderLoading: function renderLoading() {
			if (!this.props.isLoading) return;
			return _react2['default'].createElement('span', { className: 'Select-loading-zone', 'aria-hidden': 'true' }, _react2['default'].createElement('span', { className: 'Select-loading' }));
		},

		renderValue: function renderValue(valueArray, isOpen) {
			var _this4 = this;

			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;
			if (!valueArray.length) {
				return !this.state.inputValue ? _react2['default'].createElement('div', { className: 'Select-placeholder' }, this.props.placeholder) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;
			if (this.props.multi) {
				if (this.props.singleValue) {
					return _react2['default'].createElement(ValueComponent, {
						disabled: this.props.disabled,
						onClick: onClick,
						onRemove: this.removeValue,
						values: valueArray
					}, valueArray.length);
				} else {
					return valueArray.map(function (value, i) {
						return _react2['default'].createElement(ValueComponent, {
							id: _this4._instancePrefix + '-value-' + i,
							instancePrefix: _this4._instancePrefix,
							disabled: _this4.props.disabled || value.clearableValue === false,
							key: 'value-' + i + '-' + value[_this4.props.valueKey],
							onClick: onClick,
							onRemove: _this4.removeValue,
							value: value
						}, renderLabel(value, i), _react2['default'].createElement('span', { className: 'Select-aria-only' }, ' '));
					});
				}
			} else if (!this.state.inputValue) {
				if (isOpen) onClick = null;
				return _react2['default'].createElement(ValueComponent, {
					id: this._instancePrefix + '-value-item',
					disabled: this.props.disabled,
					instancePrefix: this._instancePrefix,
					onClick: onClick,
					value: valueArray[0]
				}, renderLabel(valueArray[0]));
			}
		},

		renderInput: function renderInput(valueArray, focusedOptionIndex) {
			var _this5 = this;

			if (this.props.inputRenderer) {
				return this.props.inputRenderer();
			} else {
				var _classNames;

				var className = (0, _classnames2['default'])('Select-input', this.props.inputProps.className);
				var isOpen = !!this.state.isOpen;

				var ariaOwns = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this._instancePrefix + '-list', isOpen), _defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

				// TODO: Check how this project includes Object.assign()
				var inputProps = _extends({}, this.props.inputProps, {
					role: 'combobox',
					'aria-expanded': '' + isOpen,
					'aria-owns': ariaOwns,
					'aria-haspopup': '' + isOpen,
					'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
					'aria-labelledby': this.props['aria-labelledby'],
					'aria-label': this.props['aria-label'],
					className: className,
					tabIndex: this.props.tabIndex,
					onBlur: this.handleInputBlur,
					onChange: this.handleInputChange,
					onFocus: this.handleInputFocus,
					ref: function ref(_ref) {
						return _this5.input = _ref;
					},
					required: this.state.required,
					value: this.state.inputValue
				});

				if (this.props.disabled || !this.props.searchable) {
					var _props$inputProps = this.props.inputProps;
					var inputClassName = _props$inputProps.inputClassName;

					var divProps = _objectWithoutProperties(_props$inputProps, ['inputClassName']);

					return _react2['default'].createElement('div', _extends({}, divProps, {
						role: 'combobox',
						'aria-expanded': isOpen,
						'aria-owns': isOpen ? this._instancePrefix + '-list' : this._instancePrefix + '-value',
						'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
						className: className,
						tabIndex: this.props.tabIndex || 0,
						onBlur: this.handleInputBlur,
						onFocus: this.handleInputFocus,
						ref: function ref(_ref2) {
							return _this5.input = _ref2;
						},
						'aria-readonly': '' + !!this.props.disabled,
						style: { border: 0, width: 1, display: 'inline-block' } }));
				}

				if (this.props.autosize) {
					return _react2['default'].createElement(_reactInputAutosize2['default'], _extends({}, inputProps, { minWidth: '5' }));
				}
				return _react2['default'].createElement('div', { className: className }, _react2['default'].createElement('input', inputProps));
			}
		},

		renderClear: function renderClear() {
			if (!this.props.clearable || !this.props.value || this.props.value === 0 || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
			return _react2['default'].createElement('span', { className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
				'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText,
				onMouseDown: this.clearValue,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove,
				onTouchEnd: this.handleTouchEndClearValue
			}, _react2['default'].createElement('span', { className: 'Select-clear', dangerouslySetInnerHTML: { __html: '&times;' } }));
		},

		renderArrow: function renderArrow() {
			var onMouseDown = this.handleMouseDownOnArrow;
			var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown });

			return _react2['default'].createElement('span', {
				className: 'Select-arrow-zone',
				onMouseDown: onMouseDown
			}, arrow);
		},

		filterOptions: function filterOptions(excludeOptions) {
			var filterValue = this.state.inputValue;
			var options = this.props.options || [];
			if (this.props.filterOptions) {
				// Maintain backwards compatibility with boolean attribute
				var filterOptions = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : _utilsDefaultFilterOptions2['default'];

				return filterOptions(options, filterValue, excludeOptions, {
					filterOption: this.props.filterOption,
					ignoreAccents: this.props.ignoreAccents,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					valueKey: this.props.valueKey
				});
			} else {
				return options;
			}
		},

		onOptionRef: function onOptionRef(ref, isFocused) {
			if (isFocused) {
				this.focused = ref;
			}
		},

		renderMenu: function renderMenu(options, valueArray, focusedOption) {
			if (options && options.length) {
				return this.props.menuRenderer({
					focusedOption: focusedOption,
					focusOption: this.focusOption,
					instancePrefix: this._instancePrefix,
					labelKey: this.props.labelKey,
					onFocus: this.focusOption,
					onSelect: this.selectValue,
					optionClassName: this.props.optionClassName,
					optionComponent: this.props.optionComponent,
					optionRenderer: this.props.optionRenderer || this.getOptionLabel,
					options: options,
					selectValue: this.selectValue,
					valueArray: valueArray,
					valueKey: this.props.valueKey,
					onOptionRef: this.onOptionRef
				});
			} else if (this.props.noResultsText) {
				return _react2['default'].createElement('div', { className: 'Select-noresults' }, this.props.noResultsText);
			} else {
				return null;
			}
		},

		renderHiddenField: function renderHiddenField(valueArray) {
			var _this6 = this;

			if (!this.props.name) return;
			if (this.props.joinValues) {
				var value = valueArray.map(function (i) {
					return stringifyValue(i[_this6.props.valueKey]);
				}).join(this.props.delimiter);
				return _react2['default'].createElement('input', {
					type: 'hidden',
					ref: function ref(_ref3) {
						return _this6.value = _ref3;
					},
					name: this.props.name,
					value: value,
					disabled: this.props.disabled });
			}
			return valueArray.map(function (item, index) {
				return _react2['default'].createElement('input', { key: 'hidden.' + index,
					type: 'hidden',
					ref: 'value' + index,
					name: _this6.props.name,
					value: stringifyValue(item[_this6.props.valueKey]),
					disabled: _this6.props.disabled });
			});
		},

		getFocusableOptionIndex: function getFocusableOptionIndex(selectedOption) {
			var options = this._visibleOptions;
			if (!options.length) return null;

			var focusedOption = this.state.focusedOption || selectedOption;
			if (focusedOption && !focusedOption.disabled) {
				var focusedOptionIndex = options.indexOf(focusedOption);
				if (focusedOptionIndex !== -1) {
					return focusedOptionIndex;
				}
			}

			for (var i = 0; i < options.length; i++) {
				if (!options[i].disabled) return i;
			}
			return null;
		},

		renderOuter: function renderOuter(options, valueArray, focusedOption) {
			var _this7 = this;

			var menu = this.renderMenu(options, valueArray, focusedOption);
			if (!menu) {
				return null;
			}

			return _react2['default'].createElement('div', { ref: function ref(_ref4) {
					return _this7.menuContainer = _ref4;
				}, className: 'Select-menu-outer', style: this.props.menuContainerStyle }, _react2['default'].createElement('div', { ref: function ref(_ref5) {
					return _this7.menu = _ref5;
				}, role: 'listbox', className: 'Select-menu', id: this._instancePrefix + '-list',
				style: this.props.menuStyle,
				onScroll: this.handleMenuScroll,
				onMouseDown: this.handleMouseDownOnMenu }, menu));
		},

		render: function render() {
			var _this8 = this;

			var valueArray = this.getValueArray(this.props.value);
			var options = this._visibleOptions = this.filterOptions(this.props.multi && !this.props.displayAll ? this.getValueArray(this.props.value) : null);
			var isOpen = this.state.isOpen;
			if (this.props.multi && !this.props.displayAll && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

			var focusedOption = null;
			if (focusedOptionIndex !== null) {
				focusedOption = this._focusedOption = options[focusedOptionIndex];
			} else {
				focusedOption = this._focusedOption = null;
			}
			var className = (0, _classnames2['default'])('Select', this.props.className, {
				'Select--multi': this.props.multi,
				'Select--single': !this.props.multi,
				'is-disabled': this.props.disabled,
				'is-focused': this.state.isFocused,
				'is-loading': this.props.isLoading,
				'is-open': isOpen,
				'is-pseudo-focused': this.state.isPseudoFocused,
				'is-searchable': this.props.searchable,
				'has-value': valueArray.length
			});

			var removeMessage = null;
			if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
				removeMessage = _react2['default'].createElement('span', { id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' }, this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey]));
			}

			return _react2['default'].createElement('div', { ref: function ref(_ref6) {
					return _this8.wrapper = _ref6;
				},
				className: className,
				style: this.props.wrapperStyle }, this.renderHiddenField(valueArray), _react2['default'].createElement('div', { ref: function ref(_ref7) {
					return _this8.control = _ref7;
				},
				className: 'Select-control',
				style: this.props.style,
				onKeyDown: this.handleKeyDown,
				onMouseDown: this.handleMouseDown,
				onTouchEnd: this.handleTouchEnd,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove
			}, _react2['default'].createElement('span', { className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' }, this.renderValue(valueArray, isOpen), this.renderInput(valueArray, focusedOptionIndex)), removeMessage, this.renderLoading(), this.renderClear(), this.renderArrow()), isOpen ? this.renderOuter(options, !this.props.multi || this.props.singleValue ? valueArray : null, focusedOption) : null);
		}

	});

	exports['default'] = Select;
	module.exports = exports['default'];

/***/ },
/* 27 */
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

	var React = __webpack_require__(4);

	var sizerStyle = { position: 'absolute', top: 0, left: 0, visibility: 'hidden', height: 0, overflow: 'scroll', whiteSpace: 'pre' };

	var AutosizeInput = React.createClass({
		displayName: 'AutosizeInput',

		propTypes: {
			className: React.PropTypes.string, // className for the outer element
			defaultValue: React.PropTypes.any, // default field value
			inputClassName: React.PropTypes.string, // className for the input element
			inputStyle: React.PropTypes.object, // css styles for the input element
			minWidth: React.PropTypes.oneOfType([// minimum width for input element
			React.PropTypes.number, React.PropTypes.string]),
			onChange: React.PropTypes.func, // onChange handler: function(newValue) {}
			placeholder: React.PropTypes.string, // placeholder text
			placeholderIsMinWidth: React.PropTypes.bool, // don't collapse size to less than the placeholder
			style: React.PropTypes.object, // css styles for the outer element
			value: React.PropTypes.any },
		// field value
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
			this.updateInputWidth();
		},
		copyInputStyles: function copyInputStyles() {
			if (!this.isMounted() || !window.getComputedStyle) {
				return;
			}
			var inputStyle = window.getComputedStyle(this.refs.input);
			if (!inputStyle) {
				return;
			}
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
		updateInputWidth: function updateInputWidth() {
			if (!this.isMounted() || typeof this.refs.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = undefined;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
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
		blur: function blur() {
			this.refs.input.blur();
		},
		select: function select() {
			this.refs.input.select();
		},
		render: function render() {
			var sizerValue = this.props.defaultValue || this.props.value || '';
			var wrapperStyle = this.props.style || {};
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';
			var inputStyle = _extends({}, this.props.inputStyle);
			inputStyle.width = this.state.inputWidth + 'px';
			inputStyle.boxSizing = 'content-box';
			var inputProps = _extends({}, this.props);
			inputProps.className = this.props.inputClassName;
			inputProps.style = inputStyle;
			// ensure props meant for `AutosizeInput` don't end up on the `input`
			delete inputProps.inputClassName;
			delete inputProps.inputStyle;
			delete inputProps.minWidth;
			delete inputProps.placeholderIsMinWidth;
			return React.createElement('div', { className: this.props.className, style: wrapperStyle }, React.createElement('input', _extends({}, inputProps, { ref: 'input' })), React.createElement('div', { ref: 'sizer', style: sizerStyle }, sizerValue), this.props.placeholder ? React.createElement('div', { ref: 'placeholderSizer', style: sizerStyle }, this.props.placeholder) : null);
		}
	});

	module.exports = AutosizeInput;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames() {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if ("function" === 'function' && _typeof(__webpack_require__(29)) === 'object' && __webpack_require__(29)) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	})();

/***/ },
/* 29 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = arrowRenderer;

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function arrowRenderer(_ref) {
		var onMouseDown = _ref.onMouseDown;

		return _react2["default"].createElement("span", {
			className: "Select-arrow",
			onMouseDown: onMouseDown
		});
	}

	;
	module.exports = exports["default"];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _stripDiacritics = __webpack_require__(32);

	var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

	function filterOptions(options, filterValue, excludeOptions, props) {
		var _this = this;

		if (props.ignoreAccents) {
			filterValue = (0, _stripDiacritics2['default'])(filterValue);
		}

		if (props.ignoreCase) {
			filterValue = filterValue.toLowerCase();
		}

		if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
			return i[props.valueKey];
		});

		return options.filter(function (option) {
			if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
			if (props.filterOption) return props.filterOption.call(_this, option, filterValue);
			if (!filterValue) return true;
			var valueTest = String(option[props.valueKey]);
			var labelTest = String(option[props.labelKey]);
			if (props.ignoreAccents) {
				if (props.matchProp !== 'label') valueTest = (0, _stripDiacritics2['default'])(valueTest);
				if (props.matchProp !== 'value') labelTest = (0, _stripDiacritics2['default'])(labelTest);
			}
			if (props.ignoreCase) {
				if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
				if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
			}
			return props.matchPos === 'start' ? props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
		});
	}

	module.exports = filterOptions;

/***/ },
/* 32 */
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _classnames = __webpack_require__(28);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function menuRenderer(_ref) {
		var focusedOption = _ref.focusedOption;
		var instancePrefix = _ref.instancePrefix;
		var labelKey = _ref.labelKey;
		var onFocus = _ref.onFocus;
		var onSelect = _ref.onSelect;
		var optionClassName = _ref.optionClassName;
		var optionComponent = _ref.optionComponent;
		var optionRenderer = _ref.optionRenderer;
		var options = _ref.options;
		var valueArray = _ref.valueArray;
		var valueKey = _ref.valueKey;
		var onOptionRef = _ref.onOptionRef;

		var Option = optionComponent;

		return options.map(function (option, i) {
			var isSelected = valueArray && valueArray.indexOf(option) > -1;
			var isFocused = option === focusedOption;
			var optionClass = (0, _classnames2['default'])(optionClassName, {
				'Select-option': true,
				'is-selected': isSelected,
				'is-focused': isFocused,
				'is-disabled': option.disabled
			});

			return _react2['default'].createElement(Option, {
				className: optionClass,
				instancePrefix: instancePrefix,
				isDisabled: option.disabled,
				isFocused: isFocused,
				isSelected: isSelected,
				key: 'option-' + i + '-' + option[valueKey],
				onFocus: onFocus,
				onSelect: onSelect,
				option: option,
				optionIndex: i,
				ref: function ref(_ref2) {
					onOptionRef(_ref2, isFocused);
				}
			}, optionRenderer(option, i));
		});
	}

	module.exports = menuRenderer;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}return target;
	};

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	var _get = function get(_x, _x2, _x3) {
		var _again = true;_function: while (_again) {
			var object = _x,
			    property = _x2,
			    receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
				var parent = Object.getPrototypeOf(object);if (parent === null) {
					return undefined;
				} else {
					_x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
				}
			} else if ('value' in desc) {
				return desc.value;
			} else {
				var getter = desc.get;if (getter === undefined) {
					return undefined;
				}return getter.call(receiver);
			}
		}
	};

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
		} else {
			obj[key] = value;
		}return obj;
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError('Cannot call a class as a function');
		}
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== 'function' && superClass !== null) {
			throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Select = __webpack_require__(26);

	var _Select2 = _interopRequireDefault(_Select);

	var _utilsStripDiacritics = __webpack_require__(32);

	var _utilsStripDiacritics2 = _interopRequireDefault(_utilsStripDiacritics);

	var propTypes = {
		autoload: _react2['default'].PropTypes.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
		cache: _react2['default'].PropTypes.any, // object to use to cache results; set to null/false to disable caching
		children: _react2['default'].PropTypes.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
		ignoreAccents: _react2['default'].PropTypes.bool, // strip diacritics when filtering; defaults to true
		ignoreCase: _react2['default'].PropTypes.bool, // perform case-insensitive filtering; defaults to true
		loadingPlaceholder: _react2['default'].PropTypes.oneOfType([// replaces the placeholder while options are loading
		_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
		loadOptions: _react2['default'].PropTypes.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
		options: _react.PropTypes.array.isRequired, // array of options
		placeholder: _react2['default'].PropTypes.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
		_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
		noResultsText: _react2['default'].PropTypes.oneOfType([// field noResultsText, displayed when no options come back from the server
		_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
		onChange: _react2['default'].PropTypes.func, // onChange handler: function (newValue) {}
		searchPromptText: _react2['default'].PropTypes.oneOfType([// label to prompt for search input
		_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
		onInputChange: _react2['default'].PropTypes.func, // optional for keeping track of what is being typed
		value: _react2['default'].PropTypes.any };

	// initial field value
	var defaultCache = {};

	var defaultProps = {
		autoload: true,
		cache: defaultCache,
		children: defaultChildren,
		ignoreAccents: true,
		ignoreCase: true,
		loadingPlaceholder: 'Loading...',
		options: [],
		searchPromptText: 'Type to search'
	};

	var Async = function (_Component) {
		_inherits(Async, _Component);

		function Async(props, context) {
			_classCallCheck(this, Async);

			_get(Object.getPrototypeOf(Async.prototype), 'constructor', this).call(this, props, context);

			this._cache = props.cache === defaultCache ? {} : props.cache;

			this.state = {
				isLoading: false,
				options: props.options
			};

			this._onInputChange = this._onInputChange.bind(this);
		}

		_createClass(Async, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var autoload = this.props.autoload;

				if (autoload) {
					this.loadOptions('');
				}
			}
		}, {
			key: 'componentWillUpdate',
			value: function componentWillUpdate(nextProps, nextState) {
				var _this = this;

				var propertiesToSync = ['options'];
				propertiesToSync.forEach(function (prop) {
					if (_this.props[prop] !== nextProps[prop]) {
						_this.setState(_defineProperty({}, prop, nextProps[prop]));
					}
				});
			}
		}, {
			key: 'clearOptions',
			value: function clearOptions() {
				this.setState({ options: [] });
			}
		}, {
			key: 'loadOptions',
			value: function loadOptions(inputValue) {
				var _this2 = this;

				var loadOptions = this.props.loadOptions;

				var cache = this._cache;

				if (cache && cache.hasOwnProperty(inputValue)) {
					this.setState({
						options: cache[inputValue]
					});

					return;
				}

				var callback = function callback(error, data) {
					if (callback === _this2._callback) {
						_this2._callback = null;

						var options = data && data.options || [];

						if (cache) {
							cache[inputValue] = options;
						}

						_this2.setState({
							isLoading: false,
							options: options
						});
					}
				};

				// Ignore all but the most recent request
				this._callback = callback;

				var promise = loadOptions(inputValue, callback);
				if (promise) {
					promise.then(function (data) {
						return callback(null, data);
					}, function (error) {
						return callback(error);
					});
				}

				if (this._callback && !this.state.isLoading) {
					this.setState({
						isLoading: true
					});
				}

				return inputValue;
			}
		}, {
			key: '_onInputChange',
			value: function _onInputChange(inputValue) {
				var _props = this.props;
				var ignoreAccents = _props.ignoreAccents;
				var ignoreCase = _props.ignoreCase;
				var onInputChange = _props.onInputChange;

				if (ignoreAccents) {
					inputValue = (0, _utilsStripDiacritics2['default'])(inputValue);
				}

				if (ignoreCase) {
					inputValue = inputValue.toLowerCase();
				}

				if (onInputChange) {
					onInputChange(inputValue);
				}

				return this.loadOptions(inputValue);
			}
		}, {
			key: 'inputValue',
			value: function inputValue() {
				if (this.select) {
					return this.select.state.inputValue;
				}
				return '';
			}
		}, {
			key: 'noResultsText',
			value: function noResultsText() {
				var _props2 = this.props;
				var loadingPlaceholder = _props2.loadingPlaceholder;
				var noResultsText = _props2.noResultsText;
				var searchPromptText = _props2.searchPromptText;
				var isLoading = this.state.isLoading;

				var inputValue = this.inputValue();

				if (isLoading) {
					return loadingPlaceholder;
				}
				if (inputValue && noResultsText) {
					return noResultsText;
				}
				return searchPromptText;
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var _props3 = this.props;
				var children = _props3.children;
				var loadingPlaceholder = _props3.loadingPlaceholder;
				var placeholder = _props3.placeholder;
				var _state = this.state;
				var isLoading = _state.isLoading;
				var options = _state.options;

				var props = {
					noResultsText: this.noResultsText(),
					placeholder: isLoading ? loadingPlaceholder : placeholder,
					options: isLoading && loadingPlaceholder ? [] : options,
					ref: function ref(_ref) {
						return _this3.select = _ref;
					},
					onChange: function onChange(newValues) {
						var newValuesExist = typeof newValues !== '' && newValues !== null;
						if (_this3.props.value && newValuesExist && newValues.length > _this3.props.value.length) {
							_this3.clearOptions();
						}
						_this3.props.onChange(newValues);
					}
				};

				return children(_extends({}, this.props, props, {
					isLoading: isLoading,
					onInputChange: this._onInputChange
				}));
			}
		}, {
			key: 'focus',
			value: function focus() {
				if (this.refs.select !== null) {
					this.refs.select.focus();
				}
			}
		}]);

		return Async;
	}(_react.Component);

	exports['default'] = Async;

	Async.propTypes = propTypes;
	Async.defaultProps = defaultProps;

	function defaultChildren(props) {
		return _react2['default'].createElement(_Select2['default'], _extends({}, props, { ref: 'select' }));
	};
	module.exports = exports['default'];

/***/ },
/* 35 */
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

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Select = __webpack_require__(26);

	var _Select2 = _interopRequireDefault(_Select);

	var AsyncCreatable = _react2['default'].createClass({
		displayName: 'AsyncCreatableSelect',

		render: function render() {
			var _this = this;

			return _react2['default'].createElement(_Select2['default'].Async, this.props, function (asyncProps) {
				return _react2['default'].createElement(_Select2['default'].Creatable, _this.props, function (creatableProps) {
					return _react2['default'].createElement(_Select2['default'], _extends({}, asyncProps, creatableProps, {
						onInputChange: function onInputChange(input) {
							creatableProps.onInputChange(input);
							return asyncProps.onInputChange(input);
						}
					}));
				});
			});
		}
	});

	module.exports = AsyncCreatable;

/***/ },
/* 36 */
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

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _objectWithoutProperties(obj, keys) {
		var target = {};for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
		}return target;
	}

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Select = __webpack_require__(26);

	var _Select2 = _interopRequireDefault(_Select);

	var _utilsDefaultFilterOptions = __webpack_require__(31);

	var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

	var _utilsDefaultMenuRenderer = __webpack_require__(33);

	var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

	var Creatable = _react2['default'].createClass({
		displayName: 'CreatableSelect',

		propTypes: {
			// Child function responsible for creating the inner Select component
			// This component can be used to compose HOCs (eg Creatable and Async)
			// (props: Object): PropTypes.element
			children: _react2['default'].PropTypes.func,

			// See Select.propTypes.filterOptions
			filterOptions: _react2['default'].PropTypes.any,

			// Searches for any matching option within the set of options.
			// This function prevents duplicate options from being created.
			// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
			isOptionUnique: _react2['default'].PropTypes.func,

			// Determines if the current input text represents a valid option.
			// ({ label: string }): boolean
			isValidNewOption: _react2['default'].PropTypes.func,

			// See Select.propTypes.menuRenderer
			menuRenderer: _react2['default'].PropTypes.any,

			// Factory to create new option.
			// ({ label: string, labelKey: string, valueKey: string }): Object
			newOptionCreator: _react2['default'].PropTypes.func,

			// input keyDown handler: function (event) {}
			onInputKeyDown: _react2['default'].PropTypes.func,

			// See Select.propTypes.options
			options: _react2['default'].PropTypes.array,

			// Creates prompt/placeholder option text.
			// (filterText: string): string
			promptTextCreator: _react2['default'].PropTypes.func,

			// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
			shouldKeyDownEventCreateNewOption: _react2['default'].PropTypes.func
		},

		// Default prop methods
		statics: {
			isOptionUnique: isOptionUnique,
			isValidNewOption: isValidNewOption,
			newOptionCreator: newOptionCreator,
			promptTextCreator: promptTextCreator,
			shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
		},

		getDefaultProps: function getDefaultProps() {
			return {
				filterOptions: _utilsDefaultFilterOptions2['default'],
				isOptionUnique: isOptionUnique,
				isValidNewOption: isValidNewOption,
				menuRenderer: _utilsDefaultMenuRenderer2['default'],
				newOptionCreator: newOptionCreator,
				promptTextCreator: promptTextCreator,
				shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
			};
		},

		createNewOption: function createNewOption() {
			var _props = this.props;
			var isValidNewOption = _props.isValidNewOption;
			var newOptionCreator = _props.newOptionCreator;
			var _props$options = _props.options;
			var options = _props$options === undefined ? [] : _props$options;
			var shouldKeyDownEventCreateNewOption = _props.shouldKeyDownEventCreateNewOption;

			if (isValidNewOption({ label: this.inputValue })) {
				var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
				var _isOptionUnique = this.isOptionUnique({ option: option });

				// Don't add the same option twice.
				if (_isOptionUnique) {
					options.unshift(option);

					this.select.selectValue(option);
				}
			}
		},

		filterOptions: function filterOptions() {
			var _props2 = this.props;
			var filterOptions = _props2.filterOptions;
			var isValidNewOption = _props2.isValidNewOption;
			var options = _props2.options;
			var promptTextCreator = _props2.promptTextCreator;

			// TRICKY Check currently selected options as well.
			// Don't display a create-prompt for a value that's selected.
			// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.
			var excludeOptions = arguments[2] || [];

			var filteredOptions = filterOptions.apply(undefined, arguments) || [];

			if (isValidNewOption({ label: this.inputValue })) {
				var _newOptionCreator = this.props.newOptionCreator;

				var option = _newOptionCreator({
					label: this.inputValue,
					labelKey: this.labelKey,
					valueKey: this.valueKey
				});

				// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
				// For multi-selects, this would remove it from the filtered list.
				var _isOptionUnique2 = this.isOptionUnique({
					option: option,
					options: excludeOptions.concat(filteredOptions)
				});

				if (_isOptionUnique2) {
					var _prompt = promptTextCreator(this.inputValue);

					this._createPlaceholderOption = _newOptionCreator({
						label: _prompt,
						labelKey: this.labelKey,
						valueKey: this.valueKey
					});

					filteredOptions.unshift(this._createPlaceholderOption);
				}
			}

			return filteredOptions;
		},

		isOptionUnique: function isOptionUnique(_ref2) {
			var option = _ref2.option;
			var options = _ref2.options;
			var isOptionUnique = this.props.isOptionUnique;

			options = options || this.select.filterOptions();

			return isOptionUnique({
				labelKey: this.labelKey,
				option: option,
				options: options,
				valueKey: this.valueKey
			});
		},

		menuRenderer: function menuRenderer(params) {
			var menuRenderer = this.props.menuRenderer;

			return menuRenderer(_extends({}, params, {
				onSelect: this.onOptionSelect
			}));
		},

		onInputChange: function onInputChange(input) {
			// This value may be needed in between Select mounts (when this.select is null)
			this.inputValue = input;
		},

		onInputKeyDown: function onInputKeyDown(event) {
			var _props3 = this.props;
			var shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption;
			var onInputKeyDown = _props3.onInputKeyDown;

			var focusedOption = this.select.getFocusedOption();

			if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })) {
				this.createNewOption();

				// Prevent decorated Select from doing anything additional with this keyDown event
				event.preventDefault();
			} else if (onInputKeyDown) {
				onInputKeyDown(event);
			}
		},

		onOptionSelect: function onOptionSelect(option, event) {
			if (option === this._createPlaceholderOption) {
				this.createNewOption();
			} else {
				this.select.selectValue(option);
			}
		},

		render: function render() {
			var _this = this;

			var _props4 = this.props;
			var _props4$children = _props4.children;
			var children = _props4$children === undefined ? defaultChildren : _props4$children;
			var newOptionCreator = _props4.newOptionCreator;
			var shouldKeyDownEventCreateNewOption = _props4.shouldKeyDownEventCreateNewOption;

			var restProps = _objectWithoutProperties(_props4, ['children', 'newOptionCreator', 'shouldKeyDownEventCreateNewOption']);

			var props = _extends({}, restProps, {
				allowCreate: true,
				filterOptions: this.filterOptions,
				menuRenderer: this.menuRenderer,
				onInputChange: this.onInputChange,
				onInputKeyDown: this.onInputKeyDown,
				ref: function ref(_ref) {
					_this.select = _ref;

					// These values may be needed in between Select mounts (when this.select is null)
					if (_ref) {
						_this.labelKey = _ref.props.labelKey;
						_this.valueKey = _ref.props.valueKey;
					}
				}
			});

			return children(props);
		}
	});

	function defaultChildren(props) {
		return _react2['default'].createElement(_Select2['default'], props);
	};

	function isOptionUnique(_ref3) {
		var option = _ref3.option;
		var options = _ref3.options;
		var labelKey = _ref3.labelKey;
		var valueKey = _ref3.valueKey;

		return options.filter(function (existingOption) {
			return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
		}).length === 0;
	};

	function isValidNewOption(_ref4) {
		var label = _ref4.label;

		return !!label;
	};

	function newOptionCreator(_ref5) {
		var label = _ref5.label;
		var labelKey = _ref5.labelKey;
		var valueKey = _ref5.valueKey;

		var option = {};
		option[valueKey] = label;
		option[labelKey] = label;
		option.className = 'Select-create-option-placeholder';
		return option;
	};

	function promptTextCreator(label) {
		return 'Create option "' + label + '"';
	}

	function shouldKeyDownEventCreateNewOption(_ref6) {
		var keyCode = _ref6.keyCode;

		switch (keyCode) {
			case 9: // TAB
			case 13: // ENTER
			case 188:
				// COMMA
				return true;
		}

		return false;
	};

	module.exports = Creatable;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(28);

	var _classnames2 = _interopRequireDefault(_classnames);

	var Option = _react2['default'].createClass({
		displayName: 'Option',

		propTypes: {
			children: _react2['default'].PropTypes.node,
			className: _react2['default'].PropTypes.string, // className (based on mouse position)
			instancePrefix: _react2['default'].PropTypes.string.isRequired, // unique prefix for the ids (used for aria)
			isDisabled: _react2['default'].PropTypes.bool, // the option is disabled
			isFocused: _react2['default'].PropTypes.bool, // the option is focused
			isSelected: _react2['default'].PropTypes.bool, // the option is selected
			onFocus: _react2['default'].PropTypes.func, // method to handle mouseEnter on option element
			onSelect: _react2['default'].PropTypes.func, // method to handle click on option element
			onUnfocus: _react2['default'].PropTypes.func, // method to handle mouseLeave on option element
			option: _react2['default'].PropTypes.object.isRequired, // object that is base for that option
			optionIndex: _react2['default'].PropTypes.number },
		// index of the option, used to generate unique ids for aria
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
			this.onFocus(event);
		},

		handleMouseMove: function handleMouseMove(event) {
			this.onFocus(event);
		},

		handleTouchEnd: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			this.handleMouseDown(event);
		},

		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},

		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},

		onFocus: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		},
		render: function render() {
			var _props = this.props;
			var option = _props.option;
			var instancePrefix = _props.instancePrefix;
			var optionIndex = _props.optionIndex;

			var className = (0, _classnames2['default'])(this.props.className, option.className);

			return option.disabled ? _react2['default'].createElement('div', { className: className,
				onMouseDown: this.blockEvent,
				onClick: this.blockEvent }, this.props.children) : _react2['default'].createElement('div', { className: className,
				style: option.style,
				role: 'option',
				onMouseDown: this.handleMouseDown,
				onMouseEnter: this.handleMouseEnter,
				onMouseMove: this.handleMouseMove,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove,
				onTouchEnd: this.handleTouchEnd,
				id: instancePrefix + '-option-' + optionIndex,
				title: option.title }, this.props.children);
		}
	});

	module.exports = Option;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(28);

	var _classnames2 = _interopRequireDefault(_classnames);

	var Value = _react2['default'].createClass({

		displayName: 'Value',

		propTypes: {
			children: _react2['default'].PropTypes.node,
			disabled: _react2['default'].PropTypes.bool, // disabled prop passed to ReactSelect
			id: _react2['default'].PropTypes.string, // Unique id for the value - used for aria
			onClick: _react2['default'].PropTypes.func, // method to handle click on value label
			onRemove: _react2['default'].PropTypes.func, // method to handle removal of the value
			value: _react2['default'].PropTypes.object.isRequired },

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

		handleTouchEndRemove: function handleTouchEndRemove(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.onRemove(event);
		},

		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},

		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},

		renderRemoveIcon: function renderRemoveIcon() {
			if (this.props.disabled || !this.props.onRemove) return;
			return _react2['default'].createElement('span', { className: 'Select-value-icon',
				'aria-hidden': 'true',
				onMouseDown: this.onRemove,
				onTouchEnd: this.handleTouchEndRemove,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove }, '×');
		},

		renderLabel: function renderLabel() {
			var className = 'Select-value-label';
			return this.props.onClick || this.props.value.href ? _react2['default'].createElement('a', { className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown }, this.props.children) : _react2['default'].createElement('span', { className: className, role: 'option', 'aria-selected': 'true', id: this.props.id }, this.props.children);
		},

		render: function render() {
			return _react2['default'].createElement('div', { className: (0, _classnames2['default'])('Select-value', this.props.value.className),
				style: this.props.value.style,
				title: this.props.value.title
			}, this.renderRemoveIcon(), this.renderLabel());
		}

	});

	module.exports = Value;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(28);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Option = _react2.default.createClass({
		displayName: 'Option',

		propTypes: {
			children: _react2.default.PropTypes.node,
			className: _react2.default.PropTypes.string, // className (based on mouse position)
			instancePrefix: _react2.default.PropTypes.string.isRequired, // unique prefix for the ids (used for aria)
			isDisabled: _react2.default.PropTypes.bool, // the option is disabled
			isFocused: _react2.default.PropTypes.bool, // the option is focused
			isSelected: _react2.default.PropTypes.bool, // the option is selected
			onFocus: _react2.default.PropTypes.func, // method to handle mouseEnter on option element
			onSelect: _react2.default.PropTypes.func, // method to handle click on option element
			onUnfocus: _react2.default.PropTypes.func, // method to handle mouseLeave on option element
			option: _react2.default.PropTypes.object.isRequired, // object that is base for that option
			optionIndex: _react2.default.PropTypes.number },
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
			this.onFocus(event);
		},
		handleMouseMove: function handleMouseMove(event) {
			this.onFocus(event);
		},
		handleTouchEnd: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			this.handleMouseDown(event);
		},
		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},
		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},
		onFocus: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		},
		render: function render() {
			var _props = this.props,
			    option = _props.option,
			    instancePrefix = _props.instancePrefix,
			    optionIndex = _props.optionIndex;

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
					role: 'option',
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEnd,
					id: instancePrefix + '-option-' + optionIndex,
					title: option.title },
				this.props.children
			);
		}
	});

	module.exports = Option;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, CollectionPicker, Datum, React, Select, Strhelp, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(4);

	Backbone = __webpack_require__(8);

	_ = __webpack_require__(9);

	Strhelp = __webpack_require__(41);

	Datum = __webpack_require__(7);

	Select = __webpack_require__(26);

	module.exports = CollectionPicker = (function(superClass) {
	  extend(CollectionPicker, superClass);

	  function CollectionPicker() {
	    this.groupSuggestionModels = bind(this.groupSuggestionModels, this);
	    this.filterSuggestionModels = bind(this.filterSuggestionModels, this);
	    this.onLoadOptions = bind(this.onLoadOptions, this);
	    this.onChange = bind(this.onChange, this);
	    this.getOptionValuesForReactSelect = bind(this.getOptionValuesForReactSelect, this);
	    this.focus = bind(this.focus, this);
	    this.getInputComponent = bind(this.getInputComponent, this);
	    return CollectionPicker.__super__.constructor.apply(this, arguments);
	  }

	  CollectionPicker.displayName = "react-datum.CollectionPicker";

	  CollectionPicker.propTypes = _.extend({}, Datum.propTypes, {
	    collection: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Collection), React.PropTypes.string, React.PropTypes.array]),
	    ellipsizeAt: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
	    reverseEllipsis: React.PropTypes.bool,
	    optionComponent: React.PropTypes.func,
	    valueComponent: React.PropTypes.func,
	    fetchUnknownModelsInCollection: React.PropTypes.bool,
	    displayAttr: React.PropTypes.string,
	    optionDisplayAttr: React.PropTypes.string,
	    optionSaveAttr: React.PropTypes.string.isRequired,
	    displayComponent: React.PropTypes.func,
	    synchronousLoading: React.PropTypes.bool,
	    isLoading: React.PropTypes.bool,
	    asyncSuggestionCallback: React.PropTypes.func,
	    multi: React.PropTypes.bool,
	    editPlaceholder: React.PropTypes.string,
	    setAsString: React.PropTypes.bool
	  });

	  CollectionPicker.defaultProps = _.extend({}, Datum.defaultProps, {
	    ellipsizeAt: 35,
	    optionSaveAttr: 'id',
	    fetchUnknownModelsInCollection: true,
	    loading: false,
	    attr: 'value'
	  });

	  CollectionPicker.contextTypes = _.extend({}, Datum.contextTypes, {
	    collection: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Collection), React.PropTypes.string])
	  });

	  CollectionPicker.prototype.subClassName = "collection-picker";

	  CollectionPicker.prototype.selectRef = "reactSelect";

	  CollectionPicker.prototype.initializeState = function() {
	    return this.state = {
	      value: this._getValue(),
	      errors: []
	    };
	  };

	  CollectionPicker.prototype.componentWillReceiveProps = function(nextProps) {
	    var newModelValue;
	    newModelValue = nextProps.multi ? this.getModelValues(nextProps) : this.getModelValue(nextProps);
	    if (JSON.stringify(this.state.value || {}) !== JSON.stringify(newModelValue)) {
	      return this.setState({
	        value: newModelValue
	      });
	    }
	  };

	  CollectionPicker.prototype.render = function() {
	    return CollectionPicker.__super__.render.apply(this, arguments);
	  };

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
	    var modelValue, valueProps;
	    if (collection == null) {
	      collection = this.getCollection();
	    }
	    modelValue = this.getCollectionModelDisplayValue(modelId, collection);
	    if (modelValue) {
	      modelValue = this.renderEllipsizedValue(modelValue);
	    }
	    valueProps = {
	      key: modelValue,
	      className: "collection-picker-display-value"
	    };
	    if (this.props.displayComponent != null) {
	      valueProps.value = this._getCollectionModelById(modelId);
	      return React.createElement(this.props.displayComponent, React.__spread({}, valueProps));
	    }
	    return React.createElement("span", React.__spread({}, valueProps), modelValue || this.renderPlaceholder() || "unknown");
	  };

	  CollectionPicker.prototype.renderInput = function() {
	    if (this.props.synchronousLoading) {
	      return React.createElement(Select, React.__spread({}, this.getSelectOptions()));
	    } else {
	      return React.createElement(Select.Async, React.__spread({}, this.getSelectAsyncOptions()));
	    }
	  };

	  CollectionPicker.prototype.cancelEdit = function() {
	    return this.setState({
	      errors: [],
	      value: this._getValue()
	    });
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

	  CollectionPicker.prototype._getValue = function(newProps) {
	    if (newProps == null) {
	      newProps = this.props;
	    }
	    return (newProps.multi ? this.getModelValues(newProps) : this.getModelValue(newProps));
	  };

	  CollectionPicker.prototype._getCollectionModelById = function(modelOrId) {
	    var model, ref;
	    if (_.isNumber(modelOrId) || _.isString(modelOrId)) {
	      return model = (ref = this.getCollection()) != null ? ref.get(modelOrId, {
	        add: this.props.fetchUnknownModelsInCollection
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

	  CollectionPicker.prototype.getModelValues = function(newProps) {
	    var modelValue, modelValues;
	    if (newProps == null) {
	      newProps = this.props;
	    }
	    modelValue = this.getModelValue(newProps);
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

	  CollectionPicker.prototype.getSelectOptions = function() {
	    var collection;
	    collection = this.getCollection();
	    return _.extend({}, this.props, {
	      placeholder: this.props.editPlaceholder || this.getPropOrMetadata('placeholder') || this.renderPlaceholder(),
	      value: this.state.value,
	      onChange: this.onChange,
	      onBlur: this.onBlur,
	      options: this.getOptionValuesForReactSelect(collection.models),
	      labelKey: "label",
	      valueKey: "value",
	      ref: this.selectRef
	    });
	  };

	  CollectionPicker.prototype.getSelectAsyncOptions = function() {
	    var collection;
	    collection = this.getCollection();
	    return _.extend(this.getSelectOptions(), {
	      loadOptions: this.onLoadOptions
	    });
	  };

	  CollectionPicker.prototype.hasInputValueChanged = function() {
	    return this.getInputValue() !== this._getValue();
	  };

	  CollectionPicker.prototype.getInputComponent = function() {
	    var ref;
	    return (ref = this.refs) != null ? ref[this.selectRef] : void 0;
	  };

	  CollectionPicker.prototype.focus = function() {
	    if (this.getInputComponent() != null) {
	      return this.getInputComponent().focus();
	    }
	  };

	  CollectionPicker.prototype.getOptionValuesForReactSelect = function(models) {
	    if (models == null) {
	      return [];
	    }
	    return _.map(models, (function(_this) {
	      return function(m) {
	        return {
	          label: _this.getCollectionModelDisplayValue(m),
	          value: _this.getOptionSaveValue(m),
	          model: m
	        };
	      };
	    })(this));
	  };


	  /*
	   Extends Datum class - react-select returns array of options and not a synth event 
	   super expects a synth event but only uses value.
	   
	   Also note that the value passed back to the usage through @props.onChange is
	   the option object(s) for the currently selected option(s)
	   */

	  CollectionPicker.prototype.onChange = function(optionsSelected) {
	    var values;
	    if (this.props.multi) {
	      values = _.pluck(optionsSelected, 'value');
	      if (this.props.setAsString) {
	        values = values.join(',');
	      }
	      return CollectionPicker.__super__.onChange.call(this, values, {
	        propsOnChangeValue: optionsSelected
	      });
	    } else {
	      return CollectionPicker.__super__.onChange.call(this, optionsSelected != null ? optionsSelected.value : void 0, {
	        propsOnChangeValue: optionsSelected
	      });
	    }
	  };

	  CollectionPicker.prototype.onLoadOptions = function(userInput, callback) {
	    var chainedCallback, collection;
	    collection = this.getCollection();
	    this.lastAsyncCallback = callback;
	    chainedCallback = (function(_this) {
	      return function(error, models) {
	        var optionsForReactSelect;
	        if (arguments.length < 2) {
	          models = error;
	          error = false;
	        }
	        models = _this.groupSuggestionModels(userInput, models);
	        optionsForReactSelect = _this.getOptionValuesForReactSelect(models);
	        return _this.lastAsyncCallback(null, {
	          options: optionsForReactSelect
	        });
	      };
	    })(this);
	    switch (false) {
	      case collection.filterForPicker == null:
	        collection.filterForPicker(userInput, chainedCallback, this.props.asyncOptions);
	        break;
	      case this.props.asyncSuggestionCallback == null:
	        this.props.asyncSuggestionCallback(collection, userInput, chainedCallback, this.props.asyncOptions);
	        break;
	      default:
	        this.filterSuggestionModels(collection, userInput, chainedCallback, this.props.asyncOptions);
	    }
	    return null;
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


	  /*
	    This is the model associated with the collectionPicker. This is required to exist because
	    this is the model in which the value is saved. If this does not exist or re-created every time we
	    will not be able to show the value option on the picker.
	   */

	  CollectionPicker.prototype.getModel = function(newProps, newContext) {
	    if (newProps == null) {
	      newProps = this.props;
	    }
	    if (newContext == null) {
	      newContext = this.context;
	    }
	    this.valueModel = (newProps != null ? newProps.model : void 0) || (newContext != null ? newContext.model : void 0) || this.valueModel || new Backbone.Model();
	    return this.valueModel;
	  };

	  return CollectionPicker;

	})(Datum);


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(42);

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Generated by CoffeeScript 1.10.0
	(function () {
	  var StringHelpers, _;

	  _ = __webpack_require__(9);

	  module.exports = StringHelpers = function () {
	    function StringHelpers() {}

	    /*
	      Trims leading and trailing spaces.  Also optionally trims internal excess spaces
	     */

	    StringHelpers.trim = function (str, options) {
	      if (options == null) {
	        options = {};
	      }
	      options = _.defaults(options, {
	        all: false
	      });
	      str = str.replace(/^\s+|\s+$/g, "");
	      if (options.all) {
	        str = str.replace(/\s+/g, ' ');
	      }
	      return str;
	    };

	    /*
	      Adds elipsis to string, if neccessary, for maximum string length not
	      to exceed maxLength
	     */

	    StringHelpers.elipsize = function (str, maxLength) {
	      if (maxLength == null || str.length <= maxLength) {
	        return str;
	      }
	      return str.slice(0, maxLength - 3) + '...';
	    };

	    /*
	      Returns true if the string is all whitespace characters
	     */

	    StringHelpers.isEmpty = function (str) {
	      if (this.weaklyEqual(str, "")) {
	        return true;
	      }
	    };

	    /*
	      Returns true if string starts with any of otherStrings.  
	      otherStrings = one or array to compare to
	     */

	    StringHelpers.startsWith = function (str, otherStrings) {
	      return this._withOneOrArray(otherStrings, function (otherStr) {
	        if (str.slice(0, otherStr.length) === otherStr) {
	          return true;
	        }
	      });
	    };

	    /*
	      Returns true if string ends with any of otherStrings.  
	      otherStrings = one or array to compare to
	     */

	    StringHelpers.endsWith = function (str, otherStrings) {
	      return this._withOneOrArray(otherStrings, function (otherStr) {
	        if (!((otherStr != null ? otherStr.length : void 0) > 0)) {
	          return true;
	        }
	        if (str.slice(-1 * otherStr.length) === otherStr) {
	          return true;
	        }
	      });
	    };

	    /*
	      Returns true if string contains any of otherStrings.  
	      otherStrings = one or array to compare to
	     */

	    StringHelpers.has = function (str, otherStrings) {
	      return this._withOneOrArray(otherStrings, function (otherStr) {
	        if (str.indexOf(otherStr) !== -1) {
	          return true;
	        }
	      });
	    };

	    /*
	      Returns the weak value of the string -- all lowercase, plus trimmed
	      and with excess inner whitespace ignored, locale ignored by default. 
	      
	      The weakly... functions below use this method on both strings being
	      compared to return positive match of mismatched case, etc.
	     */

	    StringHelpers.weakValue = function (str, options) {
	      if (options == null) {
	        options = {};
	      }
	      _.defaults(options, {
	        ignoreCase: true,
	        useLocale: false,
	        trim: true
	      });
	      if (options.trim) {
	        str = this.trim(str, {
	          all: true
	        });
	      }
	      if (options.ignoreCase) {
	        if (options.useLocale) {
	          return str = str.toLocaleLowerCase();
	        } else {
	          return str = str.toLowerCase();
	        }
	      }
	    };

	    /*
	      Returns true if the first string weakly equals any of the otherStrings. 
	      see weakValue() comments
	     */

	    StringHelpers.weaklyEqual = function (str, otherStrings, options) {
	      if (options == null) {
	        options = {};
	      }
	      return this._withOneOrArray(otherStrings, function (_this) {
	        return function (otherStr) {
	          if (_this.weakValue(str, options) === _this.weakValue(otherStr, options)) {
	            return true;
	          }
	        };
	      }(this));
	    };

	    /*
	      Returns -1, 0 or 1 like javascript localeCompare.  Comppares the weak values.  
	      see weakValue() comments
	     */

	    StringHelpers.weaklyCompare = function (str, otherStrings, options) {
	      if (options == null) {
	        options = {};
	      }
	      return this._withOneOrArray(otherStrings, function (_this) {
	        return function (otherStr) {
	          if (_this.weakValue(str, options).localeCompare(_this.weakValue(otherStr, options))) {
	            return true;
	          }
	        };
	      }(this));
	    };

	    /*
	      Returns true if the first string weakly contains any of the otherStrings. 
	      see weakValue() comments
	     */

	    StringHelpers.weaklyHas = function (str, otherStrings) {
	      return this._withOneOrArray(otherStrings, function (_this) {
	        return function (otherStr) {
	          if (_this.weakValue(str).indexOf(_this.weakValue(otherStr)) !== -1) {
	            return true;
	          }
	        };
	      }(this));
	    };

	    /*
	      Returns true if the first string weakly starts with any of the otherStrings. 
	      see weakValue() comments
	     */

	    StringHelpers.weaklyStartsWith = function (str, otherStrings) {
	      return this._withOneOrArray(otherStrings, function (_this) {
	        return function (otherStr) {
	          if (_this.startsWith(_this.weakValue(str), _this.weakValue(otherStr))) {
	            return true;
	          }
	        };
	      }(this));
	    };

	    /*
	      Returns true if the first string weakly ends with any of the otherStrings. 
	      see weakValue() comments
	     */

	    StringHelpers.weaklyEndsWith = function (str, otherStrings) {
	      return this._withOneOrArray(otherStrings, function (_this) {
	        return function (otherStr) {
	          if (_this.endsWith(_this.weakValue(str), _this.weakValue(otherStr))) {
	            return true;
	          }
	        };
	      }(this));
	    };

	    /*
	      makes strings like "this_string", "ThisString", "this-string", "this.string" into
	      "this string"
	     */

	    StringHelpers.humanize = function (str) {
	      var out;
	      out = str.replace(/([A-Z])/g, " $1").replace(/[_\-\.](.)/g, " $1");
	      return out.trim().toLowerCase();
	    };

	    /*  
	      converts a string like "dropCamelCase".decamelize() => "Drop Camel Case"
	     */

	    StringHelpers.decamelize = function (str) {
	      var result;
	      result = str.replace(/_?([A-Z])/g, " $1");
	      result = result.charAt(0).toUpperCase() + result.slice(1);
	      return result.toLowerCase();
	    };

	    /*
	      converts a string like "Drop Camel Case".dropcamelize() => "dropCamelCase"
	     */

	    StringHelpers.dropcamelize = function (str) {
	      var result;
	      result = str.replace(/\s/g, "");
	      return result.charAt(0).toLowerCase() + result.slice(1);
	    };

	    /*
	      capitalize the first letter of a string
	     */

	    StringHelpers.capitalize = function (str) {
	      return str.charAt(0).toUpperCase() + str.substring(1);
	    };

	    /*
	      decapitalize the first letter of a string
	     */

	    StringHelpers.decapitalize = function (str) {
	      return str.charAt(0).toLowerCase() + str.substring(1);
	    };

	    /*
	      returns true if the first letter of a string is capitalized
	     */

	    StringHelpers.isCapitalized = function (str) {
	      return str.match(/^[A-Z].*/) !== null;
	    };

	    /*
	      returns true if all alphabetic characters of string are upper case letters.
	      ignores numbers and punctuation
	     */

	    StringHelpers.isAllCaps = function (str) {
	      return str.match(/^[A-Z\s0-9]*$/) !== null;
	    };

	    /*
	      returns true if string is numeric
	     */

	    StringHelpers.isNumeric = function (str) {
	      return str.toString().match(/^[\-,\+]?[\s\d\.]*$/) !== null;
	    };

	    /*
	      adds thousands separaters optionally truncates decimal portion to decimalPlaces characters
	      slightly enhanced from
	      http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	     */

	    StringHelpers.numerize = function (str, decimalPlaces, zeroFill) {
	      var parts, pow;
	      if (decimalPlaces == null) {
	        decimalPlaces = null;
	      }
	      if (zeroFill == null) {
	        zeroFill = false;
	      }
	      if (decimalPlaces) {
	        pow = Math.pow(10, decimalPlaces);
	        parts = (Math.round(parseFloat(str) * pow) / pow).toString().split(".");
	      } else {
	        parts = str.toString().split('.');
	      }
	      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	      if (decimalPlaces) {
	        if (parts.length > 1) {
	          parts[1] = parts[1].slice(0, decimalPlaces);
	          if (zeroFill) {
	            while (parts[1].length < decimalPlaces) {
	              parts[1] += '0';
	            }
	          }
	        } else if (zeroFill) {
	          parts.push(Array(decimalPlaces + 1).join('0'));
	        }
	      }
	      return parts.join(".");
	    };

	    StringHelpers._withOneOrArray = function (strOrArray, fn) {
	      var array, i, len, str, truth;
	      array = _.isArray(strOrArray) ? strOrArray : [strOrArray];
	      truth = false;
	      for (i = 0, len = array.length; i < len; i++) {
	        str = array[i];
	        if (fn(str) === true) {
	          truth = true;
	          break;
	        }
	      }
	      return truth;
	    };

	    return StringHelpers;
	  }();
	}).call(undefined);

/***/ }
/******/ ])
});
;