/**
 * @fileoverview oeVictorLariniRecentlyDisplay.
 *
 * @author victorugo.godinho@objectedge.com
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'ccConstants', 'ccLogger', 'viewportHelper', 'storageApi', 'ccRestClient'],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function (ko, constants, ccLogger, viewportHelper, storageApi, restClient) {

    "use strict";

    var sApi = storageApi.getInstance();


    function createQuery(ids) {
      var parameters = {};
      parameters[constants.PRODUCT_IDS] = ids;
      parameters[constants.FIELDS_QUERY_PARAM] = "displayName,listPrice,salePrice,primaryMediumImageURL";
      return parameters;
    }


    var query = createQuery(getIDs());


    function getIDs() {
      return sApi.getItem('oe-recently-viewed-products');
    }

    function setNumberCollum(widget, DisplaySize) {
      var df = 0;

      switch(DisplaySize) {

        case DisplaySize === 'lg' :
          df = (12 / widget.itemsPerRowLargeDesktop());
          break;

        case DisplaySize === 'md' :
          df = (12 / widget.itemsPerRowDesktop());
          break;

        case DisplaySize === 'sm' :
          df = (12 / widget.itemsPerRowTablet());
          break;

        case DisplaySize === 'xs' :
          df = (12 / widget.itemsPerRowMobile());
          break;
      }

      widget.itemsPerRowCLass('col-' + DisplaySize + '-' + df);

    }

    function products(widget, DisplaySize) {
      var prod = widget.products();
      var cProd = [], rProd = [];
      var row = 0, col = 0, maxPerRow = 0;

      switch(DisplaySize) {

        case DisplaySize === 'lg' :
          maxPerRow = widget.itemsPerRowLargeDesktop();
          break;

        case DisplaySize === 'md' :
          maxPerRow = widget.itemsPerRowDesktop();
          break;

        case DisplaySize === 'sm' :
          maxPerRow = widget.itemsPerRowTablet();
          break;

        case DisplaySize === 'xs' :
          maxPerRow = widget.itemsPerRowMobile();
          break;
    }
      
      if (prod) {
      var item = 0;        
        for (var i = 0; i < prod.length; i = i + maxPerRow) {
          col = 0;
          cProd = [];
          for (var m = 0; m < maxPerRow; m++) {
            if(prod[item]){
            cProd[col] = prod[item];
            col++;
            item++;
            } else break;  
          }
          rProd[row] = cProd;          
          row++;
        }
      }
      widget.rowCarouselProd(rProd);
    }

    return {

      onLoad: function (widget) {

        ccLogger.info('[OE][onLoad] oeVictorLariniRecentlyDisplay');

        widget.products = ko.observable("");

        widget.rowCarouselProd = ko.observable("");
        
        widget.DisplaySize = ko.observable(viewportHelper.viewportDesignation());

        widget.DisplayObserver = viewportHelper.viewportDesignation.subscribe(function (vw) {
          widget.DisplaySize(vw);
          setNumberCollum(widget, vw);
          
          if (widget.products()) {
            products(widget, vw);
          }

        }, widget);

        widget.itemsPerRowCLass = ko.observable(4);
        setNumberCollum(widget, widget.DisplaySize());

        restClient.request(constants.ENDPOINT_PRODUCTS_LIST_PRODUCTS, query, function (response) {
          
          if (response) {

            widget.products(response);
            setNumberCollum(widget, widget.DisplaySize());

            if (widget.products()) {
              products(widget, widget.DisplaySize());
            }
          }
        }, function (error) { }, null);


      },

      beforeAppear: function (page) {

      }
    };
  }
);
