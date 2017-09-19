/**
 * @fileoverview oeWidget
 *
 * @author @dev
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout'],
  //-------------------------------------------------------------------
  // WIDGET DEFINITION
  //-------------------------------------------------------------------
  function(ko) {
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

      function setStorage(cookieId)
      {
        if(widgetModel.recentProducts.split(";").length-1 < maxItems)
        {
          widgetModel.recentProducts = id+";"+widgetModel.recentProducts;
        }
        else
        {
          
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

      function setCookie(id)
      {

      }

      return {
        // Obligatory
        constructor : Generic,
        // Variables
        config : ko.observable(),

        // Generic version
        onLoad : function(widget) {
          init(widget);

          // ...

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
