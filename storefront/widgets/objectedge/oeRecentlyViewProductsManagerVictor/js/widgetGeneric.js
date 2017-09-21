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
      var cookieKey = "oe-recently-viewed-products-it";
      var maxItems = 8;
      var listenToTopic="OE_RVP_NEW_PRODUCT";
      
      
      //check the cookie and create recentProducts 
      function init(widget) 
      {
        widgetModel = widget;
        if(localStorage.getItem(cookieKey)!==null)
        {
          widgetModel.recentProducts = localStorage.getItem(cookieKey);
        }else if(getCookie(cookieKey)!==null)
        {
          widgetModel.recentProducts=decodeURIComponent(getCookie(keyCookieStorage));
        }
        else
        {
          widgetModel.recentProducts="";
        }

        maxItems=widgetModel.maxItems();
      }

      //defines the storage entry as  oe-recently-viewed-products-it | widgetModel.recentProducts
      function setStorage(cookieId)
      {
        if(widgetModel.recentProducts.split(";").length-1 < maxItems)
        {
          deleteRepeated(cookieId);
          widgetModel.recentProducts = cookieId+";"+widgetModel.recentProducts;
          localStorage.setItem(cookieKey,widgetModel.recentProducts);
        }
      }

      //
      function deleteRepeated(id)
      {
        var productsArray = widgetModel.recentProducts.split(";");
        var index=productsArray.indexOf(id);
        if(index>=0)
        {
          productsArray.splice(index,1);
          widgetModel.recentProducts = productsArray.join(";");
          return true;
        }
        else
        {
          return false;
        }
      }

      

      
      


      //get a cookie and splits it
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
        config : ko.observable(),

        // Generic version
        onLoad : function(widget) 
        {
          init(widget);
          //subscribe to topic OE_RVP_NEW_PRODUCT as the spec says
          $.Topic(listenToTopic).subscribe(function(data){ setStorage(data) });

          widgetModel.__run('onLoad', widget);
        },
        beforeAppear : function(page) {
          //check page and set local storage
          if(page.pageId=="product")
          {
            setStorage(widgetModel.product().id());
          }

          widgetModel.__run('beforeAppear', page);
        }
      };
    })();

    return new Generic();
  }
);
