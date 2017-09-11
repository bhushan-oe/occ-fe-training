define(["knockout","ccLogger","viewportHelper","promise","ccRestClient","ccConstants"], function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_18__) { return /******/ (function(modules) { // webpackBootstrap
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
	
	var _viewModels = __webpack_require__(15);
	
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
	
	var _helpers = __webpack_require__(11);
	
	var helpers = _interopRequireWildcard(_helpers);
	
	var _BaseWidget = __webpack_require__(7);
	
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
	  return {
	    viewModels: {},
	
	    onLoad: function onLoad($data) {
	      _loaders.widget.load($data, this, allViewModels);
	    },
	    beforeAppear: function beforeAppear(pageContext) {
	      _loaders.widget.beforeAppear(pageContext);
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
	
	Object.defineProperty(exports, 'widget', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_widget).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  load: function load($data, widgetContext, viewModels) {
	    this.widgetContext = widgetContext;
	    this.$data = $data;
	
	    this.instantiateViewModels(viewModels);
	  },
	
	  beforeAppear: function beforeAppear(pageContext) {
	    this.pageContext = pageContext;
	    $.Topic('widget.' + this.$data.id() + '.beforeAppear').publish();
	  },
	
	  instantiateViewModels: function instantiateViewModels(viewModels) {
	    var _this = this;
	
	    var instance = this;
	
	    Object.keys(viewModels).forEach(function (viewModelName) {
	      var viewModel = viewModels[viewModelName];
	      var dataMethods = viewModel.prototype.$dataMethods;
	
	      viewModel.widgetContext = _this.widgetContext;
	
	      $.extend(_this.$data, viewModel.prototype.$data || {});
	      viewModel.prototype.$data = _this.$data;
	
	      viewModel.prototype.applyContexts = function (context) {
	        instance.widgetContext.viewModels[viewModelName] = context;
	      };
	
	      if (dataMethods) {
	        Object.keys(dataMethods).forEach(function (methodKey) {
	          viewModel.prototype.$data[methodKey] = function () {
	            return dataMethods[methodKey].apply(this.viewModels[viewModelName], arguments);
	          };
	        });
	        delete viewModel.prototype.$dataMethods;
	      }
	
	      var newInstance = new viewModel();
	      _this.widgetContext.viewModels[viewModelName] = newInstance;
	
	      $.Topic('widget.' + _this.$data.id() + '.beforeAppear').subscribe(function () {
	        var currentViewModel = _this.widgetContext.viewModels[viewModelName];
	
	        if (typeof currentViewModel.beforeAppear === 'function') {
	          currentViewModel.beforeAppear(_this.pageContext);
	        }
	      });
	    });
	  }
	};

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
	
	  var propertyValue = initializer.call(descriptor);
	
	  descriptor.set = function (value) {
	    propertyValue = value;
	  };
	
	  descriptor.get = function () {
	    target.$data[key] = propertyValue;
	    return propertyValue;
	  };
	
	  return descriptor;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseWidget = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _knockout = __webpack_require__(8);
	
	var _knockout2 = _interopRequireDefault(_knockout);
	
	var _ccLogger = __webpack_require__(9);
	
	var _ccLogger2 = _interopRequireDefault(_ccLogger);
	
	var _viewportHelper = __webpack_require__(10);
	
	var _viewportHelper2 = _interopRequireDefault(_viewportHelper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BaseWidget = exports.BaseWidget = function () {
	  function BaseWidget() {
	    var _this = this;
	
	    _classCallCheck(this, BaseWidget);
	
	    this.applyContexts(this);
	
	    this.$data.viewportHelper = _viewportHelper2.default;
	    this.$data.viewportClass = _knockout2.default.pureComputed(function () {
	      return 'viewport-' + _viewportHelper2.default.viewportDesignation();
	    });
	
	    this.$data.isPhone = _knockout2.default.observable(false);
	    this.$data.isTablet = _knockout2.default.observable(false);
	    this.$data.isLaptop = _knockout2.default.observable(false);
	    this.$data.isDesktop = _knockout2.default.observable(false);
	
	    this.setCurrentViewport(_viewportHelper2.default.viewportDesignation());
	
	    _viewportHelper2.default.viewportDesignation.subscribe(function (viewport) {
	      return _this.setCurrentViewport(viewport);
	    });
	  }
	
	  _createClass(BaseWidget, [{
	    key: 'setCurrentViewport',
	    value: function setCurrentViewport(currentViewport) {
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
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _OERestClient = __webpack_require__(12);
	
	Object.defineProperty(exports, 'OERestClient', {
	  enumerable: true,
	  get: function get() {
	    return _OERestClient.OERestClient;
	  }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.OERestClient = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _knockout = __webpack_require__(8);
	
	var _knockout2 = _interopRequireDefault(_knockout);
	
	var _promise = __webpack_require__(13);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _ccRestClient = __webpack_require__(14);
	
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
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _sample = __webpack_require__(16);
	
	Object.defineProperty(exports, 'Sample', {
	  enumerable: true,
	  get: function get() {
	    return _sample.Sample;
	  }
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Sample = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _decorators = __webpack_require__(5);
	
	var _widgetCore = __webpack_require__(1);
	
	var _knockout = __webpack_require__(8);
	
	var _knockout2 = _interopRequireDefault(_knockout);
	
	var _sample = __webpack_require__(17);
	
	var _sample2 = _interopRequireDefault(_sample);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Core
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	/**
	 * Libraries, Helpers
	 */
	
	
	/**
	 * Models
	 */
	
	
	var Sample = exports.Sample = function (_BaseWidget) {
	  _inherits(Sample, _BaseWidget);
	
	  /**
	   * On load view model
	   */
	  function Sample() {
	    _classCallCheck(this, Sample);
	
	    var _this = _possibleConstructorReturn(this, (Sample.__proto__ || Object.getPrototypeOf(Sample)).call(this));
	    //Constructing the BaseWidget
	
	
	    console.log(new _sample2.default().getProduct('20162311'));
	    return _this;
	  }
	
	  _createClass(Sample, [{
	    key: 'beforeAppear',
	    value: function beforeAppear() {}
	  }]);

	  return Sample;
	}(_widgetCore.BaseWidget);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ccConstants = __webpack_require__(18);
	
	var _ccConstants2 = _interopRequireDefault(_ccConstants);
	
	var _helpers = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SampleModel = function () {
	  function SampleModel() {
	    _classCallCheck(this, SampleModel);
	  }
	
	  _createClass(SampleModel, [{
	    key: 'getProduct',
	    value: function getProduct(id) {
	      var _rest$setQuery;
	
	      this.rest = new _helpers.OERestClient();
	      this.rest.setEndpoint(_ccConstants2.default.ENDPOINT_PRODUCTS_GET_PRODUCT);
	      this.rest.setQuery((_rest$setQuery = {}, _defineProperty(_rest$setQuery, _ccConstants2.default.FIELDS_QUERY_PARAM, 'id,displayName'), _defineProperty(_rest$setQuery, _ccConstants2.default.DATA_ONLY, true), _rest$setQuery));
	      this.rest.setPath(id);
	      this.rest.send().then(function (response) {
	        console.log('Sent!', response);
	      }).catch(function (error) {
	        console.log('Error!', error);
	      });
	    }
	  }]);
	
	  return SampleModel;
	}();
	
	exports.default = SampleModel;
	;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }
/******/ ])});;
//# sourceMappingURL=/file/oe-source-maps/oeCoreTesting/oeCoreTesting.js.map