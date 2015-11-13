var ReactDatum =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/dist/";

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

	module.exports = {
	  ClickToEditForm: __webpack_require__(2),
	  Collection: __webpack_require__(9),
	  CollectionStats: __webpack_require__(12),
	  Form: __webpack_require__(4),
	  Model: __webpack_require__(13),
	  SelectedModel: __webpack_require__(14),
	  Tilegrid: __webpack_require__(15),
	  Datum: __webpack_require__(6),
	  Email: __webpack_require__(21),
	  LazyPhoto: __webpack_require__(22),
	  Link: __webpack_require__(25),
	  Number: __webpack_require__(26),
	  Text: __webpack_require__(27),
	  WholeNumber: __webpack_require__(28)
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


	/*
	  **ClickToEditForm** is an extension of **Form** that initially presents an
	  "Edit" button that the user can click to switch between display and input.

	  **Datum** children are initialized readonly, when the user clicks edit, the
	  'inputMode' context variable is set to 'edit' and all children are rerendered.

	  See react-datum **Form** component for more props.  All **Form&& properties are
	  supported by **ClickToEditForm**
	 */

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
	      "className": "btn-primary",
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

	module.exports = React;

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


	/*

	 * ReactDatum.Form 

	## This component provides a form context to all of the datums within.  

	    Adding the **ReactDatum.Form** component, you can easily convert a group of datums into an 
	    editable form with save and cancel buttons:

	    <img alt="Screenshot from doc/examples/form/form.html" src="https://gitlab.corp.zulily.com/bwilkerson/react-datum/raw/master/img/react-datum_form-example.png" align="right"/>
	    ```javascript
	    var kittenCard = React.createClass({
	      displayName:"KittenCard",
	      render: function(){
	        return (
	          <div className='kitten-card'>
	            <ReactDatum.Model model={kittenModel}>
	              <h3>Adopt <ReactDatum.Text attr="name"/> Today!</h3>
	              <ReactDatum.Form>
	                <div><ReactDatum.LazyPhoto attr="imgUrl"/></div>
	                <div><ReactDatum.Text attr="name" label="Name" setOnChange/> (<ReactDatum.Text attr="title"/>)</div>
	                <label>Say something about <ReactDatum.Text attr="name" readonly/>: </label>
	                <div><ReactDatum.Text attr="description" className="wide-input"/></div>
	                <div><ReactDatum.Email attr="sponsorEmail" label="Adoption Sponsor" displayLink/></div>
	                <label>Leave a Comment!</label>
	                <div><ReactDatum.Text attr="comment" className="wide-input"/></div>
	              </ReactDatum.Form>
	            </ReactDatum.Model>
	          </div>
	        )
	      }
	    })
	    ```

	    When the user presses save, model.save() is called.   All of the attributes were set() when the user entered new values.  
	    If cancel is clicked, the model and subsequently, the form are reset back to the state of the last model.save().

	    By wrapping the datums in the **ReactDatum.Form** tag, they implicitedly recieve `inputMode='edit'` props that make 
	    them all render as inputs.  Almost all.  Some Datums, like **ReactDatum.LazyPhoto**, only have a display presentation, 
	    no update.  If given an `inputMode='edit'` they will ignore, and continue showing their display (`inputMode='readonly'``) 
	    representation.
	 */

	module.exports = Form = (function(superClass) {
	  extend(Form, superClass);

	  Form.displayName = "react-datum.Form";

	  Form.modelOrObject = function() {
	    return React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Model), React.PropTypes.object]);
	  };

	  Form.propTypes = {

	    /* can also accept model instance as context var. prop has precendence */
	    model: Form.modelOrObject(),

	    /*
	      no formMode like zform, but we have to support programatic readonly
	      see also ClickToEditForm component.   readonly should always take precendence
	     */
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

	module.exports = ReactDOM;

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
	  This is base class of all display+input components that render presentation
	  of an attribute from a Backbone.Model or Javascript object.

	  There is one required prop, 'attr' - the model attribute name.

	  The backbone model or javascript object to get and set attributes on is
	  specified in the @props.model or @context.model. Note that
	  @props.model has precendence.

	  TODO :  Better Examples

	  Display an attribute from a javascript object

	  ```coffeescript
	  render: () ->
	    user = new UsersModel("id24153GSA")
	    user.fetch()

	     * you don't need to wait for the fetch to complete because we are using
	     * the **Model** contextual data component below which will rerender when
	     * the model triggers 'sync'

	    return (
	      <Model model="UserModelClass">
	        <Datum attr="firstName" label="FirstName"/>
	        <Datum attr="firstName" label="LastName"/>
	        <Datum attr="title"/>
	      </Model>
	    )
	  ```

	  Note that for clarity we have provided the **Text** datum.  You should probably
	  use that instead of using **Datum** directly like the example above.  e.g.
	  ```
	    <Text attr="firstName" label="FirstName"/>
	  ```

	  *Validations*

	  Datums support validations.  All validation methods should return either true or an
	  error message.  All datums should support 'required' validation prop.

	  To make a datum required, simply add the required prop to the component.  Ex:
	  ```
	    <Text attr="name" required>
	  ```
	  Validations are run at time of change and the datum element will get an invalid class
	  for optional styling.  An exclamation icon is rendered in red and has a popup that
	  will show all errors for that input.
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

	  Datum.prototype.errors = [];

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
	    return this.renderWrapper((function(_this) {
	      return function() {
	        if (_this.isEditable()) {
	          return _this.renderForInput();
	        } else {
	          return _this.renderForDisplay();
	        }
	      };
	    })(this));
	  };

	  Datum.prototype.renderWrapper = function(contentFn) {
	    return React.createElement("span", {
	      "className": this.getFullClassName(),
	      "data-zattr": this.props.attr,
	      "data-z": true
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
	    if (this.getModelValue() != null) {
	      return this.renderValue();
	    } else {
	      return this.renderPlaceholder();
	    }
	  };

	  Datum.prototype.renderValue = function() {
	    var value;
	    value = this.getValueToRender();
	    value = this.renderEllipsizedValue(value);
	    return this.wrapDisplayValue(value);
	  };

	  Datum.prototype.wrapDisplayValue = function(value) {
	    return React.createElement("span", {
	      "className": "datum-display-value"
	    }, value);
	  };

	  Datum.prototype.renderPlaceholder = function() {
	    var placeholder;
	    placeholder = this.props.placeholder;
	    return React.createElement("span", {
	      "className": "placeholder"
	    }, placeholder);
	  };

	  Datum.prototype.renderEllipsizedValue = function(value, options) {
	    var ellipsizeAt, ellipsizedValue, popover;
	    if (options == null) {
	      options = {};
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
	      "data-value": this.getValueToRender()
	    }, this.renderLabel(), this.renderInput(), this.renderIcons());
	  };

	  Datum.prototype.renderInput = function() {
	    var placeholder, value;
	    placeholder = this.props.placeholder || "";
	    value = this.getValueToRender();
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
	          "className": "error"
	        }, React.createElement("i", {
	          "className": 'icon-exclamation-sign'
	        })));
	      } else {
	        errors = this.state.errors.join('\n');
	        return React.createElement("span", {
	          "className": "error",
	          "title": errors
	        }, React.createElement("i", {
	          "className": 'icon-exclamation-sign fa fa-exclamation-triangle'
	        }));
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
	    return setState({
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

	  Datum.prototype.getValueToRender = function() {
	    return this.getModelValue();
	  };

	  Datum.prototype.getModel = function() {
	    var ref, ref1;
	    return ((ref = this.props) != null ? ref.model : void 0) || ((ref1 = this.context) != null ? ref1.model : void 0) || new Backbone.Model();
	  };

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

	module.exports = Backbone;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Collection, ContextualData, React, SelectableCollection, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Backbone = __webpack_require__(7);

	_ = __webpack_require__(8);

	ContextualData = __webpack_require__(10);

	SelectableCollection = __webpack_require__(11);


	/*
	  Collection component
	  - provides a collection context to all children
	  - rerenders children on collection changes
	  - adds SelectableCollection mixin to collection if it doesn't already have it
	  - will optionally fetch the collection
	  - can accept either a Collection class (which will be instantiated) or a
	  collection instance variable to another collection or Collection component
	 */

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
	      SelectableCollection.mixInto(this.collection);
	    }
	    return this.collection;
	  };

	  return Collection;

	})(ContextualData);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, ContextualData, React, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Backbone = __webpack_require__(7);

	_ = __webpack_require__(8);


	/*
	  This is an abstract base class for contextual data components like
	  widgets.react.Collection and widgets.react.Model that provide a
	  single contextual data element
	 */

	module.exports = ContextualData = (function(superClass) {
	  extend(ContextualData, superClass);

	  function ContextualData() {
	    return ContextualData.__super__.constructor.apply(this, arguments);
	  }


	  /* you need to override these */

	  ContextualData.prototype.dataType = null;

	  ContextualData.prototype.contextKey = null;


	  /* end of pure virtuals */

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var SelectableCollection, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	_ = __webpack_require__(8);


	/*
	  This collection instance mixin provides the ability to mark models as selected and active.

	  There is one active model at a time and many selected. The collection will trigger an "activeModelChanged"
	  event when the active model is set via setActiveModel() method.  Current version of this component does not
	  support having active model that is not selected.  Calling setActiveModel on an unselected model, selects it.

	  example:
	  ```javascript
	    kittensCollection = new Backbone.Collection()
	    SelectableCollection.mixInto(kittensCollection)
	    kittensCollection.onSelectionsChanged(function(){
	      alert("you selected " + kittensCollection.getSelectedModels().length + " kittens")
	    })
	    ...

	    kittensCollection.selectModelByIndex(0)
	    ...
	  ```
	  When a collection is reset([]), or a selected model is removed from the collection it is no longer returned
	  by any of the getSelected... methods.  Only models that exist in the collection can be selected.

	  When a model is selected, model.selected=true.

	  Events triggered on collection:

	    selectionsChanged       - triggered whenever selections change
	    activeModelChanged      - function(activeModel){} triggered on active change
	 */

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

	  SelectableCollection.mixInto = function(collection) {
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
	    return console.error("Warning: using react-datum SelectableCollection mixin will replace the following methods: " + intersect.join(', '));
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

	var Backbone, CollectionStats, React,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Backbone = __webpack_require__(7);


	/*
	  **CollectionStats** provides information about the items in your collection.

	  Requires either a 'collection' context or prop.  And displays counts of
	  items found, selected (if SelectableCollection) and viewing.
	 */

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
	    if (!((this.collection.topDisplayIndex != null) && this.collection.bottomDisplayIndex)) {
	      return null;
	    }
	    return React.createElement("span", {
	      "className": "viewing stats fade in"
	    }, "Viewing ", this._renderCount(this.collection.topDisplayIndex, 'top-index'), " - ", this._renderCount(this.collection.bottomDisplayIndex, 'bottom-index'));
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, ContextualData, Model, React, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Backbone = __webpack_require__(7);

	_ = __webpack_require__(8);

	ContextualData = __webpack_require__(10);


	/*
	  Model react component provides a model context to all children
	 */

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, ContextualData, React, SelectedModel,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Backbone = __webpack_require__(7);

	ContextualData = __webpack_require__(10);


	/*
	  Contextual data component that accepts a collection as a prop or context arg, and
	  provides a context arg called 'model' to all children that is the first selected
	  model in the collection.

	  Example
	  ```jsx
	    <Collection collection={KittensCollectionClass} fetch={true}>
	      <SelectedModel>
	        <Text label="Name of selected model" attr="name"/>
	      </SelectedModel>
	    <Collection>
	  ```
	 */

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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var MultiSelect, React, ReactDom, SingleSelect, Tilegrid, TilegridReact,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	ReactDom = __webpack_require__(5);

	TilegridReact = __webpack_require__(16);

	SingleSelect = __webpack_require__(19);

	MultiSelect = __webpack_require__(20);

	module.exports = Tilegrid = (function(superClass) {
	  extend(Tilegrid, superClass);

	  function Tilegrid() {
	    return Tilegrid.__super__.constructor.apply(this, arguments);
	  }

	  Tilegrid.displayName = "react-datum.Tilegrid";

	  Tilegrid.propTypes = {
	    collection: React.PropTypes.any,
	    tileTemplate: React.PropTypes.node,
	    tilegridClass: React.PropTypes.func,
	    tilegridOptions: React.PropTypes.object,
	    tilegridSelectionClass: React.PropTypes.func,
	    tilegridSelectOptions: React.PropTypes.object
	  };

	  Tilegrid.defaultProps = {
	    tilegridClass: TilegridReact,
	    tileTemplate: null,
	    tilegridOptions: {},
	    tilegridSelectionClass: SingleSelect
	  };

	  Tilegrid.contextTypes = {
	    collection: React.PropTypes.any
	  };

	  Tilegrid.prototype.render = function() {
	    return React.createElement("div", {
	      "className": 'tilegrid-react'
	    });
	  };

	  Tilegrid.prototype.componentDidMount = function() {
	    this.node = ReactDom.findDOMNode(this);
	    this.collection = this.props.collection || this.context.collection;
	    this.tileTemplate = this._getTileTemplate();
	    this.tilegrid = new this.props.tilegridClass(this.node, this.collection, this.tileTemplate, this.props.tilegridOptions);
	    if (this.props.tilegridSelectionClass != null) {
	      return new this.props.tilegridSelectionClass(this.tilegrid, this.props.tilegridSelectOptions);
	    }
	  };

	  Tilegrid.prototype.componentWillUnmount = function() {
	    React.unmountComponentAtNode(this.node);
	    return this.tilegrid.destroy();
	  };

	  Tilegrid.prototype.componentWillReceiveProps = function() {
	    return this.tilegrid.refresh();
	  };

	  Tilegrid.prototype._getTileTemplate = function() {
	    return this.props.tileTemplate || this._findTileChild();
	  };

	  Tilegrid.prototype._findTileChild = function() {
	    return this.props.children;
	  };

	  return Tilegrid;

	})(React.Component);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $, Model, React, ReactDom, Tilegrid, TilegridReact, jQuery,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	ReactDom = __webpack_require__(5);

	$ = jQuery = __webpack_require__(17);

	Tilegrid = __webpack_require__(18);

	Model = __webpack_require__(13);


	/*
	  this extension of the tilegrid allows the use of ReactComponents as the tile template.

	  See views/widgets/react/tilegrid for tile grid that can be used as a React component
	  from JSX

	  Don't pull in to widgets.Tilegrid until we decide to go all in with React.   React is requied
	  above which adds 135KB to download the minified version.
	 */

	module.exports = TilegridReact = (function(superClass) {
	  extend(TilegridReact, superClass);

	  function TilegridReact() {
	    this._cloneTileTemplate = bind(this._cloneTileTemplate, this);
	    this._getTileTemplate = bind(this._getTileTemplate, this);
	    this._renderDerenderedPlaceholder = bind(this._renderDerenderedPlaceholder, this);
	    this._renderTileTemplate = bind(this._renderTileTemplate, this);
	    this.isReactTemplate = bind(this.isReactTemplate, this);
	    this.setTileTemplate = bind(this.setTileTemplate, this);
	    return TilegridReact.__super__.constructor.apply(this, arguments);
	  }

	  TilegridReact.prototype.setTileTemplate = function(tileTemplate) {
	    if (this.isReactTemplate(tileTemplate)) {
	      return this.$tileTemplate = tileTemplate;
	    } else {
	      return TilegridReact.__super__.setTileTemplate.apply(this, arguments);
	    }
	  };

	  TilegridReact.prototype.isReactTemplate = function(template) {
	    if (template == null) {
	      template = this._getTileTemplate();
	    }
	    if (_.isArray(template)) {
	      template = template[0];
	    }
	    return _.intersection(['props', 'type', 'key'], _.keys(template)).length === 3 || template.prototype instanceof React.Component;
	  };

	  TilegridReact.prototype._renderTileTemplate = function($tile, model) {
	    var element, template;
	    template = this._getTileTemplate($tile, model);
	    if (this.isReactTemplate(template)) {
	      element = React.createElement(Model, {
	        'model': model
	      }, template);
	      return {
	        reactComponent: ReactDom.render(element, $tile[0])
	      };
	    } else {
	      return TilegridReact.__super__._renderTileTemplate.apply(this, arguments);
	    }
	  };

	  TilegridReact.prototype._renderDerenderedPlaceholder = function($tile) {
	    var result;
	    result = ReactDom.unmountComponentAtNode($tile[0]);
	    return TilegridReact.__super__._renderDerenderedPlaceholder.apply(this, arguments);
	  };

	  TilegridReact.prototype._getTileTemplate = function($tile, model) {
	    return this.$tileTemplate;
	  };

	  TilegridReact.prototype._cloneTileTemplate = function() {
	    if (this.isReactTemplate()) {
	      return $("<div class='tile'></div>");
	    } else {
	      return TilegridReact.__super__._cloneTileTemplate.apply(this, arguments);
	    }
	  };

	  return TilegridReact;

	})(Tilegrid);


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var $, Backbone, Tilegrid, _, jQuery,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	_ = __webpack_require__(8);

	$ = jQuery = __webpack_require__(17);

	Backbone = __webpack_require__(7);


	/*
	  TileGrid

	  has one element that it renders...
	      one template that is lazily rendered once per model in..
	      one Collection or an array of models or other objects

	  triggers events:
	    tileRendered:  ($newTile, model)   # triggered after a tile is rendered into dom (attach event handlers, etc)
	 */

	module.exports = Tilegrid = (function() {
	  Tilegrid.prototype.$tilegridTemplate = $("<div class=\"tilegrid\">\n    <div class=\"tilegrid-loading fade\">\n        <div class=\"placeholder\">\n            ... more to come ...\n            &nbsp;\n        </div>\n    </div>\n</div>");

	  function Tilegrid(selector, data, tileTemplate1, options) {
	    this.selector = selector;
	    this.data = data;
	    this.tileTemplate = tileTemplate1;
	    if (options == null) {
	      options = {};
	    }
	    this._renderDerenderedPlaceholder = bind(this._renderDerenderedPlaceholder, this);
	    this._derenderTile = bind(this._derenderTile, this);
	    this._derenderOutsideTiles = bind(this._derenderOutsideTiles, this);
	    this._onTileGridClick = bind(this._onTileGridClick, this);
	    this._onResize = bind(this._onResize, this);
	    this._onScroll = bind(this._onScroll, this);
	    this._onModelRemove = bind(this._onModelRemove, this);
	    this._onCollectionAdd = bind(this._onCollectionAdd, this);
	    this._onCollectionSync = bind(this._onCollectionSync, this);
	    this._onCollectionReset = bind(this._onCollectionReset, this);
	    this._loadingInWindow = bind(this._loadingInWindow, this);
	    this._endOfData = bind(this._endOfData, this);
	    this.tileFor = bind(this.tileFor, this);
	    this.findTileAt = bind(this.findTileAt, this);
	    this.tileAt = bind(this.tileAt, this);
	    this._setTileOffsets = bind(this._setTileOffsets, this);
	    this._resetTileOffsets = bind(this._resetTileOffsets, this);
	    this._getTileTemplate = bind(this._getTileTemplate, this);
	    this._renderTileTemplate = bind(this._renderTileTemplate, this);
	    this.renderTile = bind(this.renderTile, this);
	    this.renderTileAt = bind(this.renderTileAt, this);
	    this._cloneTileTemplate = bind(this._cloneTileTemplate, this);
	    this.appendTile = bind(this.appendTile, this);
	    this.getTotalItems = bind(this.getTotalItems, this);
	    this._onEnsureComplete = bind(this._onEnsureComplete, this);
	    this._renderNextPage = bind(this._renderNextPage, this);
	    this.renderAllTiles = bind(this.renderAllTiles, this);
	    this._findBottomTile = bind(this._findBottomTile, this);
	    this._findBottomIndex = bind(this._findBottomIndex, this);
	    this._findTopTile = bind(this._findTopTile, this);
	    this._findTopIndex = bind(this._findTopIndex, this);
	    this.getItemData = bind(this.getItemData, this);
	    this._onEnsureRowsComplete = bind(this._onEnsureRowsComplete, this);
	    this._ensureViewport = bind(this._ensureViewport, this);
	    this._renderViewport = bind(this._renderViewport, this);
	    this._renderGrid = bind(this._renderGrid, this);
	    this._initializeCollection = bind(this._initializeCollection, this);
	    this.updateCollectionViewStats = bind(this.updateCollectionViewStats, this);
	    this.getRenderedTiles = bind(this.getRenderedTiles, this);
	    this.setActiveTileFor = bind(this.setActiveTileFor, this);
	    this.setActiveTile = bind(this.setActiveTile, this);
	    this.getActiveTile = bind(this.getActiveTile, this);
	    this.setTileTemplate = bind(this.setTileTemplate, this);
	    this.focus = bind(this.focus, this);
	    this.render = bind(this.render, this);
	    this.refresh = bind(this.refresh, this);
	    this.reset = bind(this.reset, this);
	    this.destroy = bind(this.destroy, this);
	    this.initialize = bind(this.initialize, this);
	    this.options = _.defaults(options, {
	      pageSize: 50,
	      preloadCushion: 400,
	      ignoreViewport: false,
	      hideFunction: null
	    });
	    this.setTileTemplate(this.tileTemplate);
	    this.tileOffsets = [];
	    if (!(_.isArray(this.data) || this.data instanceof Backbone.Collection)) {
	      throw "Tilegrid expects @data constructor arg to be either and array or a Collection";
	    }
	    this.debouncedRefresh = _.debounce(this.refresh, 200);
	    this.debouncedRender = _.debounce(this.render, 200);
	    this.initialize();
	  }

	  Tilegrid.prototype.initialize = function() {
	    var ref, ref1;
	    this.$element = $(this.selector);
	    _.extend(this, Backbone.Events);
	    if (!(((ref = this.$element) != null ? ref.length : void 0) > 0)) {
	      throw "Dev: error: " + this.$element.selector + " not found in DOM";
	    }
	    this._initializeCollection();
	    this._renderGrid();
	    this.reset();
	    return (ref1 = this.$tilegrid) != null ? ref1.data('tilegrid', this) : void 0;
	  };

	  Tilegrid.prototype.destroy = function() {
	    var ref;
	    return (ref = this.$tilegrid) != null ? ref.data('tilegrid', null) : void 0;
	  };

	  Tilegrid.prototype.reset = function(options) {
	    var i, len, ref, tileEl;
	    if (options == null) {
	      options = {};
	    }
	    options = _.defaults(options, {
	      soft: false
	    });
	    this._$tilesByModelId = {};
	    if (options.soft) {
	      ref = this.$element.find('.tile');
	      for (i = 0, len = ref.length; i < len; i++) {
	        tileEl = ref[i];
	        this._derenderTile($(tileEl));
	      }
	    } else {
	      this.lastRenderedIndex = -1;
	      this.$element.find('.tile').remove();
	    }
	    this.$loadingIndicator.addClass('in');
	    this._resetTileOffsets();
	    return this;
	  };

	  Tilegrid.prototype.refresh = function() {
	    this.reset({
	      soft: true
	    });
	    return this._ensureViewport();
	  };

	  Tilegrid.prototype.render = function() {
	    this._renderViewport();
	    return this;
	  };

	  Tilegrid.prototype.focus = function() {
	    var base;
	    if (this.selections != null) {
	      return typeof (base = this.selections).focus === "function" ? base.focus() : void 0;
	    } else {
	      return _.delay(((function(_this) {
	        return function() {
	          return _this.$tilegrid.focus();
	        };
	      })(this)), 100);
	    }
	  };

	  Tilegrid.prototype.setTileTemplate = function(tileTemplate) {
	    this.$tileTemplate = $(tileTemplate);
	    if (this.$tileTemplate.length <= 0) {
	      throw "dev error: Invalid template in TileGrid construction:<br>" + tileTemplate;
	    }
	  };

	  Tilegrid.prototype.getActiveTile = function() {
	    var ref;
	    return (ref = this.selections) != null ? typeof ref.getActiveTile === "function" ? ref.getActiveTile() : void 0 : void 0;
	  };

	  Tilegrid.prototype.setActiveTile = function(index) {
	    var ref;
	    return (ref = this.selections) != null ? typeof ref.setActiveTile === "function" ? ref.setActiveTile(index) : void 0 : void 0;
	  };

	  Tilegrid.prototype.setActiveTileFor = function(model) {
	    var $tile, index, ref;
	    if (model == null) {
	      return null;
	    }
	    $tile = this.tileFor(model);
	    if (!(($tile != null ? $tile.length : void 0) > 0)) {
	      return null;
	    }
	    index = $tile.data('index');
	    if (index == null) {
	      throw "dev: unexpected: tile for model " + model.id + " has no index attribute";
	    }
	    if ((ref = this.selections) != null) {
	      ref.setActiveTile(index);
	    }
	    return $tile;
	  };

	  Tilegrid.prototype.getRenderedTiles = function() {
	    return _.values(this._$tilesByModelId);
	  };

	  Tilegrid.prototype.updateCollectionViewStats = function(options) {
	    var base, ref, totalRows;
	    if (options == null) {
	      options = {};
	    }
	    if (this.collection == null) {
	      return;
	    }
	    if (this.collection.hasStats) {
	      options = _.defaults(options, {
	        topDisplayIndex: this._findTopIndex(),
	        bottomDisplayIndex: this._findBottomIndex()
	      });
	      totalRows = this.collection.getLength();
	      if (totalRows <= 0) {
	        this.collection.updateStats({
	          topDisplayIndex: 0,
	          bottomDisplayIndex: 0
	        });
	      } else {
	        this.collection.updateStats(options);
	      }
	      return (ref = this.$emptyIndicator) != null ? ref.toggle(totalRows <= 0) : void 0;
	    } else {
	      this.collection.topDisplayIndex = this._findTopIndex();
	      this.collection.bottomDisplayIndex = this._findBottomIndex();
	      return typeof (base = this.collection).trigger === "function" ? base.trigger('viewStatsChanged') : void 0;
	    }
	  };

	  Tilegrid.prototype._initializeCollection = function() {
	    var ref, ref1, ref2;
	    if (this.data instanceof Backbone.Collection) {
	      this.collection || (this.collection = this.data);
	    }
	    if ((ref = this.collection) != null) {
	      ref.on('reset', this._onCollectionReset);
	    }
	    if ((ref1 = this.collection) != null) {
	      ref1.on('sync', this._onCollectionSync);
	    }
	    return (ref2 = this.collection) != null ? ref2.on('add', this._onCollectionAdd) : void 0;
	  };

	  Tilegrid.prototype._renderGrid = function() {
	    if (this.$tilegrid && this.$tilegrid.length > 0) {
	      return this.$tilegrid;
	    }
	    this.$tilegrid = this.$tilegridTemplate.clone();
	    this.$element.html(this.$tilegrid);
	    this.$loadingIndicator = this.$element.find('.tilegrid-loading');
	    if (!this.options.ignoreViewport) {
	      this._debouncedOnScroll = _.debounce(this._onScroll, 100);
	      this._debouncedOnResize = _.debounce(this._onResize, 100);
	      this.$tilegrid.on('scroll', this._debouncedOnScroll);
	      this.$tilegrid.on('resize', this._debouncedOnResize);
	    }
	    this.$tilegrid.on('click', this._onTilegridClick);
	    return this.$tilegrid;
	  };

	  Tilegrid.prototype._renderViewport = function() {
	    if (!((this.collection == null) || this.collection.lastFetched)) {
	      return;
	    }
	    if (this._loadingInWindow()) {
	      return this._renderNextPage({
	        success: (function(_this) {
	          return function() {
	            return _.defer(_this._renderViewport);
	          };
	        })(this)
	      });
	    } else {
	      return this._ensureViewport();
	    }
	  };

	  Tilegrid.prototype._ensureViewport = function() {
	    var $bottomTile, $topTile, bottomIndex, topIndex;
	    if (this.options.ignoreViewport) {
	      return;
	    }
	    $topTile = this._findTopTile();
	    topIndex = $topTile != null ? $topTile.data('index') : void 0;
	    $bottomTile = this._findBottomTile();
	    bottomIndex = $bottomTile != null ? $bottomTile.data('index') : void 0;
	    if (!((topIndex != null) && (bottomIndex != null))) {
	      return;
	    }
	    this.updateCollectionViewStats({
	      topDisplayIndex: topIndex + 1,
	      bottomDisplayIndex: bottomIndex + 1
	    });
	    this.topRenderIndex = Math.max(topIndex - this.options.pageSize, 0);
	    this.bottomRenderIndex = (bottomIndex || 0) + this.options.pageSize;
	    if ((this.collection != null) && _.isFunction(this.collection.ensureRows)) {
	      return this.collection.ensureRows(this.topRenderIndex, this.bottomRenderIndex, {
	        complete: this._onEnsureRowsComplete
	      });
	    } else {
	      return this._onEnsureRowsComplete();
	    }
	  };

	  Tilegrid.prototype._onEnsureRowsComplete = function() {
	    var $nextTile, $tile, index, model;
	    $tile = this.findTileAt(this.topRenderIndex);
	    index = this.topRenderIndex;
	    while (true) {
	      if (!($tile && $tile.length > 0)) {
	        break;
	      }
	      if (index != null) {
	        model = this.getItemData(index);
	      }
	      $nextTile = $tile.next('.tile');
	      if (model != null) {
	        this.renderTile($tile, model);
	      } else {
	        $tile.remove();
	      }
	      $tile = $nextTile;
	      if ((index += 1) > this.bottomRenderIndex) {
	        break;
	      }
	    }
	    return this._derenderOutsideTiles(this.topRenderIndex, this.bottomRenderIndex);
	  };

	  Tilegrid.prototype.getItemData = function(index) {
	    var ref;
	    return ((ref = this.collection) != null ? ref.getItem(index, {
	      warn: true
	    }) : void 0) || this.data[index];
	  };

	  Tilegrid.prototype._findTopIndex = function(startingAt) {
	    var $tile;
	    if (startingAt == null) {
	      startingAt = 0;
	    }
	    $tile = this._findTopTile(startingAt);
	    return $tile != null ? $tile.data('index') : void 0;
	  };

	  Tilegrid.prototype._findTopTile = function(startingAt) {
	    var $tile, gridTop, i, index, ref, ref1, tileOffset;
	    if (startingAt == null) {
	      startingAt = 0;
	    }
	    gridTop = this.$tilegrid.scrollTop();
	    for (index = i = ref = startingAt, ref1 = this.tileOffsets.length; ref <= ref1 ? i < ref1 : i > ref1; index = ref <= ref1 ? ++i : --i) {
	      tileOffset = this.tileOffsets[index];
	      if (tileOffset == null) {
	        continue;
	      }
	      if (tileOffset.bottom > gridTop) {
	        break;
	      }
	    }
	    $tile = this.findTileAt(index);
	    return $tile;
	  };

	  Tilegrid.prototype._findBottomIndex = function(startingAt) {
	    var $tile;
	    if (startingAt == null) {
	      startingAt = 0;
	    }
	    $tile = this._findBottomTile(startingAt);
	    return $tile != null ? $tile.data('index') : void 0;
	  };

	  Tilegrid.prototype._findBottomTile = function(startingAt) {
	    var $tile, gridBottom, i, index, ref, ref1, tileOffset;
	    if (startingAt == null) {
	      startingAt = 0;
	    }
	    gridBottom = this.$tilegrid.scrollTop() + this.$tilegrid.height();
	    for (index = i = ref = startingAt, ref1 = this.tileOffsets.length; ref <= ref1 ? i < ref1 : i > ref1; index = ref <= ref1 ? ++i : --i) {
	      tileOffset = this.tileOffsets[index];
	      if (tileOffset == null) {
	        continue;
	      }
	      if (tileOffset.top > gridBottom) {
	        break;
	      }
	    }
	    $tile = this.findTileAt(index - 1);
	    return $tile;
	  };

	  Tilegrid.prototype.renderAllTiles = function(options) {
	    var i, len, model, ref, ref1, results;
	    if (options == null) {
	      options = {};
	    }
	    this.lastRenderedIndex = -1;
	    ref1 = ((ref = this.collection) != null ? ref.models : void 0) || this.data;
	    results = [];
	    for (i = 0, len = ref1.length; i < len; i++) {
	      model = ref1[i];
	      results.push(this.appendTile());
	    }
	    return results;
	  };

	  Tilegrid.prototype._renderNextPage = function(options) {
	    var first, last;
	    if (options == null) {
	      options = {};
	    }
	    first = this.lastRenderedIndex + 1;
	    last = first + this.options.pageSize;
	    this.lastFirst = first;
	    if ((this.collection != null) && _.isFunction(this.collection.ensureRows)) {
	      return this.collection.ensureRows(first, last, {
	        complete: this._onEnsureComplete
	      });
	    } else {
	      return this._onEnsureComplete(first, last);
	    }
	  };

	  Tilegrid.prototype._onEnsureComplete = function(first, last) {
	    var i, index, ref, ref1;
	    for (index = i = ref = first, ref1 = last; ref <= ref1 ? i < ref1 : i > ref1; index = ref <= ref1 ? ++i : --i) {
	      if (index >= this.getTotalItems()) {
	        this._endOfData();
	        break;
	      }
	      this.appendTile(index);
	    }
	    return typeof options.success === "function" ? options.success() : void 0;
	  };

	  Tilegrid.prototype.getTotalItems = function() {
	    var ref;
	    return ((ref = this.collection) != null ? ref.totalRows : void 0) || this.data.length;
	  };

	  Tilegrid.prototype.appendTile = function(index) {
	    var $tile, model;
	    if (index == null) {
	      index = this.lastRenderedIndex + 1;
	    }
	    model = this.getItemData(index);
	    if (model == null) {
	      return;
	    }
	    this.lastRenderedIndex = index;
	    $tile = this._cloneTileTemplate();
	    $tile.attr('data-index', index);
	    this.$loadingIndicator.before($tile);
	    return this.renderTile($tile, model);
	  };

	  Tilegrid.prototype._cloneTileTemplate = function() {
	    return this.$tileTemplate.clone();
	  };

	  Tilegrid.prototype.renderTileAt = function(index) {
	    var $tile, model;
	    $tile = this.tileAt(index);
	    model = this.getItemData(index);
	    if ($tile && model) {
	      return this.renderTile($tile, model);
	    }
	  };

	  Tilegrid.prototype.renderTile = function($tile, model) {
	    if ($tile.hasClass('rendered')) {
	      return;
	    }
	    this._$tilesByModelId[model.id] = $tile;
	    model.on("remove", this._onModelRemove);
	    this._renderTileTemplate($tile, model);
	    $tile.removeAttr('style');
	    $tile.toggleClass("selected", model.selected === true);
	    $tile.addClass("rendered");
	    $tile.attr('data-id', model.id);
	    if ($tile.hasClass('underscore-tile')) {
	      this.underscroreTemplate || (this.underscroreTemplate = _.template(this.tileTemplate));
	      $tile.html(this.underscroreTemplate(model.attributes));
	    }
	    if (this.options.hideFunction && this.options.hideFunction(model)) {
	      $tile.addClass('hidden');
	    }
	    this.trigger('tileRendered', $tile, model);
	    return _.defer((function(_this) {
	      return function() {
	        return _this._setTileOffsets($tile);
	      };
	    })(this));
	  };

	  Tilegrid.prototype._renderTileTemplate = function($tile, model) {
	    return $tile.html(this._getTileTemplate($tile, model));
	  };

	  Tilegrid.prototype._getTileTemplate = function($tile, model) {
	    return this.$tileTemplate.html();
	  };

	  Tilegrid.prototype._resetTileOffsets = function() {
	    var i, len, ref, results, tile;
	    this.tileOffsets = [];
	    ref = this.$element.find('.tile');
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      tile = ref[i];
	      results.push(this._setTileOffsets($(tile)));
	    }
	    return results;
	  };

	  Tilegrid.prototype._setTileOffsets = function($tile) {
	    var tileIndex, tileTop;
	    tileIndex = parseInt($tile.data('index'));
	    tileTop = $tile.position().top;
	    return this.tileOffsets[tileIndex] = {
	      top: this.$tilegrid.scrollTop() + tileTop,
	      bottom: this.$tilegrid.scrollTop() + tileTop + $tile.outerHeight()
	    };
	  };

	  Tilegrid.prototype.tileAt = function(index) {
	    return this._$tilesByModelId[this.getItemData(index).id];
	  };

	  Tilegrid.prototype.findTileAt = function(index) {
	    return this.$tilegrid.find("> .tile[data-index='" + index + "']");
	  };

	  Tilegrid.prototype.tileFor = function(model) {
	    var key;
	    key = model.id || model;
	    return this._$tilesByModelId[key];
	  };

	  Tilegrid.prototype._endOfData = function(options) {
	    if (options == null) {
	      options = {};
	    }
	    return this.$loadingIndicator.removeClass('in');
	  };

	  Tilegrid.prototype._loadingInWindow = function() {
	    var inWindow, loadingTop, scrollBottom, scrollHeight, scrollTop;
	    if (!this.$loadingIndicator.hasClass('in')) {
	      return false;
	    }
	    if (!(this.$element.is(':visible') && this.$loadingIndicator.is(':visible'))) {
	      return false;
	    }
	    if (this.$element.outerHeight() > 5000) {
	      console.error(("dev error: the outer height of the .tilegrid element for " + this.selector + " is saying it's outer height ") + "is greater that 5000.  You need to set the height to something other than auto. ");
	      scrollHeight = 5000;
	    } else {
	      scrollHeight = this.$element.outerHeight();
	    }
	    scrollTop = this.$element.scrollTop();
	    scrollBottom = scrollTop + scrollHeight;
	    loadingTop = this.$loadingIndicator.position().top;
	    inWindow = loadingTop < scrollBottom + this.options.preloadCushion;
	    return inWindow;
	  };

	  Tilegrid.prototype._onCollectionReset = function() {
	    this.reset();
	    return this.render();
	  };

	  Tilegrid.prototype._onCollectionSync = function() {
	    return this.debouncedRefresh();
	  };

	  Tilegrid.prototype._onCollectionAdd = function() {
	    return this.debouncedRender();
	  };

	  Tilegrid.prototype._onModelRemove = function(model) {
	    var $tile;
	    model.off("remove", this._onModelRemove);
	    $tile = this._$tilesByModelId[model.id];
	    return this._derenderTile($tile);
	  };

	  Tilegrid.prototype._onScroll = function() {
	    return this._renderViewport();
	  };

	  Tilegrid.prototype._onResize = function() {
	    this._resetTileOffsets();
	    return this._renderViewport();
	  };

	  Tilegrid.prototype._onTileGridClick = function(evt) {
	    return evt.preventDefault();
	  };

	  Tilegrid.prototype._derenderOutsideTiles = function(topTileIndex, bottomTileIndex) {
	    var $tile, bottomAcceptable, i, index, len, numInView, ref, results, tile, topAcceptable;
	    if (topTileIndex == null) {
	      topTileIndex = this._findTopIndex();
	    }
	    if (bottomTileIndex == null) {
	      bottomTileIndex = this._findBottomIndex();
	    }
	    numInView = bottomTileIndex - topTileIndex;
	    ref = this.$element.find('.tile.rendered');
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      tile = ref[i];
	      $tile = $(tile);
	      index = $tile.data('index');
	      topAcceptable = topTileIndex;
	      bottomAcceptable = bottomTileIndex;
	      if (index >= topAcceptable && index <= bottomAcceptable) {
	        continue;
	      }
	      results.push(this._derenderTile($tile));
	    }
	    return results;
	  };

	  Tilegrid.prototype._derenderTile = function($tile) {
	    var modelId, zform;
	    if (!($tile && $tile.length > 0)) {
	      return;
	    }
	    $tile.css({
	      height: $tile.height(),
	      width: $tile.width()
	    });
	    this._renderDerenderedPlaceholder($tile);
	    $tile.removeClass("rendered");
	    $tile.removeClass("selected");
	    modelId = $tile.data('id');
	    if (modelId == null) {
	      return;
	    }
	    $tile.removeAttr('data-id', null);
	    delete this._$tilesByModelId[modelId];
	    zform = $tile.data('zform');
	    if (zform != null) {
	      return zform.destroy();
	    }
	  };

	  Tilegrid.prototype._renderDerenderedPlaceholder = function($tile) {
	    return $tile.html("<div class='placeholder'>. . .</div>");
	  };

	  return Tilegrid;

	})();


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var $, SelectableCollection, SingleSelect, _, jQuery,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	_ = __webpack_require__(8);

	$ = jQuery = __webpack_require__(17);

	SelectableCollection = __webpack_require__(11);


	/*
	  This class implements the methods necessary to connect selections in a Tilegrid widget to a Collection with the
	  SelectableCollection mixin.

	  This is the implementation of a single select strategy for Tilegrid.  Clicking a tile selects the
	  corresponding model in the collection throuh selectableCollection#selectModel interfaces.

	  See widgets.tilegrid.MultiSelect for a multiselect strategy that supports selecting multiple models
	  and clicking and dragging to select multiple models.

	  Usage:  simply construct an instance of this class any time after constructing a Tilegrid and pass the tilegrid
	  instance to SingleSelect constructor:

	    new SingleSelect(@tilegrid)

	  **Note for React users**: this class is initialized by the selection='single' prop on <Rb.Tilegrid>

	  Note that constructing this class on a Tilegrid with a collection will cause the selectableCollection
	  mixin to be added to the collection.  See mixins/SelectableCollection
	 */

	module.exports = SingleSelect = (function() {
	  function SingleSelect(tilegrid, options) {
	    this.tilegrid = tilegrid;
	    if (options == null) {
	      options = {};
	    }
	    this._scrollIntoView = bind(this._scrollIntoView, this);
	    this._getTileFromEvent = bind(this._getTileFromEvent, this);
	    this._getIndexFromEvent = bind(this._getIndexFromEvent, this);
	    this._getSameTileOnRelativeRow = bind(this._getSameTileOnRelativeRow, this);
	    this._getSameIndexOnRelativeRow = bind(this._getSameIndexOnRelativeRow, this);
	    this._onRightArrow = bind(this._onRightArrow, this);
	    this._onLeftArrow = bind(this._onLeftArrow, this);
	    this._onPageUp = bind(this._onPageUp, this);
	    this._onPageDown = bind(this._onPageDown, this);
	    this._onUpArrow = bind(this._onUpArrow, this);
	    this._onDownArrow = bind(this._onDownArrow, this);
	    this._onKeydown = bind(this._onKeydown, this);
	    this._getKeymap = bind(this._getKeymap, this);
	    this._onSelectAll = bind(this._onSelectAll, this);
	    this._onSelectionsChanged = bind(this._onSelectionsChanged, this);
	    this._onTileMouseUp = bind(this._onTileMouseUp, this);
	    this._onTileMouseDown = bind(this._onTileMouseDown, this);
	    this._onTileRendered = bind(this._onTileRendered, this);
	    this._onFocusSinkFocus = bind(this._onFocusSinkFocus, this);
	    this._initializeKeyboard = bind(this._initializeKeyboard, this);
	    this._initializeCollection = bind(this._initializeCollection, this);
	    this._initializeTilegrid = bind(this._initializeTilegrid, this);
	    this.focus = bind(this.focus, this);
	    this.getNextTile = bind(this.getNextTile, this);
	    this.getPreviousTile = bind(this.getPreviousTile, this);
	    this.setActiveTile = bind(this.setActiveTile, this);
	    this.getActiveTile = bind(this.getActiveTile, this);
	    this.resetActiveTile = bind(this.resetActiveTile, this);
	    this.selectNone = bind(this.selectNone, this);
	    this.selectToggle = bind(this.selectToggle, this);
	    this.selectOnlyOne = bind(this.selectOnlyOne, this);
	    this.selectOne = bind(this.selectOne, this);
	    this.initialize = bind(this.initialize, this);
	    this.options = _.defaults(options, {
	      selectOneOnSelected: true,
	      scrollOptions: {
	        duration: 0,
	        cushion: {
	          top: 40,
	          bottom: 40
	        }
	      }
	    });
	    this.collection = this.tilegrid.collection;
	    if (!this.collection.hasSelectableCollectionMixin) {
	      SelectableCollection.mixInto(this.collection);
	    }
	    this.initialize();
	  }

	  SingleSelect.prototype.initialize = function() {
	    this._initializeTilegrid();
	    this._initializeCollection();
	    this._initializeKeyboard();
	    return this;
	  };

	  SingleSelect.prototype.selectOne = function(index, selected, options) {
	    if (selected == null) {
	      selected = true;
	    }
	    if (options == null) {
	      options = {};
	    }
	    options = _.defaults(options, {
	      silent: false,
	      active: true
	    });
	    if (selected === true && options.active) {
	      return this.setActiveTile(index);
	    } else {
	      return this.collection.selectModelByIndex(index, selected, options);
	    }
	  };

	  SingleSelect.prototype.selectOnlyOne = function(index) {
	    if (!((index != null) && index >= 0)) {
	      return;
	    }
	    this.selectNone();
	    return this.selectOne(index);
	  };

	  SingleSelect.prototype.selectToggle = function(index) {
	    return this.selectOne(index, 'toggle');
	  };

	  SingleSelect.prototype.selectNone = function() {
	    this.collection.selectNone();
	    return this.resetActiveTile();
	  };

	  SingleSelect.prototype.resetActiveTile = function() {
	    return this.setActiveTile(null);
	  };

	  SingleSelect.prototype.getActiveTile = function() {
	    return this.tilegrid.$element.find('.tile.active');
	  };

	  SingleSelect.prototype.setActiveTile = function(index) {
	    var $newActive, $prevActive;
	    $prevActive = this.getActiveTile();
	    $newActive = null;
	    if (index != null) {
	      $newActive = this.tilegrid.findTileAt(index);
	      if ($newActive && $newActive.length > 0 && !$newActive.is($prevActive)) {
	        $prevActive.removeClass('active');
	        this._scrollIntoView($newActive.addClass('active'), $newActive.scrollParent(), this.options.scrollOptions);
	      }
	    } else {
	      $prevActive.removeClass('active');
	    }
	    if (($prevActive && !$newActive) || (!$prevActive && $newActive) || !($newActive != null ? $newActive.is($prevActive) : void 0)) {
	      this.collection.setActiveIndex(index);
	      if (index != null) {
	        this.collection.selectModelByIndex(index);
	      }
	      this.tilegrid.trigger('activeTileChanged', $newActive, $prevActive);
	    }
	    return $newActive;
	  };

	  SingleSelect.prototype.getPreviousTile = function() {
	    return this.getActiveTile().prevAll('.tile:visible').first();
	  };

	  SingleSelect.prototype.getNextTile = function() {
	    return this.getActiveTile().nextAll('.tile:visible').first();
	  };

	  SingleSelect.prototype.focus = function() {
	    return this.$focusSink.focus();
	  };

	  SingleSelect.prototype._initializeTilegrid = function() {
	    this.tilegrid.on("tileRendered", this._onTileRendered);
	    this.tilegrid.$element.on("mousedown.SingleSelect", ".tile", this._onTileMouseDown);
	    this.tilegrid.$element.on("mouseup.SingleSelect", ".tile", this._onTileMouseUp);
	    return this.tilegrid.selections = this;
	  };

	  SingleSelect.prototype._initializeCollection = function() {
	    this.collection.on('selectionsChanged', this._onSelectionsChanged);
	    return this.collection.on('selectAll', this._onSelectAll);
	  };

	  SingleSelect.prototype._initializeKeyboard = function() {
	    this.tilegrid.$element.on("click", this.focus);
	    this.$focusSink = $("<input class=\"tilegrid-focus-sink\" type=\"text\">");
	    this.tilegrid.$element.prepend(this.$focusSink);
	    this.$focusSink.on('keydown', this._onKeydown);
	    return this.$focusSink.on('focus', this._onFocusSinkFocus);
	  };

	  SingleSelect.prototype._onFocusSinkFocus = function() {};

	  SingleSelect.prototype._onTileRendered = function($tile, model) {
	    if (model.selected) {
	      if ($tile != null) {
	        $tile.addClass('selected');
	      }
	    }
	    if (model.active) {
	      return $tile != null ? $tile.addClass('active') : void 0;
	    }
	  };

	  SingleSelect.prototype._onTileMouseDown = function(evt) {
	    var index, ref;
	    evt.preventDefault();
	    if ($(evt.target).hasClass('no-select')) {
	      return;
	    }
	    index = this._getIndexFromEvent(evt);
	    if (this.options.selectOneOnSelected) {
	      if (!((ref = this.tilegrid.tileAt(index)) != null ? ref.hasClass('active') : void 0)) {
	        return this.selectOnlyOne(index);
	      }
	    } else {
	      this.setActiveTile(index);
	      return this.collection.trigger('selectedClicked', index, evt);
	    }
	  };

	  SingleSelect.prototype._onTileMouseUp = function(evt) {};

	  SingleSelect.prototype._onSelectionsChanged = function() {
	    var $tile, i, len, ref, ref1, results, selectedIndexes, tile;
	    selectedIndexes = _.pluck(this.collection.getSelectedModels(), "index");
	    if (selectedIndexes.length <= 0) {
	      this.resetActiveTile();
	      return this.tilegrid.$element.find('.rendered.selected').removeClass('selected');
	    } else {
	      ref = this.tilegrid.$element.find('.rendered');
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        tile = ref[i];
	        $tile = $(tile);
	        results.push($tile.toggleClass('selected', (ref1 = $tile.data('index'), indexOf.call(selectedIndexes, ref1) >= 0)));
	      }
	      return results;
	    }
	  };

	  SingleSelect.prototype._onSelectAll = function() {
	    return this.setActiveTile(0);
	  };

	  SingleSelect.prototype._getKeymap = function() {
	    return {
	      40: this._onDownArrow,
	      38: this._onUpArrow,
	      33: this._onPageUp,
	      34: this._onPageDown,
	      37: this._onLeftArrow,
	      39: this._onRightArrow
	    };
	  };

	  SingleSelect.prototype._onKeydown = function(evt) {
	    var base, name;
	    return typeof (base = this._getKeymap())[name = evt.keyCode] === "function" ? base[name](evt) : void 0;
	  };

	  SingleSelect.prototype._onDownArrow = function(evt) {
	    return this.selectOnlyOne(this._getSameIndexOnRelativeRow(1));
	  };

	  SingleSelect.prototype._onUpArrow = function(evt) {
	    return this.selectOnlyOne(this._getSameIndexOnRelativeRow(-1));
	  };

	  SingleSelect.prototype._onPageDown = function(evt) {
	    return this.selectOnlyOne(this._getSameIndexOnRelativeRow(5));
	  };

	  SingleSelect.prototype._onPageUp = function(evt) {
	    return this.selectOnlyOne(this._getSameIndexOnRelativeRow(-5));
	  };

	  SingleSelect.prototype._onLeftArrow = function(evt) {
	    return this.selectOnlyOne(this.getPreviousTile().data('index'));
	  };

	  SingleSelect.prototype._onRightArrow = function(evt) {
	    return this.selectOnlyOne(this.getNextTile().data('index'));
	  };

	  SingleSelect.prototype._getSameIndexOnRelativeRow = function(nRows) {
	    var ref;
	    return (ref = this._getSameTileOnRelativeRow(nRows)) != null ? ref.data('index') : void 0;
	  };

	  SingleSelect.prototype._getSameTileOnRelativeRow = function(nRows) {
	    var $active, $n, $next, activeBottom, activeHeight, activeLeft, activeRight, activeTop, activeWidth, nBottom, nHeight, nLeft, nRight, nTop, nWidth, rowsToTraverse;
	    $active = this.tilegrid.$element.find('.tile.active');
	    if (nRows === 0) {
	      return $active;
	    }
	    $next = $active;
	    rowsToTraverse = Math.abs(nRows);
	    while (true) {
	      if (nRows > 0) {
	        $n = $next.nextAll('.tile:visible').first();
	      } else {
	        $n = $next.prevAll('.tile:visible').first();
	      }
	      if ($n.length <= 0) {
	        break;
	      }
	      nHeight = $n.height();
	      nWidth = $n.width();
	      nTop = $n.position().top;
	      nBottom = nTop + nHeight;
	      nLeft = $n.position().left;
	      nRight = nLeft + nWidth;
	      activeHeight = $active.height();
	      activeWidth = $active.width();
	      activeTop = $active.position().top;
	      activeBottom = activeTop + activeHeight;
	      activeLeft = $active.position().left;
	      activeRight = activeLeft + activeWidth;
	      if ((nRows > 0 && nTop > activeBottom && (nLeft >= activeLeft || nRight >= activeRight)) || (nRows < 0 && nTop < activeTop && (nLeft <= activeLeft || nRight <= activeRight))) {
	        $active = $n;
	        rowsToTraverse -= 1;
	      }
	      $next = $n;
	      if (rowsToTraverse <= 0) {
	        break;
	      }
	    }
	    return $next;
	  };

	  SingleSelect.prototype._getIndexFromEvent = function(evt) {
	    var $tile, index;
	    $tile = this._getTileFromEvent(evt);
	    if (!$tile) {
	      return -1;
	    }
	    index = $tile.data('index');
	    if (index == null) {
	      throw "dev: error: invalid tile found in tilegrid, no data-index attribute";
	    }
	    return index;
	  };

	  SingleSelect.prototype._getTileFromEvent = function(evt) {
	    var $target, $tile;
	    $target = $(evt.target);
	    $tile = $target.closest('.tile');
	    if ($tile.length <= 0) {
	      console.warn("dev: error: _getIndexFromEvent unable to find .tile for " + $target.selector);
	      return null;
	    }
	    return $tile;
	  };

	  SingleSelect.prototype._scrollIntoView = function($tile, $parent, options) {
	    var $tileHeight, $tileLeft, $tileTop, $tileWidth, attrs, isAbove, isBelow, isLeft, isRight, parentHeight, parentLeft, parentScrollTop, parentTop, parentWidth;
	    if ($parent == null) {
	      $parent = this.scrollParent();
	    }
	    if (options == null) {
	      options = {};
	    }
	    options = _.defaults(options, {
	      cushion: {},
	      duration: 100,
	      alwaysAtTop: false,
	      top: null,
	      left: null,
	      height: null,
	      width: null
	    });
	    if (!(($parent != null ? $parent.length : void 0) > 0 && !$parent.is($(document)))) {
	      return;
	    }
	    options.cushion = _.defaults(options.cushion, {
	      left: 10,
	      right: 10,
	      top: 10,
	      bottom: 15
	    });
	    $tileTop = options.top || $tile.position().top;
	    $tileLeft = options.left || $tile.position().left;
	    $tileHeight = options.height || $tile.outerHeight();
	    $tileWidth = options.width || $tile.outerWidth();
	    parentScrollTop = $parent.scrollTop();
	    parentTop = options.parentTop || parentScrollTop;
	    parentLeft = $parent.scrollLeft();
	    parentHeight = $parent.outerHeight();
	    parentWidth = $parent.outerWidth();
	    isAbove = $tileTop - options.cushion.top < 0;
	    isBelow = $tileTop + $tileHeight + options.cushion.bottom > parentHeight;
	    isLeft = $tileLeft - options.cushion.left < 0;
	    isRight = $tileLeft + $tileWidth + options.cushion.right > parentWidth;
	    attrs = {};
	    if (isAbove || options.alwaysAtTop) {
	      attrs.scrollTop = Math.max(parentTop + $tileTop - options.cushion.top, 0);
	    } else if (isBelow) {
	      attrs.scrollTop = parentScrollTop + $tileTop + $tileHeight + options.cushion.bottom - parentHeight;
	    }
	    if (isLeft) {
	      attrs.scrollLeft = parentLeft + $tileLeft - options.cushion.left;
	    } else if (isRight) {
	      attrs.scrollLeft = $tileLeft + $tileWidth + options.cushion.right - parentWidth;
	    }
	    if (_.keys(attrs).length <= 0) {
	      return;
	    }
	    if (options.duration > 0) {
	      $parent.animate(attrs, options.duration, "linear");
	    } else {
	      if (attrs.scrollTop != null) {
	        $parent.scrollTop(attrs.scrollTop);
	      }
	      if (attrs.scrollLeft != null) {
	        $parent.scrollLeft(attrs.scrollLeft);
	      }
	    }
	    return $tile;
	  };

	  return SingleSelect;

	})();


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var $, MultiSelect, SingleSelect, _, jQuery,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	$ = jQuery = __webpack_require__(17);

	_ = __webpack_require__(8);

	SingleSelect = __webpack_require__(19);


	/*
	  This class implements the methods necessary to connect a Tilegrid widget to a Collection with the
	  SelectableCollection mixin and provides a multi select strategy for Tilegrid.

	  Clicking a tile selects the corresponding model in the collection throuh selectableCollection#selectModel...
	  interfaces.  Clicking and draging selects all models between the drag start and drag end tile.

	  - Holding down the command toggles rows to the selected.
	  - Holding down the shift key extends the selection from the active cell to the clicked cell
	  - Dragging always extends away and back to the first row selected in the drag operation

	  Usage:  simply construct an instance of this class any time after constructing a Tilegrid and pass the tilegrid
	  instance to MultiSelect constructor:

	    new MultiSelect(@tilegrid)
	 */

	module.exports = MultiSelect = (function(superClass) {
	  extend(MultiSelect, superClass);

	  function MultiSelect() {
	    this._whichMethod = bind(this._whichMethod, this);
	    this._onRightArrow = bind(this._onRightArrow, this);
	    this._onLeftArrow = bind(this._onLeftArrow, this);
	    this._onPageUp = bind(this._onPageUp, this);
	    this._onPageDown = bind(this._onPageDown, this);
	    this._onUpArrow = bind(this._onUpArrow, this);
	    this._onDownArrow = bind(this._onDownArrow, this);
	    this._onTileMouseMove = bind(this._onTileMouseMove, this);
	    this._onTileMouseDown = bind(this._onTileMouseDown, this);
	    this.selectExtend = bind(this.selectExtend, this);
	    this._initializeDragSelect = bind(this._initializeDragSelect, this);
	    this.initialize = bind(this.initialize, this);
	    MultiSelect.__super__.constructor.apply(this, arguments);
	  }

	  MultiSelect.prototype.initialize = function() {
	    MultiSelect.__super__.initialize.apply(this, arguments);
	    return this._initializeDragSelect();
	  };

	  MultiSelect.prototype._initializeDragSelect = function() {
	    this.mouseDown = false;
	    $(document).on('mousedown', (function(_this) {
	      return function() {
	        return _this.mouseDown = true;
	      };
	    })(this));
	    $(document).on('mouseup', (function(_this) {
	      return function() {
	        return _this.mouseDown = false;
	      };
	    })(this));
	    return this.tilegrid.$element.on("mousemove.multiSelect", ".tile", this._onTileMouseMove);
	  };

	  MultiSelect.prototype.selectExtend = function(index) {
	    var $activeTile, $tile, activeIndex, firstTileIndex, lastTileIndex, onEnsureComplete;
	    $activeTile = this.getActiveTile();
	    activeIndex = $activeTile.data('index');
	    $tile = $activeTile;
	    onEnsureComplete = (function(_this) {
	      return function() {
	        var lastIndex, nextIndex;
	        while (true) {
	          lastIndex = null;
	          $tile = index < activeIndex ? $tile = $tile.prev() : $tile = $tile.next();
	          nextIndex = $tile.data('index');
	          if (nextIndex == null) {
	            break;
	          }
	          lastIndex = nextIndex;
	          _this.selectOne(nextIndex, true, {
	            silent: true,
	            active: false
	          });
	          if (nextIndex === index) {
	            break;
	          }
	        }
	        _this.collection.trigger('selectionsChanged');
	        return _this.setActiveTile(lastIndex);
	      };
	    })(this);
	    firstTileIndex = activeIndex > index ? this.tilegrid._findTopIndex() : activeIndex;
	    lastTileIndex = activeIndex < index ? this.tilegrid._findBottomIndex() : index;
	    if (_.isFunction(this.collection.ensureRows)) {
	      this.collection.ensureRows(firstTileIndex, lastTileIndex, {
	        complete: onEnsureComplete
	      });
	    } else {
	      onEnsureComplete();
	    }
	    return this.collection.trigger('selectionsChanged');
	  };

	  MultiSelect.prototype._onTileMouseDown = function(evt) {
	    var $tile, index, method;
	    evt.preventDefault();
	    if ($(evt.target).hasClass('no-select')) {
	      return;
	    }
	    method = this._whichMethod(evt);
	    $tile = $(evt.target).closest('.tile');
	    index = this._getIndexFromEvent(evt);
	    this.lastMouseDownIndex = index;
	    this.lastToggleIndex = null;
	    if (!(($tile != null ? $tile.length : void 0) > 0)) {
	      return;
	    }
	    if (method === this.selectOnlyOne && !this.options.selectOneOnSelected && $tile.hasClass('selected')) {
	      return MultiSelect.__super__._onTileMouseDown.apply(this, arguments);
	    } else if (method === this.selectOne && $tile.hasClass('selected')) {
	      this.selectOne(index, false, {
	        active: false
	      });
	      if ($tile.hasClass('active')) {
	        return this.setActiveTile(null);
	      }
	    } else {
	      return method(index);
	    }
	  };

	  MultiSelect.prototype._onTileMouseMove = function(evt) {
	    var $target, index;
	    evt.preventDefault();
	    $target = $(evt.target);
	    if (this.mouseDown && !($target.hasClass('active') || $target.parents('.tile.active').length > 0)) {
	      index = this._getIndexFromEvent(evt);
	      if (evt.metaKey || evt.ctrlKey) {
	        if (!(index === this.lastToggleIndex || index === this.lastMouseDownIndex)) {
	          this.lastToggleIndex = index;
	          return this.selectToggle(index);
	        }
	      } else {
	        if (!(index < 0)) {
	          return this.selectExtend(index);
	        }
	      }
	    }
	  };

	  MultiSelect.prototype._onDownArrow = function(evt) {
	    return this._whichMethod(evt)(this._getSameIndexOnRelativeRow(1));
	  };

	  MultiSelect.prototype._onUpArrow = function(evt) {
	    return this._whichMethod(evt)(this._getSameIndexOnRelativeRow(-1));
	  };

	  MultiSelect.prototype._onPageDown = function(evt) {
	    return this._whichMethod(evt)(this._getSameIndexOnRelativeRow(5));
	  };

	  MultiSelect.prototype._onPageUp = function(evt) {
	    return this._whichMethod(evt)(this._getSameIndexOnRelativeRow(-5));
	  };

	  MultiSelect.prototype._onLeftArrow = function(evt) {
	    return this._whichMethod(evt)(this.getPreviousTile().data('index'));
	  };

	  MultiSelect.prototype._onRightArrow = function(evt) {
	    return this._whichMethod(evt)(this.getNextTile().data('index'));
	  };

	  MultiSelect.prototype._whichMethod = function(evt) {
	    if (evt.shiftKey) {
	      return this.selectExtend;
	    } else if (evt.ctrlKey || evt.metaKey) {
	      return this.selectOne;
	    } else {
	      return this.selectOnlyOne;
	    }
	  };

	  return MultiSelect;

	})(SingleSelect);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, Email, React, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	_ = __webpack_require__(8);

	Datum = __webpack_require__(6);


	/*
	  For rendering and input of email addresses mailto: links like <a href="mailto:">.

	  *Props*

	  attr  - attribute on model should return an email address from the model
	  displayLink - if true a mailto:// link is rendered for display
	 */

	module.exports = Email = (function(superClass) {
	  extend(Email, superClass);

	  Email.displayName = "react-datum.Email";

	  Email.propTypes = _.extend({}, Datum.propTypes, {
	    displayLink: React.PropTypes.bool
	  });

	  function Email(props) {
	    this.validateEmail = bind(this.validateEmail, this);
	    Email.__super__.constructor.apply(this, arguments);
	    this.addValidations(this.validateEmail);
	  }

	  Email.prototype.renderValue = function() {
	    var value;
	    value = Email.__super__.renderValue.apply(this, arguments);
	    if (this.props.displayLink) {
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
/* 22 */
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

	  On error a notFoundUrl is set as the image src to prevent broken image display

	  TODO : figure out how to make this detect when it's in view within the scroll parent
	  before setting src to real url when in view and back to blank when going out of view
	  for for realz lazy loading

	  The model attribute should specified in @props.attr should return a fully qualified
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

	  LazyPhoto.prototype.notFoundUrl = __webpack_require__(23);

	  LazyPhoto.prototype.loadingUrl = __webpack_require__(24);

	  LazyPhoto.prototype.subClassName = 'fast-fade lazy-image';

	  LazyPhoto.prototype.notFound = false;

	  LazyPhoto.prototype.initialLoadComplete = false;

	  LazyPhoto.prototype.isEditable = function() {
	    return false;
	  };

	  LazyPhoto.prototype.renderForDisplay = function() {
	    var modelValue, source;
	    modelValue = this.getModelValue();
	    if (modelValue !== this.lastModelValue) {
	      this.notFound = this.initialLoadComplete = false;
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
/* 23 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABoCAYAAAAHIFUvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEZCNjk5NUI5RjE2MTFFMkE2MjE4QzNGRDJGMzREOEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEZCNjk5NUM5RjE2MTFFMkE2MjE4QzNGRDJGMzREOEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RkI2OTk1OTlGMTYxMUUyQTYyMThDM0ZEMkYzNEQ4RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RkI2OTk1QTlGMTYxMUUyQTYyMThDM0ZEMkYzNEQ4RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmtML+gAAA1VSURBVHja7F09cttKEm6rlJs+gaFoQ0EnEHwCUfEGgk5AKtxIZPJeKPIEhKr2xaZOIPgEhrN9keATCD6BF3B1P7ZHPb8cSICtrpoyzRIHM/1N/07P4M0f//0f/CKUtm2Gn5dtq8cw6P/8+18//f/wFwFj2rabtp20LWnb57Z9aFs1tokc/AJg5G372LartjUIwrpt9yg1r4A8MxibtpVt27LvFwjO6EAZMyBTBANQOlTqvpuMDZSxApIyMAqNrdji9wTK5BWQfmiCYBCDbw1/u2a/+fgKSD90zVRQhfZDRwXako6yts1/R0AmOHneYqoqztRbh98UCpiT3w2QKa7KBBnQ6e/vbXvEz4s9jOyNYCdsdKcslpvfDZBTBKTA4OwIP5PkXGPg9ojMSRz7TRRpqxyj8VJwlSe/EyCZwuSOaZcMGL5aO/XzgEbaBszMwmhfUELV5QYl/REl/yP2lw8RkImBsQTMB2Fl5wjMwqIKOX31GNcnQYpdF9cGmf8ZJTrHOXYe3Lu2neNCOxsiICkDxrRaTxRp4UZXihkkoH3yVI0FXNAskHtFxTUYcB6xbAAHb7CApA4MutRE2JkAyr6RdqWxSdL47zUqdIVArDSaYRIjI9CHyuro2PHvVwiMxBibN1TuOdZEkIp7YaU3qGavBElTF0wyNEBCVnShASV3UC2xKFeify5ZRw7gTyJJcm+AJAGgLB3ijlDQTXaFwJDG9MEgFdJY3g85deJr5BbCSkyQYbVhVYaoJ1r9iQb0LUpt49j/6dBVVkcXAb+RmDBDQBoHJrsCUhlSKZVGhUKP0vosgKQBA60F1ZUi07Z7AHIsOASJEMw1GFc0nppgMlRAakt07ep51cKk7wKDO2kFrzVjuwT/4oizmAyMDUgleC8helWSkq3CLFcblShjKLGfqSA124Cx5oYAdBCANB6eko62Sj9vNUC5uMVTAexEWCiXgWBwdfVliDZkKzDEN55olH5S5oqWno7DhTK2UlBhBYTVcV1bVPYgAFkL37lkc1W603zPI+appV/uWDRMClRAbgOlI4mcPegFEGlblfa0J3tIGu//SqPDweBU6LynOoCR0kZXNVQJ0cUTqSYiNlGpMZYF7LLFMw3Q3K29NDB9HTA/Kc1yG4NxIYCksCsYWOC/GTzdlLrSGNiNh6R8MhjLS9jtRF5rmKaCZwLdJ6MwFWxeEQMQl9reBAdw5uBq1rhSOBM2gu5NHfNEtYMkAi6KW+Z2T3GshcV7asBvXyXXgH8Vw+W1SUiGev8B9WXmCN417Hb/tgb19eAIsG0Vk6RsmH7f4Pc2V9YXjI3G1kWRDh0gHZPuse2T/qZihgqlQTL09wj2xLCCXRh3ibZggf1dWphUKSrRRnMNGCF5L2eVleBDM2REiQ/8pog2BVVvmVs5MUjMPez20knkE2WyOTJ0pUgTeS4u6qDAfhuHv28cI2vypnKN7SHPLUG+HSsudYP2r2YZAiO9wQM7c+zsi5CicDX0F5a44Jy5shn+veoMNAgMD9Q2sVch0neN5HJNoYuflsy4zzzSONzG/pifemCHVNZ7nPQq0Jem2OAIGV9qvJ6UrS4qDTphz+76OUX78hknfdeTa14ZpJpKfRJBCqmc6R5tbObxTG5jxd9yCQGQN/BDiU41JQoTXHfh+qYbBLtkUj4T1FONkr3Gz7nF7vlS9/yrVlIqDkjX+aNFhEOIYgRej7vSxCjPTdz+XTDprXHhfGJ21OZpcZVbouovNW51wtoxi+s6vizfsEOfG1zVfZzNUwPC2MCHUqZIQh3g9pIqu4OA9H1nQ/78628qsz3lgCSo25qeQKGapwmC8QHGQynaNMm4r/ZRwdyot8BsDpQVUrD4IIs8KSqpqSD+MYU+STrsswW5ejGYWjB+9HUgIN4wUGIfcGmYUb8eCSA8bqIU/jlEPAffgkHx2fpA8CiWiifimzZ3BSWkCOIlbMxc8RCLmA9AMDrbVLTqq5ZSJyvF4E7RtuSR1dcVhJUKPbd0cDBi21XuKCx1uSwQRJISdjGBKUYgHVmPsRMH44d0mADR1SdRFEunn0IMcwK72xe+DRiQWU9g0OLeMF4v1UjdxVW1RZuUiOT+PC/RP2UBUYkqa6h3kSTo5p5A3EtsMlzI3HZ2Ufo/GRLbBlWFg/poMcCubmwN9tT4EGgKYUVzthyWqu63HAyTylKZeMJc4lAjLp0zHCq9jyS9qcH2inspPtczLdADy5XcjwmETjXdwviuSVrCLvV+x1Syy/5Jxxfa7k4NvBFtk+99WQ2CsmIPT1jgRIMuYdxETg1lrK/Z95VBGiaO2kLrKBzuKY6gGHGXVTQmokrHOezKjfZJ+axsqt8HkImjuiIJoexn8wtIC6lr2iH0zTCUCIRVc7jWZS1gV32SOgA3ZfHKBkZ4s5sGmAIdnCN0203b3SWCeAIe2w2HDmppX4bm2MrIruRLUs1saVQ6jBAUUmWIrhT/GHZVGQ8uenQERA5NxoJeAuor8zCbWICYwKCjAiE7ZBm6hB9dderAQMjBrYKTOwVrn3keeoBRIxP3CexKNrjFSADRRdmuEf/UR10fCKtALYZueoiyFyOwJTEz3J1EfXaRLFVCrhUDXkDEQmI2uBkCPFSaIy/Is/rKpJnHXRQMkk05NTCddmGNubxDRVXNmVRc9ZB3StF+DDk+uUEAXDK9lWIvgAWPVMmpEj8mYVRZNwyMDz2BQbZpOXBVFVrByZ2ec4Oa18ZzB0yNZPA8JUDFwO3HFzBfpOYbr5D9LRXQxVqFA2Y7+gIjZ2A0A5cOUj2hXpUJGLriSfXengCSwe5EUxVZ9DeK1zaG10jUsDsAFDvlQ6kUsp/zP//6O1UBuUCxignGFN28XMjtjIFIivu4N54XDHLb/Q8gXyHsSgkdEFSmnyiG7nxEUTlJyURYWDGIm4eslZKMu71v4Wlpvq/BNh3W4dWKupwQL4ZoBiJJS5wTqd5jiFu1T3y5R1vyg/dUdcLPcpTwc5JMKgVKcIAZmJOPqqOQ4LNOld9SAHbLAq3tAECZKyql6kG9kwd60tVm8TIguth4BnFKR/ngc5A3dmp4mh/LmF3rI8ZIFbtmI6nwfO+qdyI8jtD1f9Z+vjpQVvMCDc6+3tASvQk6/qx6LPz+20KTXumDKHI+wzF9x0ZXw84FtXsuSAQdS/O5Kt0ESklCYCuU4xcG2B5cw+5AYwP683e2+wwzZNC7HtIr6gHSDJmbCXNZs7nY9oYqnHvpoc5Slv/qePvjWNsbj9fmke3IhMHUbCCp4GURuRTJLZBJLtuemae9eUSgpX6uNQuogN3rk2wFg6oqpGrOjt4jT1QHZt0CseBelo8rWFuYpFtJPlmAt2wB2ICjcbkcnSZmZMIcSmw5PD3QmaOmuMI5bMB+oULmoHoLlIpGSp3EjMz3AQPAfks0PecMQeHxwsShX7AwSbo4mZ55gzYl9MAOOTHvdGo75osl58KkQ/JjmQV0ip5PFFVIl+frYh5+L33p4KpvhIAwZ8/bOthYKqz7BLuXlBkpFiBioizAZ7d5VwTGSumXkpY3FlBIl7tQN/Yv8PSispx5iVt4ehXhxMOlfkKxVNZM4/r6BndnFg8pBX3GmPYwyI6pdBrgUq80z5pr+qng57qBFwNkKujKRYR+OANypucbS1LQ9HYF1xpc7jxInmEv77KKAUgK8a5cTTT988mbruTjW8NzA8C+105Jh4tS6OHtDTEAyTQupC9daHz5jcLw2mKQt8oqnniqRl2/lw5jHgQgE43a8AVVCjhzxXNzuRnoVnE2+LFmLiG+KY8KnmahBykhp4rtCJGOjTB56XIBFyehVGwMJUu/aVxY3xxd02feLfY1sSFXpS6E1Xor+PY+Z09KRYKnwkIJyWo3gg1LhwxISK3vtTDpQtDPPvHMF8FmSNF3yPUehUVlDwaQ2pNplIRUaY2gqKrA572FlUbXbx2yCy7z7G3zLCYgPmDo8l41M5yJQQ25qBZpAUgqNeQul7shA1Jp1IRJMqRqDn57RBZBWqVFsAX5PVehV6APEpBvHoPMDGDErAurLZ6SFChuPPuvhwqI62pZgLxX0sdNO7ZXvy41mYLNS0vJQcTVWBqk4rPGo1lqwNgXnNRhcRQGUFxsylcHaXwxQKRBJWgwVRVFbq3pirymhwBMXTCXBklxqVgshwqIOlmqXnxg7iblmKgS3OV4l8rAt57xjYvELUB+nThderl4btUVC5A72N2BNYPdnkXH+G5nj793vPHoMzQifu+RQShBX/pE5T55BFffiXyqTl6CHhV97loa9KDEMT4lRVOQTz/VsNt0a1ikv1d5qe7u96HSOsCOqPszPlJJ0XwnzW9QnREINewOgdJ++6fYEz4cOCArXK3E4DOHtMWF4hzss4JLeOaj20OXEHVjKHdwSaeKWz2qGyMORjDGEn7eGDJd7pwzaVJ/9wpIROJ72hcO6qqGcR0QGh0gwCL6RCMl9Ga2kFdwvwISaE+I0dKL6W+gv5PEr4AY0jRHzAXlEfdk7GCMERBgUpCgmqJbQEcPxlgBIVDohNbFrwJGR/8XYAA/IBnrVTxJagAAAABJRU5ErkJggg=="

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAaCAYAAABctMd+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAtSURBVHja7MxBDQAACAQgtX/nM4UPNwhAJ6krU4fkcrlcLpfLv+QLAAD//wMANGkDMYhC/1cAAAAASUVORK5CYII="

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, Link, React, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	_ = __webpack_require__(8);

	Datum = __webpack_require__(6);


	/*
	  For rendering links like <a href="...">.

	  The 'attr' prop should return a url from the model and is the href of the link.

	  Optionally, a 'nameAttr' prop can also be specified to display between the <a></a>
	  tags.  If 'nameAttr' prop is not specified, the children of the link are rendered
	 */

	module.exports = Link = (function(superClass) {
	  extend(Link, superClass);

	  function Link() {
	    return Link.__super__.constructor.apply(this, arguments);
	  }

	  Link.displayName = "react-datum.Link";

	  Link.propTypes = _.extend({}, Datum.propTypes, {
	    nameAttr: React.PropTypes.string
	  });

	  Link.prototype.subClassName = 'link';

	  Link.prototype.target = '_blank';

	  Link.prototype.render = function() {
	    return Link.__super__.render.apply(this, arguments);
	  };

	  Link.prototype.renderValue = function() {
	    return React.createElement("a", {
	      "href": this._getHref(),
	      "target": this.target
	    }, this._getTagContent());
	  };

	  Link.prototype._getHref = function() {
	    return this.getModelValue();
	  };

	  Link.prototype._getTagContent = function() {
	    if (this.props.nameAttr != null) {
	      return this.getModel().get(this.props.nameAttr);
	    } else if (this.props.children && this.props.children.length > 0) {
	      return this.props.children;
	    } else {
	      return this.getModelValue();
	    }
	  };

	  return Link;

	})(Datum);


/***/ },
/* 26 */
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

	  *props
	  format - one of
	    'abbreviate' - Add M and K to numbers greater than 1 million and
	      1 thousand respectively
	    'money' - display dollar sign and two decimal places zero filled
	    'comma' - add comma separators at thousands

	  minValue - validate value must be at least this value on change
	  maxValue - validate value must be at most this value on change


	  Only allows /[0-9\-\.]/ on input
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

	  Number.prototype.renderValue = function() {
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
	    return this.wrapDisplayValue(dataValue);
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Datum, React, Text, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	_ = __webpack_require__(8);

	Datum = __webpack_require__(6);


	/*
	  For like text!  See also Datum

	  the Datum base class does most of the work by default of handling text, but for JSX
	  beauty, let's create an extension specifically for text data
	 */

	module.exports = Text = (function(superClass) {
	  extend(Text, superClass);

	  function Text() {
	    return Text.__super__.constructor.apply(this, arguments);
	  }

	  Text.displayName = "react-datum.Text";

	  Text.prototype.render = function() {
	    return Text.__super__.render.apply(this, arguments);
	  };

	  return Text;

	})(Datum);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Number, React, WholeNumber,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(3);

	Number = __webpack_require__(26);


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


/***/ }
/******/ ]);