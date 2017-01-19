/**
 * @fileoverview oeWidget
 *
 * @author @dev
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'ccConstants', 'viewportHelper', 'storageApi', 'ccRestClient'],
  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko, $, constants, viewportHelper, storageApi, restClient){
    function Generic(){}

    Generic.prototype = (function() {
      var widgetModel, model;

      function run(method, data) {
              for (var i = 0; i < model.length; i++) {
                if (model[i].constructor !== Generic) {
                  if (model[i]['__OE__' + method] && typeof (model[i]['__OE__' + method]) == "function") {
                    model[i]['__OE__' + method](data);
                  }
                }
              }
            }

      var maxItems = 8, keyCookieStorage = "oe-recently-viewed-products-it";

      function carouselImage(src, carouselIndex, price, sale, name){
        this.imgSrc = ko.observable(src);
        this.carouselIndex = carouselIndex;
        this.classActive =  (carouselIndex === 0) ? "active" : "";
        this.price = ko.observable(price.toFixed(2));
        if(sale){ this.salePrice = ko.observable(sale.toFixed(2)); }
        this.name = ko.observable(name);
      }

      function init(widget){
        widgetModel = widget;

        widgetModel.viewportHelper = viewportHelper;

        widgetModel.viewportClass = ko.computed(function () {
          return 'viewport-' + viewportHelper.viewportDesignation();
        });
      }

      function createQuery(ids){
        var parameters = {};
        parameters[constants.PRODUCT_IDS] = ids;
        parameters[constants.FIELDS_QUERY_PARAM] = "displayName,listPrice,salePrice,primaryMediumImageURL";
        return parameters;
      }

      function createCarouselData(widget,page){

        maxItems = widgetModel.maxItems;

        if(localStorage.getItem(keyCookieStorage) !== null){
          widgetModel.recentlyViewed = localStorage.getItem(keyCookieStorage);
        }
        else {
          if(getCookie(keyCookieStorage !== null)){
            widgetModel.recentlyViewed = decodeURIComponent(getCookie(keyCookieStorage));
          }
          else {
            widgetModel.recentlyViewed = "";
          }
        }

        if(page === 'product'){
          var arrElements = widgetModel.recentlyViewed.split(";") || [],
          index = arrElements.indexOf(widgetModel.product().id()), newString = "";
          if(index !== -1){
            arrElements.splice(index,1);
            for(var i=0;i<arrElements.length-1;i++){
              newString = newString + arrElements[i] + ";";
            }
            widgetModel.recentlyViewed = newString;
          }
        }

        var strIds = widgetModel.recentlyViewed,
            arrIds = strIds.split(";").join(),
            query = createQuery(arrIds), active;

        restClient.request(constants.ENDPOINT_PRODUCTS_LIST_PRODUCTS,
          query,
          function(response){
              if(response){
                  widgetModel.productsGroup(widgetModel.formatProducts(response,widgetModel.itemsPerRow()))
              }

          },
          function(error){},null);

      }

      function getCookie(cookieName) {
        var name = cookieName + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

      return{
        // Obligatory
        constructor : Generic,
        __OE__model : function(models){
          model = [];

          $.each(models, function (index, currentModel) {
            model.push(currentModel);
          });

          model = model.sort(function(a, b){return (a.constructor === Generic) ? 0 : 1; });
        },
        // Variables
        viewportWidth : ko.observable(),
        viewportMode : ko.observable(),
        productsGroup : ko.observableArray(),
        productsList : ko.observableArray(),

        // Generic version
        setViewportDefinitions: function (view, itemsPerRow) {
          this.viewportMode(view);
          this.setItemsPerRow(itemsPerRow);
        },

        setItemsPerRow: function(itemsPerRow){
          widgetModel.itemsPerRow = ko.observable(12/widgetModel[itemsPerRow]);
        },
        onLoad : function(widget){
          init(widget);

          widgetModel.largeRows = 12/widget.itemsPerRowLargeDesktop();
          widgetModel.desktopRows = 12/widget.itemsPerRowDesktop();
          widgetModel.tabletRows = 12/widget.itemsPerRowTablet();
          widgetModel.mobileRows = 12/widget.itemsPerRowMobile();

          widget.checkResponsiveFeatures = function(index) {
            if (index > constants.VIEWPORT_LARGE_DESKTOP_LOWER_WIDTH) {
              if (widget.viewportMode() !== constants.LARGE_DESKTOP_VIEW) {
                widget.setViewportDefinitions(constants.DESKTOP_VIEW, 'largeRows');
              }
            } else {
              if (index > constants.VIEWPORT_TABLET_UPPER_WIDTH && index <= constants.VIEWPORT_LARGE_DESKTOP_LOWER_WIDTH) {
                if (widget.viewportMode() !== constants.DESKTOP_VIEW) {
                  widget.setViewportDefinitions(constants.DESKTOP_VIEW, 'desktopRows');
                }
              } else {
                if (index >= constants.VIEWPORT_MOBILE_WIDTH) {
                  if (widget.viewportMode() !== constants.TABLET_VIEW) {
                    widget.setViewportDefinitions(constants.TABLET_VIEW, 'tabletRows');
                  }
                } else {
                  if (widget.viewportMode() !== constants.PHONE_VIEW) {
                    widget.setViewportDefinitions(constants.PHONE_VIEW, 'mobileRows');
                  }
                }
              }
            }
          };

          widget.checkResponsiveFeatures($(window)[0].innerWidth || $(window).width());
          $(window).resize(function() {
            widget.checkResponsiveFeatures($(window)[0].innerWidth || $(window).width());
            widget.viewportWidth($(window)[0].innerWidth || $(window).width());
          });

          createCarouselData(widgetModel,page.pageId);

          run('onLoad', widget);
        },

        beforeAppear : function(page){
         createCarouselData(widgetModel,page.pageId);

          run('beforeAppear', page);
        },
        formatProducts : function(arrItems, itemsRow){
          var results = [];
          var arrTemp = [];

          for(var i = 0; i < arrItems.length; i++){
            if(arrItems[i]){
              results.push(new carouselImage(arrItems[i].primaryMediumImageURL,i,arrItems[i].listPrice,arrItems[i].salePrice,arrItems[i].displayName));
            }
          }
          while(results.length > 0){
            arrTemp = results.splice(0,itemsRow);
            widgetModel.productsList.push(arrTemp);
          }
          return widgetModel.productsList();
        }
      };
    })();

    return new Generic();
  }
);
