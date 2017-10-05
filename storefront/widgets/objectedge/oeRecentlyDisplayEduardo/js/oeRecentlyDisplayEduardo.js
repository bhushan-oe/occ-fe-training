/**
 * @fileoverview oeRecentlyDisplayEduardo
 *
 * @author eduardo.souza@objectedge.com
 */
define(['knockout', 'jquery', 'pageLayout/product', 'ccRestClient', 'ccConstants', 'storageApi', 'viewportHelper'], function(ko, $, Product, rest, constants, storageApi, viewport) {
  'use strict';

  // Widget configs
  var WIDGET = {};
  var DEFAULT_MAX_ITEMS = 8;
  var DEFAULT_COMPONENT_NAME = 'Recently Viewed Products';
  var VIEWPORT_PROPERTIES = {};
  
  // Storage configs
  var STORAGE_API = storageApi.getInstance();
  var STORAGE_KEY = 'oe-recently-viewed-products-eduardo';
  var STORAGE_SIZE = 0;
  
  // Products configs
  var INVALID_ITEMS = [];
  var FIELDS_TO_RETRIEVE = ['id','displayName','listPrice','primaryThumbImageURL','primarySmallImageURL','primaryMediumImageURL','primaryLargeImageURL'];
  var CURRENCY = "$";
  var PDP_ID = 0;

  /**
   * Build the parameters object for the request, filtering unavailable items
   * @param {String | String[]} id of the products to retrieve
   * @returns {Object} the params for de RVP list
   */
  function buildRequest(id, limit) {
    var params = {};

    // Parse to filter
    id = (id.constructor.name == "String") ? id.split() : id;

    // Remove deactivated/current on PDP/removed items
    id = id.filter(function(product) {
      return INVALID_ITEMS.indexOf(product) < 0 && product != PDP_ID;
    });

    params[constants.LIMIT] = +limit || DEFAULT_MAX_ITEMS;
    params[constants.FIELDS_QUERY_PARAM] = FIELDS_TO_RETRIEVE.join(',');

    // Check the ids array length to not excede the widget.maxItems() value
    params[constants.PRODUCT_IDS] = id.splice(0, params[constants.LIMIT]).join();

    return params;
  }

  /**
   * Request the products stored on cookies/localstorage (STORAGE_KEY) to the ENDPOINT_PRODUCTS_LIST_PRODUCTS and send callbacks
   */
  function retrieveProducts() {
    var products = JSON.parse( STORAGE_API.getItem(STORAGE_KEY) );
    var request = buildRequest(products.ids, WIDGET.maxItems());
    
    // Hide/show carousel arrows based on itemsPerRow X Saved items
    STORAGE_SIZE = products.listSize;

    rest.request(constants.ENDPOINT_PRODUCTS_LIST_PRODUCTS, request, requestSuccess, requestFail);
  }

  /**
   * Returns an object with the amount of items per row and image name according to ccConstants and viewPortHelper.viewportMode()
   */
  function getViewportModeProps(widget) {
    var vp = viewport.viewportMode();
    var img, itemsPerRow
    var colClass = 'col-'+constants.VIEWPORT_XS+'-1 col-'+constants.VIEWPORT_SMALL+'-1 col-'+constants.VIEWPORT_LARGE+'-1 col-'+constants.VIEWPORT_MEDIUM+'-1';

    switch (vp) {
      case constants.PHONE_VIEW:
        img = 'primaryThumbImageURL';
        itemsPerRow = widget.itemsPerRowMobile();
        break;

      case constants.TABLET_VIEW:
        img = 'primarySmallImageURL';
        itemsPerRow = widget.itemsPerRowTablet();
        break;
        
      case constants.LARGE_DESKTOP_VIEW:
        img = 'primaryMediumImageURL';
        itemsPerRow = widget.itemsPerRowLargeDesktop();
        break;

      default: //Normal desktop size
        img = 'primaryMediumImageURL';
        itemsPerRow = widget.itemsPerRowDesktop();
        break;
    }

    return {'img': img, 'itemsPerRow': itemsPerRow, 'colClass': colClass.replace(/1/g, Math.floor(12/itemsPerRow)) };
  }

  /**
   * If the request for products fail, then try again without the invalid items
   * @param {Any} error response from restClient
   */
  function requestFail(response) {
    response.errors.forEach(function(element) { INVALID_ITEMS.push(element.moreInfo) });
    retrieveProducts();
  }

  /**
   * Recives restClient data and paginate rows and columns to carousel display
   * @param {Any[]} data ajax response from restClient on constants.ENDPOINT_PRODUCTS_LIST_PRODUCTS
   */
  function requestSuccess(data) {
    var productsList = [];
    var rows = 0;
    var size = 0;

    data.forEach(function(item) {
      if (item.primarySmallImageURL === '/img/no-image.jpg') return;

      // Currency and image size
      item.listPrice = CURRENCY + item.listPrice;
      item.displayImage = item[VIEWPORT_PROPERTIES.img];
      item.colClass = VIEWPORT_PROPERTIES.colClass;

      productsList.push( ko.observable( new Product(item) ) );
    });

    // Get number of rows
    size = productsList.length;
    rows = Math.ceil(size / VIEWPORT_PROPERTIES.itemsPerRow);

    // Paginate carousel based on itemsPerRow
    for (var i = 0; i < rows; i++) {
      WIDGET.rows().push( productsList.splice(0, VIEWPORT_PROPERTIES.itemsPerRow) );
    }

    // Show widget when its setup is ok
    WIDGET.showTemplate( !!size );

    // Show carousel arrows when displayable items list size is greater than items per row (@size already respects widget.maxItems and storage size)
    WIDGET.showArrows( VIEWPORT_PROPERTIES.itemsPerRow < size );
  }

  return {
    beforeAppear: function (page) {

      // Ignore current product in the PDP
      PDP_ID = (page.pageId == constants.LIST_VIEW_PRODUCTS) ? page.contextId : PDP_ID;

      retrieveProducts();

    },
    onLoad: function (widget) {

      VIEWPORT_PROPERTIES = getViewportModeProps(widget);
      widget.showTemplate = ko.observable(false);
      widget.rows = ko.observable([]);
      widget.showArrows = ko.observable(false);
      WIDGET = widget;

    }
  }
});