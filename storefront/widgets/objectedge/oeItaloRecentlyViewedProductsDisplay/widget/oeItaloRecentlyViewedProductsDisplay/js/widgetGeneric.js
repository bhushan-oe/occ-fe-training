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

      var maxItems = 8, keyCookieStorage = "oe-recently-viewed-products";

      function carouselImage(src, carouselIndex, price, sale, name){
        this.imgSrc = ko.observable(src);
        this.carouselIndex = carouselIndex;
        this.classActive =  (carouselIndex === 0) ? "active" : "";
        this.price = ko.observable(price);
        this.salePrice = ko.observable(sale);
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
        parameters[constants.FIELDS_QUERY_PARAM] = "items.displayName,items.listPrice,items.salePrice,items.primaryMediumImageURL";
        return parameters;
      }

      function createCarouselData(widget,page){
        widgetModel = widget;

        maxItems = widgetModel.maxItems();
        widgetModel.imagesCarousel = ko.observableArray();

        if(localstorage.getItem(keyCookieStorage) !== null){
          widgetModel.recentlyViewed = localstorage.getItem(keyCookieStorage);
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
            query = createQuery(arrIds);

        restClient.request(constants.ENDPOINT_PRODUCTS_LIST_PRODUCTS,
          query,
          function(response){
            var len = response.items.length, arrItems = response.items;
            if(len > maxItems){ len = maxItems; }
            for(var i=0;i<len;i++){
              widgetModel.imagesCarousel.push( new carouselImage(arrItems[i].primaryMediumImageURL,i,arrItems[i].listPrice,arrItems[i].salePrice,arrItems[i].displayName));
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

          widgetModel.largeRows = 12/widgetModel.itemsPerRowLargeDesktop();
          widgetModel.desktopRows = 12/widgetModel.itemsPerRowDesktop();
          widgetModel.tabletRows = 12/widgetModel.itemsPerRowTablet();
          widgetModel.mobileRows = 12/widgetModel.itemsPerRowMobile();

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

          run('onLoad', widget);
        },

        beforeAppear : function(page){
          createCarouselData(widget,page.pageId);

          run('beforeAppear', page);
        }
      };
    })();

    return new Generic();
  }
);
