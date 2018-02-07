/**
 * @fileoverview oe Lucas Pellisoli Recently Viewed Products Display.
 *
 * @author lucas.pellisoli@objectedge.com
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'ccConstants', 'ccLogger', 'viewportHelper', 'storageApi', 'ccRestClient'],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function (ko, $, constants, ccLogger, viewportHelper, storageApi, restClient) {

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

    function loadProducts() {

    }

    function setNumberCollum(widget, DisplaySize) {
      var df = 0;
      if (DisplaySize === 'lg') {
        df = (12 / parseInt(widget.itemsPerRowLargeDesktop()));
      } else if (DisplaySize === 'md') {
        df = (12 / parseInt(widget.itemsPerRowDesktop()));
      } else if (DisplaySize === 'sm') {
        df = (12 / parseInt(widget.itemsPerRowTablet()));
      } else if (DisplaySize === 'xs') {
        df = (12 / parseInt(widget.itemsPerRowMobile()));
      }
      widget.itemsPerRowCLass('col-' + DisplaySize + '-' + df);

      // s.log("TESTE", 'col-' + DisplaySize + '-' + df);
    }

    function products(widget, DisplaySize) {
      var prod = widget.products();
      var cProd = [], rProd = [];
      var row = 0, col = 0, maxPerRow = 0;

      if (DisplaySize === 'lg') {
        maxPerRow = parseInt(widget.itemsPerRowLargeDesktop());
      } else if (DisplaySize === 'md') {
        maxPerRow = parseInt(widget.itemsPerRowDesktop());
      } else if (DisplaySize === 'sm') {
        maxPerRow = parseInt(widget.itemsPerRowTablet());
      } else if (DisplaySize === 'xs') {
        maxPerRow = parseInt(widget.itemsPerRowMobile());
      }
      /*
      //Test values
      prod = [
        { salePrice: 200, primaryMediumImageURL: "/ccstore/v1/images/?source=/file/v4683013229505879…cm1PC30_werner-paddles_b.jpg&height=475&width=475", displayName: "Player Whitewater Paddle 1", listPrice: 250 },
        { salePrice: 200, primaryMediumImageURL: "/ccstore/v1/images/?source=/file/v4683013229505879…cm1PC30_werner-paddles_b.jpg&height=475&width=475", displayName: "Player Whitewater Paddle 2", listPrice: 250 },
        { salePrice: 200, primaryMediumImageURL: "/ccstore/v1/images/?source=/file/v4683013229505879…cm1PC30_werner-paddles_b.jpg&height=475&width=475", displayName: "Player Whitewater Paddle 3", listPrice: 250 },
        { salePrice: 200, primaryMediumImageURL: "/ccstore/v1/images/?source=/file/v4683013229505879…cm1PC30_werner-paddles_b.jpg&height=475&width=475", displayName: "Player Whitewater Paddle 4", listPrice: 250 },
        { salePrice: 200, primaryMediumImageURL: "/ccstore/v1/images/?source=/file/v4683013229505879…cm1PC30_werner-paddles_b.jpg&height=475&width=475", displayName: "Player Whitewater Paddle 5", listPrice: 250 },
        { salePrice: 200, primaryMediumImvwageURL: "/ccstore/v1/images/?source=/file/v4683013229505879…cm1PC30_werner-paddles_b.jpg&height=475&width=475", displayName: "Player Whitewater Paddle 6", listPrice: 250 },
        { salePrice: 200, primaryMediumImageURL: "/ccstore/v1/images/?source=/file/v4683013229505879…cm1PC30_werner-paddles_b.jpg&height=475&width=475", displayName: "Player Whitewater Paddle 7", listPrice: 250 },
        { salePrice: 200, primaryMediumImageURL: "/ccstore/v1/images/?source=/file/v4683013229505879…cm1PC30_werner-paddles_b.jpg&height=475&width=475", displayName: "Player Whitewater Paddle 8", listPrice: 250 },
        { salePrice: 200, primaryMediumImageURL: "/ccstore/v1/images/?source=/file/v4683013229505879…cm1PC30_werner-paddles_b.jpg&height=475&width=475", displayName: "Player Whitewater Paddle 9", listPrice: 250 }
      ]
      maxPerRow = 2;
      */
      
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
          }else{
            break;
          }    
          }
          rProd[row] = cProd;          
          row++;
        }
        
      }
      // console.log("TESTE rProd", rProd);
      widget.rowCarouselProd(rProd);
    }

    //CLASS 
    return {

      /**
       * This function will run just on time when the widget was loaded the first time
       */

      // $('#HeroBanerLP .active').index('#HeroBanerLP .item')

      onLoad: function (widget) {
        ccLogger.info('[OE][onLoad] oeLucasPellisoliRecentlyViewedProductsDisplay');

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

      /**
       * This vwfunction will run whe the widget was loaded and every page change
       */
      beforeAppear: function (page) {

      }
    };
  }
);
