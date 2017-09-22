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
  // WIDGET DEFINITION
  //-------------------------------------------------------------------
  function(ko, $, constants, viewportHelper, storageApi, restClient) {
    function Generic() {
      // default constructor
    }

    Generic.prototype = (function() {
      var widgetModel;


      //variables
      var maxProducts = 8;
      var cookieKey = "oe-recently-viewed-products-it";

      //

      function init(widget) {
        widgetModel = widget;
        if (Object.keys(widgetModel.site().extensionSiteSettings).length) {
          widgetModel.config(widgetModel.site().extensionSiteSettings);
        } else {
          widgetModel.config(null);
        }
      }

      function loadProductData(widget,page)
      {
        maxProducts = widgetModel.maxProducts;

        if(localStorage.getItem(cookieKey)!==null)
        {
          widgetModel.recentProducts = localStorage.getItem(cookieKey);
        }
        else
        {
          if(getCookie(cookieKey)!==null)
          {
            widgetModel.recentProducts = decodeURIComponent(getCookie(cookieKey));
          }
          else
          {
            widgetModel.recentProducts="";
          }
        }

        if(widgetModel.pageContext().page.name === "product")
        {
          var productArray = widgetModel.recentProducts.split(";") || [];
          var index = productArray.indexOf(widgetModel.product().id());
          if(index!=-1)
          {
            productArray.splice(index,1);
            widgetModel.recentProducts = productArray.join(";");
          }
        }

        var productIdsString = widgetModel.recentProducts;
        var productIdArray = productIdsString.split(";").join();
        var query = createQuery(productIdArray);

        //request(url, data, success, error, param1, param2, param3, param4, beforeSend)
        //rest call to obtain product parameters in order to create carousel
        restClient.request(constants.ENDPOINT_PRODUCTS_LIST_PRODUCTS,query,
          function(response)
          {
            widgetModel.productsGroup(widgetModel.formatProducts(response,widgetModel.itemsPerRow()));
          },
          function(error)
          {
            alert("Error: requesting product params failed. See RVPDisplay for more information.");
          }
        )
      }

      function createQuery(productId)
      {
        var params = {};
        params[constants.PRODUCT_ID] = productId;
        params[constants.FIELDS_QUERY_PARAM] = "displayName,listPrice,salePrice,primaryMediumImageURL";
        return params;
      }


      //function to get cookies and split it
      function getCookie(cname) 
      {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
      }

      return {
        // Obligatory
        constructor : Generic,
        // Variables
        viewportWidth : ko.observable(),
        viewportMode : ko.observable(),
        productsGroup : ko.observableArray(),
        productsList : ko.observableArray(),

        // Generic version
        onLoad : function(widget) {
          init(widget);


          widgetModel.__run('onLoad', widget);
        },
        beforeAppear : function(page) {

          widgetModel.__run('beforeAppear', page);
        }
      };
    })();

    return new Generic();
  }
);
