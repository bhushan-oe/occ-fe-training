define(["knockout","promise","ccRestClient","jquery","pageLayout/cart","pubsub","ccConstants","ccLogger","viewportHelper","moment"], function(__WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_22__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _widgetCore = __webpack_require__(1);
	
	var _viewModels = __webpack_require__(20);
	
	var allViewModels = _interopRequireWildcard(_viewModels);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * We're using commonjs here because we don't have control
	 * of the widget importation.
	 */
	module.exports = (0, _widgetCore.widgetLoader)(allViewModels);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.widgetLoader = exports.BaseWidget = exports.helpers = exports.decorators = exports.loaders = undefined;
	
	var _widgetContext = __webpack_require__(2);
	
	Object.defineProperty(exports, 'widgetLoader', {
	  enumerable: true,
	  get: function get() {
	    return _widgetContext.init;
	  }
	});
	
	var _loaders = __webpack_require__(3);
	
	var loaders = _interopRequireWildcard(_loaders);
	
	var _decorators = __webpack_require__(5);
	
	var decorators = _interopRequireWildcard(_decorators);
	
	var _helpers = __webpack_require__(7);
	
	var helpers = _interopRequireWildcard(_helpers);
	
	var _BaseWidget = __webpack_require__(17);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.loaders = loaders;
	exports.decorators = decorators;
	exports.helpers = helpers;
	exports.BaseWidget = _BaseWidget.BaseWidget;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.init = init;
	
	var _loaders = __webpack_require__(3);
	
	function init(allViewModels) {
	  var widgetLoader = new _loaders.Widget();
	
	  return {
	    onLoad: function onLoad($data) {
	      widgetLoader.load($data, this, allViewModels);
	    },
	    beforeAppear: function beforeAppear(pageContext) {
	      widgetLoader.beforeAppear(pageContext, this);
	    },
	    resourcesLoaded: function resourcesLoaded($data) {
	      widgetLoader.resourcesLoaded($data);
	    }
	  };
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _widget = __webpack_require__(4);
	
	Object.defineProperty(exports, 'Widget', {
	  enumerable: true,
	  get: function get() {
	    return _widget.Widget;
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Widget = exports.Widget = function () {
	  function Widget() {
	    _classCallCheck(this, Widget);
	  }
	
	  _createClass(Widget, [{
	    key: 'resourcesLoaded',
	    value: function resourcesLoaded($data) {
	      $.Topic('widget.' + $data.id() + '.resourcesLoaded').publish();
	    }
	  }, {
	    key: 'beforeAppear',
	    value: function beforeAppear(pageContext, $data) {
	      $.Topic('widget.' + $data.id() + '.beforeAppear').publish(pageContext);
	    }
	  }, {
	    key: 'load',
	    value: function load($currentWidgetData, widgetContext, viewModels) {
	      var instance = this;
	
	      /**
	       * This will fix the $data context, keeping synced the 
	       * properties from the viewModel and the $data from
	       * the widget
	       */
	      var applyDataProperties = function applyDataProperties(dataProperties, viewModel, context) {
	        if (dataProperties) {
	          Object.keys(dataProperties).forEach(function (propertyKey) {
	            if (propertyKey !== '__dataApplied') {
	              context.$data[propertyKey] = context[propertyKey];
	            }
	          });
	          viewModel.prototype.$dataProperties.__widgetInstanceId = context.$data.id();
	        }
	      };
	
	      /**
	       * This will fix the context of the each method of
	       * each view model
	       */
	      var applyDataMethods = function applyDataMethods(dataMethods, context) {
	        if (dataMethods) {
	          Object.keys(dataMethods).forEach(function (methodKey) {
	            context.$data[methodKey] = function () {
	              var args = Array.prototype.slice.call(arguments);
	
	              //Original this
	              args.push(this);
	              return dataMethods[methodKey].apply(context, args);
	            };
	          });
	        }
	      };
	
	      var viewModelsInstances = {};
	
	      Object.keys(viewModels).forEach(function (viewModelName) {
	        var viewModel = viewModels[viewModelName];
	        var dataMethods = viewModel.prototype.$dataMethods;
	        var dataProperties = viewModel.prototype.$dataProperties;
	
	        /**
	         * Ensure the correct context of the view model
	         */
	        viewModel.prototype.applyContexts = function (context) {
	          context.$data = $currentWidgetData;
	          context.viewModels = viewModelsInstances;
	
	          applyDataProperties(dataProperties, viewModel, context);
	
	          /**
	           * Apply the method of the current view model
	           */
	          applyDataMethods(dataMethods, context);
	
	          /**
	           * Set the listener to the beforeAppear
	           */
	          $.Topic('widget.' + $currentWidgetData.id() + '.beforeAppear').subscribe(function (pageContext) {
	            if (typeof context.beforeAppear === 'function') {
	              context.beforeAppear(pageContext);
	            }
	          });
	
	          /**
	          * Set the listener to the resourcesLoaded
	          */
	          $.Topic('widget.' + $currentWidgetData.id() + '.resourcesLoaded').subscribe(function () {
	            if (typeof context.resourcesLoaded === 'function') {
	              context.resourcesLoaded();
	            }
	          });
	        };
	
	        /**
	         * Instantiate the current view model
	         * @type {viewModel}
	         */
	        var viewModelInstance = new viewModel();
	        viewModelsInstances[viewModelName] = viewModelInstance;
	      });
	    }
	  }]);
	
	  return Widget;
	}();
	
	;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _widgetViewModel = __webpack_require__(6);
	
	Object.defineProperty(exports, 'exportToViewModel', {
	  enumerable: true,
	  get: function get() {
	    return _widgetViewModel.exportToViewModel;
	  }
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.exportToViewModel = exportToViewModel;
	function exportToViewModel(target, key, descriptor) {
	  if (typeof target.$data === 'undefined') {
	    target.$data = {};
	  }
	
	  if (typeof target.$dataMethods === 'undefined') {
	    target.$dataMethods = {};
	  }
	
	  if (typeof target.$dataProperties === 'undefined') {
	    target.$dataProperties = {};
	  }
	
	  /**
	   * Set method context and call it
	   */
	  if (typeof target[key] === 'function') {
	    target.$dataMethods[key] = target[key];
	    return descriptor;
	  }
	
	  /**
	   * It's a property, then set its getter and setter
	   */
	  var initializer = descriptor.initializer;
	
	  delete descriptor.initializer;
	  delete descriptor.writable;
	
	  /**
	   * Object where all values of the same view model will be placed.
	   *
	   * It's an object, because if there is more than one instance of the same widget, it has
	   * to delivery the right value for the right instance
	   * 
	   * @type {Object}
	   */
	  var propertyValue = {};
	
	  /**
	   * Gets the current instance id of the widget. If there is no $data yet, then, it's the first
	   * "value" in this view model, then, it's id will be called 'root'
	   * 
	   * @return {String} widget instance id
	   */
	  var getCurrentInstanceId = function getCurrentInstanceId() {
	    var currentInstanceID = target.$data.id ? target.$data.id() : 'root';
	
	    if (currentInstanceID !== 'root' && !propertyValue[currentInstanceID]) {
	      return 'root';
	    }
	
	    return currentInstanceID;
	  };
	
	  /**
	   * Updates the propertyValue object using the current widget widget
	   * @param  {Any} value any value
	   * @return {Any} returns the current value
	   */
	  var setCurrentPropertyValue = function setCurrentPropertyValue(value) {
	    var currentInstanceID = getCurrentInstanceId();
	    propertyValue[currentInstanceID] = value;
	    return propertyValue[currentInstanceID];
	  };
	
	  /**
	   * Initializes the current property value
	   */
	  setCurrentPropertyValue(initializer.call(descriptor));
	
	  /**
	   * Setter of the property
	   * @param {Any} value any value
	   */
	  descriptor.set = function (value) {
	    setCurrentPropertyValue(value);
	  };
	
	  /**
	   * Getter of the property
	   * @return {Any} returns the current value
	   */
	  descriptor.get = function () {
	    var val = propertyValue[getCurrentInstanceId()];
	
	    //If there are more than one instance of the same widget, reset the property
	    if (this.$dataProperties.__widgetInstanceId && this.$data.id() !== this.$dataProperties.__widgetInstanceId) {
	      val = setCurrentPropertyValue(initializer.call(descriptor));
	    }
	
	    target.$data[key] = val;
	    return val;
	  };
	
	  /**
	   * Attaches the new property to the widget $data.
	   */
	  target.$dataProperties[key] = target[key];
	
	  return descriptor;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _OERestClient = __webpack_require__(8);
	
	Object.defineProperty(exports, 'OERestClient', {
	  enumerable: true,
	  get: function get() {
	    return _OERestClient.OERestClient;
	  }
	});
	
	var _CartHelper = __webpack_require__(12);
	
	Object.defineProperty(exports, 'CartHelper', {
	  enumerable: true,
	  get: function get() {
	    return _CartHelper.CartHelper;
	  }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.OERestClient = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _knockout = __webpack_require__(9);
	
	var _knockout2 = _interopRequireDefault(_knockout);
	
	var _promise = __webpack_require__(10);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _ccRestClient = __webpack_require__(11);
	
	var _ccRestClient2 = _interopRequireDefault(_ccRestClient);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var OERestClient = exports.OERestClient = function () {
	  function OERestClient() {
	    var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	    _classCallCheck(this, OERestClient);
	
	    this.endpoint = null;
	    this.path = null;
	    this.query = null;
	
	    this.endpoint = endpoint;
	    this.path = path;
	    this.query = query;
	  }
	
	  /**
	   * Set the request endpoint
	   *
	   * @param  {String} endpoint The endpoint
	   * @return {Void}
	   */
	
	
	  _createClass(OERestClient, [{
	    key: 'setEndpoint',
	    value: function setEndpoint(endpoint) {
	      this.endpoint = endpoint;
	    }
	
	    /**
	     * Set the path parameters
	     *
	     * @param  {String} path The path parameters
	     * @return {Void}
	     */
	
	  }, {
	    key: 'setPath',
	    value: function setPath(path) {
	      this.path = path;
	    }
	
	    /**
	     * Set the request query parameters
	     *
	     * @param  {Object} query The query parameters
	     * @return {Void}
	     */
	
	  }, {
	    key: 'setQuery',
	    value: function setQuery(query) {
	      this.query = query;
	    }
	
	    /**
	     * Send the request to OCC
	     *
	     * @return {promise}
	     */
	
	  }, {
	    key: 'send',
	    value: function send() {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        // Check required properties validity
	        if (!_this.validate()) {
	          reject({ error: 'Required fields not provided' });
	        }
	        // Request using OCC Rest Client
	        _ccRestClient2.default.request(_this.endpoint, _this.query, function (response) {
	          resolve(response);
	        }, function (error) {
	          reject(error);
	        }, _this.path);
	      });
	    }
	
	    /**
	     * Validate the provided parameters
	     *
	     * @return {Boolean} Whether the provided parameters are valid or not
	     */
	
	  }, {
	    key: 'validate',
	    value: function validate() {
	      return this.endpoint ? true : false;
	    }
	  }]);
	
	  return OERestClient;
	}();
	
	;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CartHelper = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Dependencies
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _jquery = __webpack_require__(13);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _knockout = __webpack_require__(9);
	
	var _knockout2 = _interopRequireDefault(_knockout);
	
	var _cart = __webpack_require__(14);
	
	var _cart2 = _interopRequireDefault(_cart);
	
	var _pubsub = __webpack_require__(15);
	
	var _pubsub2 = _interopRequireDefault(_pubsub);
	
	var _ccConstants = __webpack_require__(16);
	
	var _ccConstants2 = _interopRequireDefault(_ccConstants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Constants
	 */
	var TOPIC_ON_ALL_ITEMS_ADDED = 'oe.on.all.items.added';
	
	/**
	 * Helper for cart common actions
	 *
	 * @class
	 *
	 * @property {Object} widget The widget context
	 * @property {Object} cart   OCC Cart instance
	 */
	
	var CartHelper = exports.CartHelper = function () {
	  function CartHelper(widget) {
	    _classCallCheck(this, CartHelper);
	
	    this.widget = widget;
	    this.cart = _cart2.default.getInstance();
	  }
	
	  /**
	   * Adds an item to cart
	   *
	   * @param {Object} item The item to add to cart
	   */
	
	
	  _createClass(CartHelper, [{
	    key: 'addItemToCart',
	    value: function addItemToCart(item) {
	      _jquery2.default.Topic(_pubsub2.default.topicNames.CART_ADD).publishWith(item);
	    }
	
	    /**
	     * Add multiple items to cart
	     *
	     * @param {Array} items A list of items
	     *
	     * @return {Promise} A promise to wait for adding
	     */
	
	  }, {
	    key: 'addMultipleItemsToCart',
	    value: function addMultipleItemsToCart(items) {
	      var _this = this;
	
	      // If items is not an array, reject the promise
	      if (!_jquery2.default.isArray(items)) {
	        return Promise.reject({ error: 'An array of items must be provided!' });
	      } else {
	        // Create a temporary items array in the helper
	        this.addingQueue = items;
	
	        // Store the current pricing success callback
	        var currentSuccessCb = this.getCartCallbackByAction(_ccConstants2.default.PRICING_SUCCESS_CB);
	
	        // Replace the pricing success callback to handle the multiple add to cart
	        this.setPricingSuccessCallback(this.onPricingSuccess.bind(this));
	
	        return new Promise(function (resolve) {
	          // Handle action end
	          var onItemsAdded = function onItemsAdded() {
	            // In case of empty list:
	            // - remove the topic subscribe
	            _jquery2.default.Topic(TOPIC_ON_ALL_ITEMS_ADDED).unsubscribe(onItemsAdded);
	            // - return the previous pricing success callback
	            _this.setPricingSuccessCallback(currentSuccessCb);
	            // - resolve the promise
	            resolve({ success: true });
	          };
	
	          // Unsubscribe and subscribe again to avoid stacking
	          _jquery2.default.Topic(TOPIC_ON_ALL_ITEMS_ADDED).unsubscribe(onItemsAdded);
	          _jquery2.default.Topic(TOPIC_ON_ALL_ITEMS_ADDED).subscribe(onItemsAdded);
	
	          // If we have a list of items in queue,
	          // send the first to cart to start the loop
	          if (_this.addingQueue.length) {
	            _this.addItemToCart(_this.addingQueue[0]);
	          } else {
	            // Call the action end handler manually
	            onItemsAdded();
	          }
	        });
	      }
	    }
	
	    /**
	     * Empty the cart
	     */
	
	  }, {
	    key: 'clearCart',
	    value: function clearCart() {
	      this.cart.emptyCart();
	      this.cart.markDirty();
	    }
	
	    /**
	     * Get a cart callback given an action
	     *
	     * @param {String} action The action performed by the callback
	     *
	     * @return {Function|Undefined} The callback
	     */
	
	  }, {
	    key: 'getCartCallbackByAction',
	    value: function getCartCallbackByAction(action) {
	      var allCallbacks = this.cart.callbacks;
	      var callback = void 0;
	
	      if (allCallbacks.hasOwnProperty(action)) {
	        callback = allCallbacks[action];
	      }
	
	      return callback;
	    }
	
	    /**
	     * Get a dynamic property given an ID
	     *
	     * @param {String} id The dynamic property ID to look for
	     *
	     * @return {Object|Undefined} The dynamic property or nothing
	     */
	
	  }, {
	    key: 'getDynamicPropertyById',
	    value: function getDynamicPropertyById() {
	      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	      var property = void 0;
	
	      if (this.cart && _knockout2.default.isObservable(this.cart.dynamicProperties)) {
	        var properties = this.cart.dynamicProperties();
	
	        // Using 'some' due to IE11 compatibility issues
	        properties.some(function (prop) {
	          if (prop.id() === id) {
	            property = prop;
	            return true;
	          }
	        });
	      }
	
	      return property;
	    }
	
	    /**
	     * Handle pricing success for multiple add to cart
	     */
	
	  }, {
	    key: 'onPricingSuccess',
	    value: function onPricingSuccess() {
	      // Apply this defensive check to avoid page break
	      if (_jquery2.default.isArray(this.addingQueue)) {
	        // Remove the recently added product
	        this.addingQueue.shift();
	
	        // If there is remaining items in list, add the first to cart
	        if (this.addingQueue.length) {
	          this.addItemToCart(this.addingQueue[0]);
	        } else {
	          // Otherwise, notify the action end
	          _jquery2.default.Topic(TOPIC_ON_ALL_ITEMS_ADDED).publish();
	        }
	      }
	    }
	
	    /**
	     * Save current cart state to cookies
	     */
	
	  }, {
	    key: 'saveCart',
	    value: function saveCart() {
	      this.cart.saveCartCookie();
	    }
	
	    /**
	     * Save current cart state to cookies and price the cart
	     */
	
	  }, {
	    key: 'saveCartAndPersist',
	    value: function saveCartAndPersist() {
	      this.saveCart();
	      this.cart.priceCartIfNeccessary(true);
	    }
	
	    /**
	     * Set a callback to cart given the action
	     *
	     * @param {String}   action   The callback action
	     * @param {Function} callback The callback
	     */
	
	  }, {
	    key: 'setCartCallback',
	    value: function setCartCallback(action, callback) {
	      if (action && typeof callback === 'function') {
	        var allCallbacks = this.cart.callbacks;
	
	        allCallbacks[action] = callback;
	
	        this.cart.setCallbackFunctions(allCallbacks);
	      }
	    }
	
	    /**
	     * Set a dynamic property value
	     *
	     * @param {Object} property The dynamic property
	     * @param {Any}    value    The new value
	     */
	
	  }, {
	    key: 'setDynamicProperty',
	    value: function setDynamicProperty(property, value) {
	      if (property && _knockout2.default.isObservable(property.value)) {
	        property.value(value);
	      }
	    }
	
	    /**
	     * Set a dynamic property value given an id
	     *
	     * @param {String} id    The dynamic property id
	     * @param {Any}    value The new value
	     */
	
	  }, {
	    key: 'setDynamicPropertyById',
	    value: function setDynamicPropertyById(id, value) {
	      var property = this.getDynamicPropertyById(id);
	
	      if (property) {
	        this.setDynamicProperty(property, value);
	      }
	    }
	
	    /**
	     * Set prepricing callback to cart
	     *
	     * @param {Function} callback The callback to handle prepricing action
	     */
	
	  }, {
	    key: 'setPrepricingCallback',
	    value: function setPrepricingCallback(callback) {
	      this.setCartCallback(_ccConstants2.default.PREPRICING, callback);
	    }
	
	    /**
	     * Set failure pricing callback to cart
	     *
	     * @param {Function} callback The callback to handle failure pricing action
	     */
	
	  }, {
	    key: 'setPricingFailureCallback',
	    value: function setPricingFailureCallback(callback) {
	      this.setCartCallback(_ccConstants2.default.PRICING_FAILURE_CB, callback);
	    }
	
	    /**
	     * Set success pricing callback to cart
	     *
	     * @param {Function} callback The callback to handle success pricing action
	     */
	
	  }, {
	    key: 'setPricingSuccessCallback',
	    value: function setPricingSuccessCallback(callback) {
	      this.setCartCallback(_ccConstants2.default.PRICING_SUCCESS_CB, callback);
	    }
	  }]);

	  return CartHelper;
	}();

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseWidget = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _knockout = __webpack_require__(9);
	
	var _knockout2 = _interopRequireDefault(_knockout);
	
	var _ccLogger = __webpack_require__(18);
	
	var _ccLogger2 = _interopRequireDefault(_ccLogger);
	
	var _viewportHelper = __webpack_require__(19);
	
	var _viewportHelper2 = _interopRequireDefault(_viewportHelper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BaseWidget = exports.BaseWidget = function () {
	  function BaseWidget() {
	    _classCallCheck(this, BaseWidget);
	
	    this.applyContexts(this);
	    this._setExtensionSettings();
	    this._setViewportHelper();
	  }
	
	  _createClass(BaseWidget, [{
	    key: '_setExtensionSettings',
	    value: function _setExtensionSettings() {
	      this.$data.siteSettings = _knockout2.default.observable();
	
	      var extensionSiteSettings = this.$data.site().extensionSiteSettings;
	      this.$data.siteSettings(Object.keys(extensionSiteSettings).length ? extensionSiteSettings : null);
	    }
	  }, {
	    key: '_setViewportHelper',
	    value: function _setViewportHelper() {
	      var _this = this;
	
	      this.$data.viewportHelper = _viewportHelper2.default;
	      this.$data.viewportClass = _knockout2.default.pureComputed(function () {
	        return 'viewport-' + _viewportHelper2.default.viewportDesignation();
	      });
	
	      this.$data.isPhone = _knockout2.default.observable(false);
	      this.$data.isTablet = _knockout2.default.observable(false);
	      this.$data.isLaptop = _knockout2.default.observable(false);
	      this.$data.isDesktop = _knockout2.default.observable(false);
	
	      this._setCurrentViewport(_viewportHelper2.default.viewportDesignation());
	
	      _viewportHelper2.default.viewportDesignation.subscribe(function (viewport) {
	        return _this._setCurrentViewport(viewport);
	      });
	    }
	  }, {
	    key: '_setCurrentViewport',
	    value: function _setCurrentViewport(currentViewport) {
	      var viewportMapping = {};
	
	      viewportMapping.xs = this.$data.isPhone;
	      viewportMapping.sm = this.$data.isTablet;
	      viewportMapping.md = this.$data.isLaptop;
	      viewportMapping.lg = this.$data.isDesktop;
	
	      Object.keys(viewportMapping).forEach(function (viewportKey) {
	        return viewportMapping[viewportKey](viewportKey === currentViewport);
	      });
	    }
	  }, {
	    key: 'getSiteSetting',
	    value: function getSiteSetting(key) {
	      if (!this.hasSiteSettings()) {
	        this.log('There is no Site Settings configured', 'warn');
	        return false;
	      }
	
	      var siteSettings = this.$data.siteSettings();
	
	      if (typeof siteSettings[key] === 'undefined') {
	        this.log('The setting ' + key + ' doesn\'t exist', 'warn');
	        return false;
	      }
	
	      return siteSettings[key];
	    }
	  }, {
	    key: 'hasSiteSettings',
	    value: function hasSiteSettings() {
	      return this.$data.siteSettings() !== null;
	    }
	  }, {
	    key: 'log',
	    value: function log(message) {
	      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
	      var context = arguments[2];
	
	      context = context || this.$data.displayName();
	      _ccLogger2.default[type]('[OE][' + context + '] - ' + message);
	    }
	  }]);
	
	  return BaseWidget;
	}();
	
	;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_19__;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _carousel = __webpack_require__(21);
	
	Object.defineProperty(exports, 'Carousel', {
	  enumerable: true,
	  get: function get() {
	    return _carousel.Carousel;
	  }
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Carousel = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _desc, _value, _class, _descriptor, _descriptor2; /**
	                                                       * Core
	                                                       */
	
	
	/**
	 * Libraries, Helpers
	 */
	
	
	/**
	 * Models
	 */
	
	
	var _decorators = __webpack_require__(5);
	
	var _widgetCore = __webpack_require__(1);
	
	var _jquery = __webpack_require__(13);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _knockout = __webpack_require__(9);
	
	var _knockout2 = _interopRequireDefault(_knockout);
	
	var _moment = __webpack_require__(22);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _slide = __webpack_require__(23);
	
	var _slide2 = _interopRequireDefault(_slide);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _initDefineProp(target, property, descriptor, context) {
	  if (!descriptor) return;
	  Object.defineProperty(target, property, {
	    enumerable: descriptor.enumerable,
	    configurable: descriptor.configurable,
	    writable: descriptor.writable,
	    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	  });
	}
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	  var desc = {};
	  Object['ke' + 'ys'](descriptor).forEach(function (key) {
	    desc[key] = descriptor[key];
	  });
	  desc.enumerable = !!desc.enumerable;
	  desc.configurable = !!desc.configurable;
	
	  if ('value' in desc || desc.initializer) {
	    desc.writable = true;
	  }
	
	  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	    return decorator(target, property, desc) || desc;
	  }, desc);
	
	  if (context && desc.initializer !== void 0) {
	    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	    desc.initializer = undefined;
	  }
	
	  if (desc.initializer === void 0) {
	    Object['define' + 'Property'](target, property, desc);
	    desc = null;
	  }
	
	  return desc;
	}
	
	function _initializerWarningHelper(descriptor, context) {
	  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}
	
	var Carousel = exports.Carousel = (_class = function (_BaseWidget) {
	  _inherits(Carousel, _BaseWidget);
	
	  /**
	   * On load view model
	   */
	  function Carousel() {
	    _classCallCheck(this, Carousel);
	
	    var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this));
	    //Constructing the BaseWidget
	
	
	    _initDefineProp(_this, 'config', _descriptor, _this);
	
	    _initDefineProp(_this, 'slides', _descriptor2, _this);
	
	    _this.config(_this.getConfig());
	    _this.slides(_this.getSlides());
	    return _this;
	  }
	
	  _createClass(Carousel, [{
	    key: 'beforeAppear',
	    value: function beforeAppear() {
	      if (this.config().autoPlay) {
	        (0, _jquery2.default)('#myCarousel').carousel(this.config());
	      }
	    }
	  }, {
	    key: 'validate',
	    value: function validate(startDate, endDate) {
	      return (startDate && (0, _moment2.default)(startDate, 'MM/DD/YYYY', 'en', true).isValid() ? (0, _moment2.default)(startDate, 'MM/DD/YYYY', 'en', true) <= (0, _moment2.default)() : true) && (endDate && (0, _moment2.default)(endDate, 'MM/DD/YYYY', 'en', true).isValid() ? (0, _moment2.default)(endDate, 'MM/DD/YYYY', 'en', true) >= (0, _moment2.default)() : true);
	    }
	  }, {
	    key: 'getSlides',
	    value: function getSlides() {
	      var slides = [];
	      var imageUrl = void 0,
	          mobileImageUrl = void 0,
	          startDate = void 0,
	          endDate = void 0,
	          isvalid = void 0;
	      for (var i = 1; i < 7; i++) {
	        imageUrl = this.$data.hasOwnProperty('imageUrl' + i) && this.$data['imageUrl' + i]() !== undefined ? this.$data['imageUrl' + i]() : null;
	        mobileImageUrl = this.$data.hasOwnProperty('mobileImageUrl' + i) && this.$data['mobileImageUrl' + i]() !== undefined ? this.$data['mobileImageUrl' + i]() : null;
	        startDate = this.$data.hasOwnProperty('startDate' + i) && this.$data['startDate' + i]() !== undefined ? this.$data['startDate' + i]() : null;
	        endDate = this.$data.hasOwnProperty('endDate' + i) && this.$data['endDate' + i]() !== undefined ? this.$data['endDate' + i]() : null;
	        isvalid = this.validate(startDate, endDate);
	        if (imageUrl && isvalid) {
	          var slide = new _slide2.default();
	          slide.imageUrl = imageUrl;
	          slide.mobileImageUrl = mobileImageUrl;
	          slide.hasMobile = !!(mobileImageUrl != '' && mobileImageUrl != null);
	          slide.bannerLink = this.$data.hasOwnProperty('bannerLink' + i) && this.$data['bannerLink' + i]() !== undefined ? this.$data['bannerLink' + i]() : null;
	          slide.bannerText = this.$data.hasOwnProperty('bannerText' + i) && this.$data['bannerText' + i]() !== undefined ? this.$data['bannerText' + i]() : null;
	          slide.startDate = startDate;
	          slide.endDate = endDate;
	          slides.push(slide);
	        }
	      }
	      return slides;
	    }
	  }, {
	    key: 'getConfig',
	    value: function getConfig() {
	      return {
	        autoPlay: !!this.$data['boolAutoplayCarousel'](),
	        wrap: !!this.$data['boolLoopCarousel'](),
	        interval: this.$data.hasOwnProperty('timeSwitchImage') && this.$data['timeSwitchImage']() !== undefined && !isNaN(this.$data['timeSwitchImage']()) ? parseInt(parseInt(this.$data['timeSwitchImage'](), 10) * 1000) : 4000
	      };
	    }
	  }]);
	
	  return Carousel;
	}(_widgetCore.BaseWidget), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'config', [_decorators.exportToViewModel], {
	  enumerable: true,
	  initializer: function initializer() {
	    return _knockout2.default.observable();
	  }
	}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'slides', [_decorators.exportToViewModel], {
	  enumerable: true,
	  initializer: function initializer() {
	    return _knockout2.default.observable();
	  }
	})), _class);

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SlideModel = function SlideModel() {
	  _classCallCheck(this, SlideModel);
	
	  this.imageUrl = '';
	  this.mobileImageUrl = '';
	  this.hasMobile = false;
	  this.bannerLink = '';
	  this.bannerText = '';
	  this.startDate = '';
	  this.endDate = '';
	};
	
	exports.default = SlideModel;
	;

/***/ }
/******/ ])});;
//# sourceMappingURL=oeValmorHeroBanner.js.map